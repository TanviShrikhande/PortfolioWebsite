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
  const [activeModal, setActiveModal] =
    useState<ModalType>(null);

  const modalImages = {
    projects: "/img/modals/projects-frame.png",
    achievements: "/img/modals/achievements-frame.png",
    skills: "/img/modals/skills-frame.png",
    about: "/img/modals/about-frame.png",
    contact: "/img/modals/contact-frame.png",
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
            
          "
          style={{
            left: "-1.3%",
            top: "-5%",
          }}
        />

        {/* Mochi */}

        <Image
          src="/img/cat.PNG"
          alt="Mochi"
          width={1500}
          height={1500}
          priority
          className="
            absolute
            z-10
            animate-float-slow
            pointer-events-none
          "
          style={{
            left: "-0.5%",
            top: "0.3%",
            transform: "scale(1.4)",
            transformOrigin: "top left",
          }}
        />

          {/* SVG Overlay */}

          <svg
            className="absolute inset-0 w-full h-full z-20"
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