"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IntroLoader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show the intro for 2.8 seconds, then fade out
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FBE7A1] overflow-hidden"
        >
          {/* Decorative background pulse rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/20 rounded-full animate-pulse duration-1000 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/10 rounded-full animate-pulse duration-1500 pointer-events-none" />

          {/* Animated Dog Container */}
          <div className="relative flex flex-col items-center">
            {/* The Bouncing/Scaling Cute Dog Container */}
            <motion.div
              initial={{ scale: 0.3, y: 100, rotate: -15 }}
              animate={{ 
                scale: [0.3, 1.1, 1], 
                y: [100, -20, 0],
                rotate: [-15, 8, 0]
              }}
              transition={{ 
                duration: 1.2, 
                ease: "easeOut",
                times: [0, 0.7, 1]
              }}
              className="relative w-60 h-60 md:w-72 md:h-72 rounded-[3rem] overflow-hidden bg-[#FBE7A1] border-8 border-white shadow-premium-lg"
            >
              {/* Playful keyframe movements (Head tilt + bounce + breathing scale) representing a 2-3s looping animation */}
              <motion.img
                src="/images/cute_dog.png"
                alt="Cute Dog Loader"
                className="w-full h-full object-cover"
                animate={{
                  y: [0, -16, 0, -16, 0], // Double bounce
                  rotate: [0, -6, 6, -6, 0], // Head tilts side-to-side
                  scale: [1.08, 1.13, 1.08, 1.13, 1.08] // Dynamic breathing/pulse scale
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.8, // 2.8 seconds loop matching the intro duration
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Glowing Ring Loader around the text */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "240px" }}
              transition={{ duration: 2.2, ease: "easeInOut", delay: 0.3 }}
              className="h-1 bg-coral rounded-full mt-8 shadow-sm"
            />

            {/* Premium Animated Brand Name */}
            <div className="mt-4 overflow-hidden flex gap-1">
              {["D", "O", "F", "O"].map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.6 + index * 0.15,
                    duration: 0.6,
                    ease: "easeOut"
                  }}
                  className="font-serif text-4xl md:text-5xl font-bold tracking-widest text-[#8B5A2B]"
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8B5A2B]/70 mt-2"
            >
              Loading Pure Goodness...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroLoader;
