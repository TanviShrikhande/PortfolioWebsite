from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import os
from pathlib import Path

from rag.embed import get_embedding
from rag.chunk import chunk_text
from rag.prompt import build_prompt
from db.vector import add_embedding, search
from pypdf import PdfReader
import re

# Load environment variables from .env if available
env_path = Path(__file__).resolve().parent / ".env"
if env_path.exists():
    from dotenv import load_dotenv
    load_dotenv(env_path)

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------
# LOAD DATA (RUN ON START)
# --------------------
try:
    reader = PdfReader("data/Tanvi_Shrikhande_Resume_180626.pdf")
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    chunks = chunk_text(text)
    
    for c in chunks:
        emb = get_embedding(c)
        add_embedding(emb, c)
    print("✓ Resume data loaded and indexed successfully")
except FileNotFoundError:
    print("⚠ Resume PDF not found. Chat will not have context.")
except Exception as e:
    print(f"⚠ Error loading resume: {e}")

# --------------------
# REQUEST SCHEMA
# --------------------
class Query(BaseModel):
    message: str

# --------------------
# GROQ CALL
# --------------------
def call_groq(prompt):
    groq_api_key = os.getenv("groq_api_key")
    if not groq_api_key:
        raise ValueError("GROQ_API_KEY not set in environment")
    
    res = requests.post(
        "https://api.groq.com/openai/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {groq_api_key}",
            "Content-Type": "application/json",
        },
        json={
            "model": "qwen/qwen3-32b",
            "messages": [
                {"role": "system", "content": prompt}
            ],
            "temperature": 0.3,
        }
    )

    try:
        response_json = res.json()
    except ValueError:
        raise RuntimeError(
            f"Groq returned invalid JSON: {res.status_code} {res.text}"
        )

    if not res.ok:
        raise RuntimeError(
            f"Groq API error {res.status_code}: {response_json}"
        )

    if (
        "choices" not in response_json
        or not response_json["choices"]
        or "message" not in response_json["choices"][0]
        or "content" not in response_json["choices"][0]["message"]
    ):
        raise RuntimeError(
            f"Groq response missing choices: {response_json}"
        )

    print(f"Groq response: {response_json}")
    raw_response = response_json["choices"][0]["message"]["content"]
    return clean_response(raw_response)


def clean_response(text: str) -> str:
    return re.sub(r"<think>[\s\S]*?</think>", "", text).strip()
# --------------------
# RAG ENDPOINT
# --------------------
@app.post("/chat")
def chat(query: Query):
    # 1. embed user query
    q_emb = get_embedding(query.message)

    # 2. retrieve context
    context = search(q_emb, top_k=3)

    # 3. build prompt
    prompt = build_prompt("\n\n".join(context), query.message)

    # 4. LLM response
    try:
        answer = call_groq(prompt)
    except Exception as e:
        print(f"Error generating response: {e}")
        return {
            "reply": "Error generating response.",
            "error": str(e),
            "context_used": context,
        }

    return {
        "reply": answer,
        "context_used": context,
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)