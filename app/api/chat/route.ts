import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message =
      body.message ||
      body.messages?.[body.messages.length - 1]?.content;

    if (!message) {
      return NextResponse.json(
        { reply: "No message provided." },
        { status: 400 }
      );
    }

    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    });

    const data = await response.json();

    return NextResponse.json({
      reply: data.reply,
      context: data.context_used,
    });

  } catch (err: any) {
    console.error("ROUTE ERROR:", err);

    return NextResponse.json(
      {
        reply: "Backend connection error",
        error: err?.message,
      },
      { status: 500 }
    );
  }
}