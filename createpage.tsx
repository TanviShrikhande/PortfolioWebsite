"use client";

import { useEffect, useState } from "react";

type ModalType =
  | "projects"
  | "skills"
  | "achievements"
  | "about"
  | "contact"
  | null;

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] =
    useState<ModalType>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const modalImages = {
    projects: "/img/modals/projects-frame.png",
    skills: "/img/modals/skills-frame.png",
    achievements: "/img/modals/achievements-frame.png",
    about: "/img/modals/about-frame.png",
    contact: "/img/modals/contact-frame.png",
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white text-4xl">
        Welcome to Mochi's Cafe ☕
      </div>
    );
  }

  return (
    <main className="relative w-screen h-screen overflow-hidden">

      {/* Background Cafe */}
      <img
        src="/img/cafe.png"
        alt="Cafe"
        className="w-full h-full object-contain"
      />

      {/* ----------------------
            CLICKABLE AREAS
         ---------------------- */}

      {/* Projects */}
      <button
        onClick={() => setActiveModal("projects")}
        className="
          absolute
          top-[6%]
          left-[20%]
          w-[45%]
          h-[14%]
          border-2 border-red-500
          opacity-20
        "
      />

      {/* Achievements */}
      <button
        onClick={() => setActiveModal("achievements")}
        className="
          absolute
          top-[42%]
          left-[18%]
          w-[32%]
          h-[18%]
          border-2 border-blue-500
          opacity-20
        "
      />

      {/* Skills */}
      <button
        onClick={() => setActiveModal("skills")}
        className="
          absolute
          top-[68%]
          left-[22%]
          w-[20%]
          h-[18%]
          border-2 border-green-500
          opacity-20
        "
      />

      {/* About */}
      <button
        onClick={() => setActiveModal("about")}
        className="
          absolute
          bottom-[2%]
          left-[18%]
          w-[38%]
          h-[8%]
          border-2 border-yellow-500
          opacity-20
        "
      />

      {/* Contact */}
      <button
        onClick={() => setActiveModal("contact")}
        className="
          absolute
          bottom-[2%]
          left-[58%]
          w-[18%]
          h-[8%]
          border-2 border-purple-500
          opacity-20
        "
      />

      {/* ----------------------
             MODAL
         ---------------------- */}

      {activeModal && (
        <div
          className="
            absolute inset-0
            bg-black/60
            flex items-center justify-center
          "
        >
          <div className="relative">

            <button
              onClick={() => setActiveModal(null)}
              className="
                absolute
                top-2
                right-2
                bg-white
                px-3 py-1
                rounded
                z-10
              "
            >
              X
            </button>

            <img
              src={modalImages[activeModal]}
              alt="modal"
              className="
                max-h-[80vh]
                max-w-[80vw]
              "
            />
          </div>
        </div>
      )}
    </main>
  );
}