"use client";

import { useEffect, useState } from "react";

const PremiumDogAnimation = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-4 h-4 rounded-full bg-[#D4A843]/30 animate-float-slow" />
        <div className="absolute top-32 right-16 w-6 h-6 rounded-full bg-[#D4A843]/20 animate-float-medium" />
        <div className="absolute bottom-20 left-20 w-3 h-3 rounded-full bg-white/20 animate-float-fast" />
        <div className="absolute bottom-40 right-10 w-5 h-5 rounded-full bg-[#D4A843]/25 animate-float-slow" />
        <div className="absolute top-1/2 left-5 w-2 h-2 rounded-full bg-white/30 animate-float-medium" />
      </div>

      {/* Animated Paw Prints */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-paw-float"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
              fontSize: `${1.2 + (i % 2) * 0.4}rem`,
              color: "rgba(212, 168, 67, 0.2)",
            }}
          >
            🐾
          </div>
        ))}
      </div>

      {/* Main Dog Container */}
      <div
        className={`relative z-10 transition-all duration-1000 ${
          mounted
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        {/* Glow Effect Behind Dog */}
        <div className="absolute -inset-10 bg-[#D4A843]/10 rounded-full blur-3xl animate-pulse-slow" />

        {/* SVG Dog Mascot */}
        <div className="relative w-72 h-72 lg:w-96 lg:h-96 animate-bob-gentle">
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full drop-shadow-2xl"
          >
            {/* Tail - Wagging Animation */}
            <g className="animate-tail-wag">
              <path
                d="M280 220 Q 320 180, 300 140 Q 280 100, 250 130 Q 230 160, 260 200"
                fill="#C8956C"
                stroke="#1a2a4a"
                strokeWidth="3"
              />
            </g>

            {/* Body */}
            <ellipse
              cx="200"
              cy="260"
              rx="90"
              ry="80"
              fill="#E8B87D"
              stroke="#1a2a4a"
              strokeWidth="3"
            />

            {/* Body Spot */}
            <ellipse
              cx="170"
              cy="250"
              rx="25"
              ry="20"
              fill="#C8956C"
              opacity="0.6"
            />

            {/* Back Legs */}
            <ellipse
              cx="140"
              cy="320"
              rx="25"
              ry="35"
              fill="#C8956C"
              stroke="#1a2a4a"
              strokeWidth="3"
            />
            <ellipse
              cx="260"
              cy="320"
              rx="25"
              ry="35"
              fill="#C8956C"
              stroke="#1a2a4a"
              strokeWidth="3"
            />

            {/* Front Legs */}
            <ellipse
              cx="165"
              cy="330"
              rx="20"
              ry="30"
              fill="#E8B87D"
              stroke="#1a2a4a"
              strokeWidth="3"
            />
            <ellipse
              cx="235"
              cy="330"
              rx="20"
              ry="30"
              fill="#E8B87D"
              stroke="#1a2a4a"
              strokeWidth="3"
            />

            {/* Head Group */}
            <g className="animate-head-tilt">
              {/* Head Shape */}
              <ellipse
                cx="200"
                cy="160"
                rx="85"
                ry="80"
                fill="#E8B87D"
                stroke="#1a2a4a"
                strokeWidth="3"
              />

              {/* Ears - Floppy with animation */}
              <g className="animate-ear-wiggle-right">
                <path
                  d="M260 130 Q 310 140, 315 190 Q 320 240, 280 230 Q 260 220, 255 180"
                  fill="#8B6914"
                  stroke="#1a2a4a"
                  strokeWidth="3"
                />
                <path
                  d="M265 145 Q 295 155, 298 185"
                  fill="none"
                  stroke="#C8956C"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </g>

              <g className="animate-ear-wiggle-left">
                <path
                  d="M140 130 Q 90 140, 85 190 Q 80 240, 120 230 Q 140 220, 145 180"
                  fill="#8B6914"
                  stroke="#1a2a4a"
                  strokeWidth="3"
                />
                <path
                  d="M135 145 Q 105 155, 102 185"
                  fill="none"
                  stroke="#C8956C"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </g>

              {/* Eyes - With Blink Animation */}
              <g className="animate-blink">
                <ellipse
                  cx="170"
                  cy="150"
                  rx="12"
                  ry="16"
                  fill="white"
                  stroke="#1a2a4a"
                  strokeWidth="2"
                />
                <circle cx="170" cy="150" r="8" fill="#1a2a4a" />
                <circle cx="173" cy="146" r="3" fill="white" />
              </g>
              <g className="animate-blink">
                <ellipse
                  cx="230"
                  cy="150"
                  rx="12"
                  ry="16"
                  fill="white"
                  stroke="#1a2a4a"
                  strokeWidth="2"
                />
                <circle cx="230" cy="150" r="8" fill="#1a2a4a" />
                <circle cx="233" cy="146" r="3" fill="white" />
              </g>

              {/* Snout */}
              <ellipse
                cx="200"
                cy="185"
                rx="35"
                ry="28"
                fill="#F5D0A9"
                stroke="#1a2a4a"
                strokeWidth="2"
              />

              {/* Nose */}
              <ellipse cx="200" cy="175" rx="12" ry="10" fill="#1a2a4a" />
              <ellipse
                cx="197"
                cy="172"
                rx="3"
                ry="2"
                fill="white"
                opacity="0.6"
              />

              {/* Mouth - Happy Smile */}
              <path
                d="M185 195 Q 200 210, 215 195"
                fill="none"
                stroke="#1a2a4a"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M190 205 Q 200 215, 210 205"
                fill="#FF6B6B"
                opacity="0.3"
              />

              {/* Tongue - Subtle animation */}
              <g className="animate-tongue">
                <ellipse cx="200" cy="208" rx="10" ry="14" fill="#FF6B6B" />
                <line
                  x1="200"
                  y1="208"
                  x2="200"
                  y2="218"
                  stroke="#CC5555"
                  strokeWidth="1"
                />
              </g>

              {/* Eyebrows - Cute expression */}
              <path
                d="M155 130 Q 165 125, 175 130"
                fill="none"
                stroke="#1a2a4a"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M225 130 Q 235 125, 245 130"
                fill="none"
                stroke="#1a2a4a"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>

            {/* Gold Bandana */}
            <path
              d="M140 215 Q 200 245, 260 215 L 250 235 Q 200 260, 150 235 Z"
              fill="#D4A843"
              stroke="#1a2a4a"
              strokeWidth="2"
              className="animate-bandana-shimmer"
            />
            <circle
              cx="200"
              cy="240"
              r="6"
              fill="white"
              stroke="#1a2a4a"
              strokeWidth="1.5"
            />
            <path
              d="M197 240 L203 240 M200 237 L200 243"
              stroke="#1a2a4a"
              strokeWidth="1"
            />

            {/* Food Bowl */}
            <g className="animate-bowl-float">
              <ellipse
                cx="200"
                cy="360"
                rx="50"
                ry="15"
                fill="#D4A843"
                stroke="#1a2a4a"
                strokeWidth="2"
              />
              <ellipse cx="200" cy="355" rx="42" ry="10" fill="#F5E6C8" />
              {/* Kibble dots */}
              <circle cx="185" cy="355" r="4" fill="#8B6914" />
              <circle cx="200" cy="352" r="4" fill="#8B6914" />
              <circle cx="215" cy="355" r="4" fill="#8B6914" />
              <circle cx="192" cy="358" r="3" fill="#A67C2E" />
              <circle cx="208" cy="358" r="3" fill="#A67C2E" />
            </g>

            {/* Bone beside bowl */}
            <g className="animate-bone-bounce">
              <rect
                x="270"
                y="348"
                width="40"
                height="12"
                rx="6"
                fill="white"
                stroke="#1a2a4a"
                strokeWidth="2"
              />
              <circle
                cx="275"
                cy="348"
                r="8"
                fill="white"
                stroke="#1a2a4a"
                strokeWidth="2"
              />
              <circle
                cx="275"
                cy="360"
                r="8"
                fill="white"
                stroke="#1a2a4a"
                strokeWidth="2"
              />
              <circle
                cx="305"
                cy="348"
                r="8"
                fill="white"
                stroke="#1a2a4a"
                strokeWidth="2"
              />
              <circle
                cx="305"
                cy="360"
                r="8"
                fill="white"
                stroke="#1a2a4a"
                strokeWidth="2"
              />
            </g>
          </svg>
        </div>

        {/* Premium Badge */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 animate-badge-pop">
          <div className="bg-[#D4A843] text-[#1a2a4a] px-6 py-2 rounded-full font-bold text-sm shadow-lg border-2 border-[#1a2a4a] flex items-center gap-2 whitespace-nowrap">
            <span className="text-lg">🐾</span>
            <span>DoFo Premium</span>
            <span className="text-lg">✨</span>
          </div>
        </div>
      </div>

      {/* Shimmer Text */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="font-bold text-lg animate-shimmer-text">
          Pure Goodness
        </p>
      </div>
    </div>
  );
};

export default PremiumDogAnimation;
