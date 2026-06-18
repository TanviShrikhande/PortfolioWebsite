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
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const modalImages = {
    projects: "/img/modals/projects-frame.png",
    achievements: "/img/modals/achievements-frame.png",
    skills: "/img/modals/skills-frame.png",
    about: "/img/modals/about-frame.png",
    contact: "/img/modals/contact-frame.png",
  };

  return (
    <>
      <main className="h-screen w-screen bg-black flex items-center justify-center overflow-hidden">
        <div className="relative h-[98vh]">

          {/* Cafe Image */}
          <Image
            src="/img/cafe-map.PNG"
            alt="Cafe"
            width={1664}
            height={1190}
            priority
            className="h-[98vh] w-auto"
          />
          

          {/* SVG Overlay */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1664 1190"
            preserveAspectRatio="none"
          >
            {/* Projects */}
            <rect
              x="250"
              y="94"
              width="870"
              height="156"
              fill="rgba(255,0,0,0.3)"
              stroke="red"
              strokeWidth="4"
              style={{ cursor: "pointer" }}
              onClick={() => setActiveModal("projects")}
            />

            {/* Achievements */}
            <rect
              x="345"
              y="452"
              width="400"
              height="80"
              fill="rgba(0,0,255,0.3)"
              stroke="blue"
              strokeWidth="4"
              style={{ cursor: "pointer" }}
              onClick={() => setActiveModal("achievements")}
            />

            {/* Skills */}
            <rect
              x="382"
              y="700"
              width="230"
              height="270"
              fill="rgba(0,255,0,0.3)"
              stroke="lime"
              strokeWidth="4"
              style={{ cursor: "pointer" }}
              onClick={() => setActiveModal("skills")}
            />

            {/* About */}
            <rect
              x="280"
              y="1040"
              width="658"
              height="93"
              fill="rgba(255,0,255,0.3)"
              stroke="magenta"
              strokeWidth="4"
              style={{ cursor: "pointer" }}
              onClick={() => setActiveModal("about")}
            />

            {/* Contact */}
            <rect
              x="960"
              y="1040"
              width="270"
              height="68"
              fill="rgba(255,255,0,0.3)"
              stroke="yellow"
              strokeWidth="4"
              style={{ cursor: "pointer" }}
              onClick={() => setActiveModal("contact")}
            />
          </svg>
        </div>
      </main>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative">

            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 z-50 bg-white text-black px-4 py-2 rounded-lg"
            >
              ✕
            </button>

            <Image
              src={
                modalImages[
                  activeModal as keyof typeof modalImages
                ]
              }
              alt={activeModal}
              width={1400}
              height={900}
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}