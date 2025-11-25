import React, { useState } from "react";

import strawberry from "../assets/fruits/fruit_strawberry.png";
import avocado from "../assets/fruits/fruit_avocado.png";
import orange from "../assets/fruits/fruit_orange.png";
import mockup from "../assets/fruits/mockup.png";
import listSoda from "../assets/fruits/listSoda.jpg";
import leavesImg from "../assets/fruits/leaves.png";

const slides = [
  { name: "Strawberry", bg: "#EA3D41", img: strawberry, left: "0%" },
  { name: "Avocado", bg: "#2D5643", img: avocado, left: "-250px" },
  { name: "Orange", bg: "#E7A043", img: orange, left: "-500px" },
];

export default function FruitAnimation() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("left");

  const next = () => {
    setDirection("left");
    setIndex((i) => (i + 1) % slides.length);
  };

  const prev = () => {
    setDirection("right");
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  };

  const active = slides[index];
  const hidden = slides[(index + 1) % slides.length];

  return (
    <div className="w-screen h-screen relative overflow-hidden font-mono">
      {/* Header */}
      <header className="absolute top-0 w-full z-50 flex justify-between items-center px-12 py-3 font-bold text-lg text-white">
        <div>LUNDEV</div>
        <ul className="flex gap-6">
          <li>HOME</li>
          <li>CONTACT</li>
          <li>INFO</li>
        </ul>
      </header>

      {/* Slides */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ backgroundColor: active.bg }}
      >
        {/* Active Content */}
        <div className="absolute text-white font-extrabold uppercase text-[6rem] md:text-[12rem] z-10">
          {active.name}
        </div>
        <img
          src={active.img}
          alt={active.name}
          className="absolute w-[90%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            animation:
              direction === "right"
                ? "toActivePrev 0.5s ease-in-out forwards"
                : "toActive 0.5s ease-in-out forwards",
          }}
        />

        {/* Hidden Slide */}
        <div className="absolute text-white font-extrabold uppercase text-[6rem] md:text-[12rem] opacity-0">
          {hidden.name}
        </div>
        <img
          src={hidden.img}
          alt={hidden.name}
          className="absolute w-[90%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 pointer-events-none"
          style={{
            animation: "toOut 0.8s ease-in-out forwards",
          }}
        />
      </div>

      {/* Mockup */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        style={{
          width: "calc(371px / 1.5)",
          height: "calc(673px / 1.5)",
          overflow: "hidden",
          borderRadius: "20px",
          backgroundColor: "transparent",
        }}
      >
        <div
          className="w-full h-full"
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${listSoda})`,
            backgroundPosition: `${active.left} 0`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "auto 100%",
            transition: "background-position 0.5s",
            WebkitMaskImage: `url(${mockup})`,
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "cover",
            maskImage: `url(${mockup})`,
            maskRepeat: "no-repeat",
            maskSize: "cover",
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

      {/* Arrows */}
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

      {/* Animations */}
      <style>{`
        @keyframes toActive {
          from { transform: translate(-50%, -60%) scale(0); opacity: 0; }
          to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        @keyframes toOut {
          from { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          to { transform: translate(-50%, -60%) scale(0); opacity: 0; }
        }
        @keyframes toActivePrev {
          from { transform: translate(-50%, -40%) scale(0); opacity: 0; }
          to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
