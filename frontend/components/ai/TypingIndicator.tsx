import React from "react";

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      {/* AI Avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-coral to-emerald flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm">
        🤖
      </div>
      {/* Typing Bubble */}
      <div className="bg-slate-100 text-slate-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-slate-200/50 max-w-[80%]">
        <div className="flex items-center gap-1.5 h-5">
          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
