import React, { useState, useEffect } from "react";

import orange from "../assets/fruits/fruit_orange.png";
import strawberry from "../assets/fruits/fruit_strawberry.png";
import avocado from "../assets/fruits/fruit_avocado.png";
import cherry from "../assets/fruits/fruit_cherry.png";
import grapes from "../assets/fruits/fruit_grapes.png";

import mockup from "../assets/fruits/mockup.png";
import listSoda from "../assets/fruits/fruit-animation1.png";
import leavesImg from "../assets/fruits/leaves.png";

// 5-SLIDE DATA
const slides = [
  { name: "Orange", bg: "#e7a043", img: orange },
  { name: "Strawberry", bg: "#ea3d41", img: strawberry },
  { name: "Avocado", bg: "#2d5643", img: avocado },
  { name: "Cherry", bg: "#570e13", img: cherry },
  { name: "Grapes", bg: "#121845", img: grapes },
];

export default function FruitSliderFive() {
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [cycle, setCycle] = useState(0);

  // NEXT
  const next = () => {
    setIndex((i) => {
      const newIndex = (i + 1) % slides.length;

      // When reaching slide 0 again, it means a full loop has completed
      if (newIndex === 0) {
        setCycle((c) => {
          const newC = c + 1;

          // Restart scrolling background every 5 loops
          if (newC >= 4) {
            setOffset(0);
            return 0;
          }

          return newC;
        });
      }

      return newIndex;
    });

    // Continue soda scroll
    setOffset((o) => o - 250);
  };

  // PREV (you still want forward scroll)
  const prev = () => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
    setOffset((o) => o - 250);
  };

  // AUTO PLAY
  useEffect(() => {
    const timer = setInterval(() => next(), 3000);
    return () => clearInterval(timer);
  }, []);

  const active = slides[index];
  const hidden = slides[(index + 1) % slides.length];

  return (
    <div className="w-screen h-screen relative overflow-hidden font-mono">
      {/* HEADER */}
      <header className="absolute top-0 w-full z-50 flex justify-between items-center px-12 py-3 font-bold text-lg text-white">
        <div>KEENA</div>
        <ul className="flex gap-6">
          <li>HOME</li>
          <li>CONTACT</li>
          <li>INFO</li>
        </ul>
      </header>

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ backgroundColor: active.bg }}
        key={index}
      >
        {/* FRUIT NAME */}
        <div
          className="absolute text-white font-extrabold uppercase text-[6rem] md:text-[12rem]"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animation: "toActive 0.7s ease-out",
          }}
        >
          {active.name}
        </div>

        {/* ACTIVE FRUIT IMAGE */}
        <img
          src={active.img}
          alt=""
          className="absolute w-[90%] left-1/2 pointer-events-none"
          style={{
            top: "50%",
            transform: "translate(-50%, -50%)",
            animation: "toActive 0.7s ease-out",
          }}
        />

        {/* OUTGOING FRUIT */}
        <img
          src={hidden.img}
          alt=""
          className="absolute w-[90%] left-1/2 top-1/2 opacity-0"
          style={{ animation: "toOut 0.8s ease-in forwards" }}
        />
      </div>

      {/* MOCKUP FRAME */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        style={{
          width: "calc(371px / 1.5)",
          height: "calc(673px / 1.5)",
          overflow: "hidden",
          borderRadius: "20px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${mockup}), url(${listSoda})`,
            backgroundRepeat: "no-repeat, repeat-x",
            backgroundPosition: `center, ${offset}px 0`,
            backgroundSize: "cover, auto 100%",
            backgroundBlendMode: "multiply",
            transition: "background-position 0.5s linear",

            WebkitMaskImage: `url(${mockup})`,
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "cover",
            maskImage: `url(${mockup})`,
            maskRepeat: "no-repeat",
            maskSize: "cover",
          }}
        />
      </div>

      {/* LEAVES DECORATION */}
      <div
        className="absolute"
        style={{
          width: "170px",
          height: "170px",
          backgroundImage: `url(${leavesImg})`,
          backgroundSize: "100%",
          top: "calc((50% - (673px / 1.5) / 1.7))",
          left: "calc((50% + (371px / 1.5) / 5))",
        }}
      />

      {/* SHADOW */}
      <div
        className="absolute bg-black/50 rounded-full blur-2xl"
        style={{
          width: "calc(371px / 1.5)",
          height: "100px",
          top: "calc((50% + (673px / 1.5) / 2))",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* BUTTONS */}
      <button
        onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 border border-white/30 text-white text-2xl z-40"
      >
        &lt;
      </button>

      <button
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 border border-white/30 text-white text-2xl z-40"
      >
        &gt;
      </button>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes toActive {
          from { transform: translate(-50%, 70%); opacity: 0; }
          to { transform: translate(-50%, -50%); opacity: 1; }
        }

        @keyframes toOut {
          from { transform: translate(-50%, -50%); opacity: 1; }
          to { transform: translate(-50%, -150%); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
