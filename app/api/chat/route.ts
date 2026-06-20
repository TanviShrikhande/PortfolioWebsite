import { NextResponse } from "next/server";

function cleanResponse(text: string) {
  return text.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "qwen/qwen3-32b", // or llama3-8b-8192 (safer)
          messages,
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();

    const raw = data?.choices?.[0]?.message?.content ?? "";

    const reply = cleanResponse(raw) || "No valid response";

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error("GROQ ERROR:", err);

    return NextResponse.json(
      {
        reply: "Server error occurred.",
        error: err?.message,
      },
      { status: 500 }
    );
  }
}