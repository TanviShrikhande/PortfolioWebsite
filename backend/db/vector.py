import faiss
import numpy as np

dimension = 384
index = faiss.IndexFlatL2(dimension)

documents = []

def add_embedding(embedding, text):
    global documents
    index.add(np.array([embedding]).astype("float32"))
    documents.append(text)

def search(query_embedding, top_k=3):
    D, I = index.search(
        np.array([query_embedding]).astype("float32"),
        top_k
    )

    return [documents[i] for i in I[0] if i < len(documents)]