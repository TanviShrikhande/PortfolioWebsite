"use client";

import Image from "next/image";
import { useState } from "react";

type ModalType =
  | "projects"
  | "skills"
  | "achievements"
  | "about"
  | "contact"
  | null;

export default function Home() {
const [messages, setMessages] = useState<
  { role: "user" | "assistant"; content: string }[]
>([]);

const [input, setInput] = useState("");
const [loading, setLoading] = useState(false);
const [isChatOpen, setIsChatOpen] = useState(false);
const [activeModal, setActiveModal] = useState<ModalType>(null);

  const modalImages = {
    projects: "/img/modals/projects-frame.png",
    achievements: "/img/modals/achievements-frame.png",
    skills: "/img/modals/skills-frame.png",
    about: "/img/modals/about-frame.png",
    contact: "/img/modals/contact-frame.png",
  };
const handleSend = async () => {
  if (!input.trim()) return;

  const userMessage = { role: "user", content: input };

  const updatedMessages = [...messages, userMessage];
  setMessages(updatedMessages);
  setInput("");
  setLoading(true);

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: updatedMessages }),
    });

    const data = await res.json();

    const assistantMessage = {
      role: "assistant",
      content: data.reply,
    };

    setMessages([...updatedMessages, assistantMessage]);
  } catch (err) {
    setMessages([
      ...updatedMessages,
      { role: "assistant", content: "Error connecting to server." },
    ]);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <main className="min-h-screen bg-black flex items-center justify-center">

        <div className="relative w-full max-w-[1600px]">

          {/* Cafe Background */}

          <Image
            src="/img/cafe-map.PNG"
            alt="Cafe"
            width={1664}
            height={1190}
            priority
            className="w-full h-auto"
          />

          {/* Witch */}

          <Image
          src="/img/witch-front.PNG"
          alt="Witch"
          width={2000}
          height={2000}
          priority
          className="
            absolute
            z-10
            animate-float-slow
            pointer-events-none
            w-[8.5%]   /* 👈 control size here */
            h-auto
          "
          style={{
            left: "42.5%",
            top: "47%",
          }}
        />

        {/* Mochi */}

        <Image
          src="/img/cat.png"
          alt="Mochi"
          width={200}
          height={250}
          priority
          className="
            absolute
            z-10
            animate-float-slow
            w-[5.5%] h-auto
          "
          style={{
            left: "57%",
            top: "63%",
            transform: "translate(-50%, -50%)",
            cursor: "pointer",
          }}
          onClick={() => setIsChatOpen(true)}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />

          {/* SVG Overlay */}

          <svg
            className="absolute inset-0 w-full h-full z-20 pointer-events-none"
            viewBox="0 0 1664 1190"
          >

            {/* Projects */}

            <rect
              x="100"
              y="94"
              width="1100"
              height="156"
              fill="rgba(255,0,0,0.01)"
              strokeWidth="0"
              style={{ cursor: "pointer" }}
              onClick={() => setActiveModal("projects")}
              style={{ cursor: "pointer", pointerEvents: "auto" }}
            />

            {/* Achievements */}

            <rect
              x="210"
              y="452"
              width="515"
              height="80"
              fill="rgba(0,0,255,0.01)"
              strokeWidth="0"
              style={{ cursor: "pointer" }}
              onClick={() => setActiveModal("achievements")}
              style={{ cursor: "pointer", pointerEvents: "auto" }}
            />

            {/* Skills */}

            <rect
              x="255"
              y="700"
              width="310"
              height="270"
              fill="rgba(0,255,0,0.01)"
              strokeWidth="0"
              style={{ cursor: "pointer" }}
              onClick={() => setActiveModal("skills")}
              style={{ cursor: "pointer", pointerEvents: "auto" }}
            />

            {/* About */}

            <rect
              x="130"
              y="1040"
              width="835"
              height="95"
              fill="rgba(255,0,255,0.01)"
              strokeWidth="0"
              style={{ cursor: "pointer" }}
              onClick={() => setActiveModal("about")}
              style={{ cursor: "pointer", pointerEvents: "auto" }}
            />

            {/* Contact */}

            <rect
              x="990"
              y="1040"
              width="348"
              height="70"
              fill="rgba(255,255,0,0.01)"
              strokeWidth="0"
              style={{ cursor: "pointer" }}
              onClick={() => setActiveModal("contact")}
              style={{ cursor: "pointer", pointerEvents: "auto" }}
            />

          </svg>

        </div>

      </main>

      {/* Chat Modal */}

      {isChatOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4 py-6">
          <div className="relative w-full max-w-[1200px] h-[90vh] rounded-[32px] overflow-hidden shadow-2xl">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-black/70" />
            </div>

            <div className="relative z-10 flex h-full flex-col">
              <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-white/15">
                <div>
                  <h2 className="text-3xl font-bold text-white">Ask Mochi</h2>
                  <p className="text-sm text-slate-300">Resume-aware assistant</p>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="rounded-full bg-white/90 px-4 py-2 text-black transition hover:bg-white"
                >
                  Close
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-5">
                {messages.length === 0 && (
                  <div className="max-w-[80%] rounded-3xl bg-white/10 px-5 py-4 text-sm text-white">
                    Hi! I'm Mochi 🐱. Ask me about projects or anything from Wednesday.
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`max-w-[80%] rounded-3xl px-5 py-4 text-sm text-white mb-3 ${
                      msg.role === "user" ? "bg-blue-500/40 ml-auto" : "bg-white/10"
                    }`}
                  >
                    {msg.content}
                  </div>
                ))}
              </div>

              <div className="border-t border-white/15 bg-black/70 px-6 py-4 flex gap-3">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ask me anything..."
                    className="w-full rounded-3xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-slate-400 focus:border-white/30"
                  />
                <button
                  onClick={handleSend}
                  disabled={loading}
                  className="rounded-3xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-slate-100"
                >
                  {loading ? "..." : "Send"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}

      {activeModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

          <div className="relative">

            <button
              onClick={() => setActiveModal(null)}
              className="
                absolute
                top-4
                right-4
                z-50
                bg-white
                text-black
                px-4
                py-2
                rounded-lg
                shadow-lg
              "
            >
              ✕
            </button>

            <img
              src={
                modalImages[
                  activeModal as keyof typeof modalImages
                ]
              }
              alt={activeModal}
              className="
                max-w-[90vw]
                max-h-[90vh]
                object-contain
              "
            />

          </div>

        </div>
      )}

    </>
  );
}