"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import FloatingAIButton from "./FloatingAIButton";

// Lazy load AIChatPanel for optimized performance and bundle chunking
const AIChatPanel = dynamic(() => import("./AIChatPanel"), {
  ssr: false
});

export default function FloatingAIWidget() {
  const [isOpen, setIsOpen] = useState(false);

  React.useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-dofo-ai", handleOpen);
    return () => window.removeEventListener("open-dofo-ai", handleOpen);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <FloatingAIButton isOpen={isOpen} onClick={handleToggle} />
      
      {/* Renders dynamic panel only when active or opened */}
      {isOpen && (
        <AIChatPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}
