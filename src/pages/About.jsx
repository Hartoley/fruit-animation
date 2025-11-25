import React, { useState, useEffect } from "react";

import strawberry from "../assets/fruits/fruit_strawberry.png";
import avocado from "../assets/fruits/fruit_avocado.png";
import orange from "../assets/fruits/fruit_orange.png";
import mockup from "../assets/fruits/mockup.png";
import listSoda from "../assets/fruits/listSoda.jpg";
import leavesImg from "../assets/fruits/leaves.png";

const slides = [
  { name: "Strawberry", bg: "#EA3D41", img: strawberry },
  { name: "Avocado", bg: "#2D5643", img: avocado },
  { name: "Orange", bg: "#E7A043", img: orange },
];

export default function FruitAnimation() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("next");

  // infinite scroll offset (looping)
  const [offset, setOffset] = useState(0);

  const next = () => {
    setDirection("next");
    setIndex((i) => (i + 1) % slides.length);

    // infinite loop movement
    setOffset((o) => (o - 250) % 1000);
  };

  const prev = () => {
    setDirection("prev");
    setIndex((i) => (i - 1 + slides.length) % slides.length);

    // still forward? remove +, uncomment this if you want reverse:
    setOffset((o) => (o - 250) % 1000);
  };

  // 🔥 AUTOPLAY — EVERY 3s
  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 3000);

    return () => clearInterval(timer);
  });

  // always re-trigger animation by updating a key
  const animationKey = `${index}-${direction}`;

  const active = slides[index];
  const hidden = slides[(index + 1) % slides.length];

  return (
    <div className="w-screen h-screen relative overflow-hidden font-mono">
      {/* HEADER */}
      <header className="absolute top-0 w-full z-50 flex justify-between items-center px-12 py-3 font-bold text-lg text-white">
        <div>LUNDEV</div>
        <ul className="flex gap-6">
          <li>HOME</li>
          <li>CONTACT</li>
          <li>INFO</li>
        </ul>
      </header>

      {/* BACKGROUND SLIDE */}
      <div
        key={animationKey}
        className="absolute inset-0 flex items-center justify-center"
        style={{ backgroundColor: active.bg }}
      >
        <div className="absolute text-white font-extrabold uppercase text-[6rem] md:text-[12rem] z-0">
          {active.name}
        </div>

        {/* ACTIVE FRUIT */}
        <img
          src={active.img}
          alt=""
          className="absolute w-[90%] left-1/2 pointer-events-none"
          style={{
            top: "50%",
            transform: "translate(-50%, -50%)",
            animation:
              direction === "prev"
                ? "toActivePrev 0.6s ease-in-out forwards"
                : "toActiveUp 0.6s ease-in-out forwards",
          }}
        />

        {/* INCOMING HIDDEN */}
        <img
          src={hidden.img}
          alt=""
          className="absolute w-[90%] left-1/2 pointer-events-none opacity-0"
          style={{
            top: "50%",
            transform: "translate(-50%, -50%)",
            animation:
              direction === "prev"
                ? "toOutPrev 0.8s ease-in-out forwards"
                : "toOutUp 0.8s ease-in-out forwards",
          }}
        />
      </div>

      {/* Soda CAN MASK */}
      <div
        className="absolute top-1/2 left-1/2 z-10"
        style={{
          width: "calc(371px / 1.5)",
          height: "calc(673px / 1.5)",
          transform: "translate(-50%, -50%)",
          overflow: "hidden",
          borderRadius: "20px",
        }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url(${mockup}), url(${listSoda})`,
            backgroundPosition: `0 0, ${offset}px 0`,
            backgroundRepeat: "no-repeat, repeat-x",
            backgroundSize: "auto 100%, auto 100%",
            WebkitMaskImage: `url(${mockup})`,
            WebkitMaskSize: "auto 100%",
            WebkitMaskRepeat: "no-repeat",
            transition: "background-position 0.6s ease-in-out",
          }}
        />
      </div>

      {/* Leaves */}
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

      {/* Shadow */}
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

      {/* ARROWS */}
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

      {/* Animation Keyframes */}
      <style>{`
        @keyframes toActiveUp {
          from { top: 100%; opacity: 0; }
          to { top: 50%; opacity: 1; }
        }
        @keyframes toOutUp {
          from { top: 50%; opacity: 1; }
          to { top: -100%; opacity: 0; }
        }

        @keyframes toActivePrev {
          from { top: 0%; opacity: 0; }
          to { top: 50%; opacity: 1; }
        }
        @keyframes toOutPrev {
          from { top: 50%; opacity: 1; }
          to { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
