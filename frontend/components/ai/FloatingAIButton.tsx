"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface FloatingAIButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function FloatingAIButton({ isOpen, onClick }: FloatingAIButtonProps) {
  const [shouldPulse, setShouldPulse] = useState(false);

  useEffect(() => {
    // Check if user has already visited in this session
    if (typeof window !== "undefined") {
      const visited = sessionStorage.getItem("dofo_ai_visited");
      if (!visited) {
        setShouldPulse(true);
        sessionStorage.setItem("dofo_ai_visited", "true");
      }
    }
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Pulse Rings - visible only on first visit */}
      {shouldPulse && !isOpen && (
        <>
          <span className="absolute inline-flex h-full w-full rounded-full bg-coral/30 opacity-75 animate-ping" />
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald/20 opacity-40 animate-ping [animation-delay:400ms]" />
        </>
      )}

      {/* Floating Button */}
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.1, rotate: isOpen ? -90 : 5 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-coral to-emerald text-white flex items-center justify-center shadow-premium hover:shadow-card-hover border border-white/20 backdrop-blur-md transition-shadow relative cursor-pointer"
      >
        {isOpen ? (
          <MessageCircle className="w-6 h-6 rotate-180" />
        ) : (
          <Sparkles className="w-6 h-6 animate-pulse-slow" />
        )}
      </motion.button>

      <style jsx global>{`
        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.06); opacity: 0.95; }
        }
        .animate-pulse-slow {
          animation: pulseSlow 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
