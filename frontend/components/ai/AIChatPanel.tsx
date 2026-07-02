"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, Send, AlertCircle, ShoppingBag } from "lucide-react";
import MessageBubble from "./MessageBubble";
import QuickActions from "./QuickActions";
import TypingIndicator from "./TypingIndicator";
import { Button } from "@/components/ui/Button";

interface AIChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE = `Hi 👋

I'm **DoFo AI**, your personal Pet Nutrition Assistant.

I can help you with:
🐶 **Pet food recommendations**
🥩 **Nutrition guidance**
📦 **Product search**
⚖ **Product comparison**
🍗 **Feeding guide**

💬 Ask me anything about your pet!`;

export default function AIChatPanel({ isOpen, onClose }: AIChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: WELCOME_MESSAGE
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus trap and ESC key closure
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    setError(null);
    const userMsgId = Date.now().toString();
    const newUserMsg: Message = {
      id: userMsgId,
      role: "user",
      content: text.trim()
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    setLoading(true);

    try {
      // Send chat history to backend API /api/ai
      // Slice(1) to exclude the welcome message from the API context (optional, but cleaner)
      const chatHistory = [...messages, newUserMsg].map((m) => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory })
      });

      if (!res.ok) throw new Error("Failed to connect to AI Assistant");

      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.response
        }
      ]);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Listen to open-dofo-ai custom event to trigger query automatically
  useEffect(() => {
    const handleQueryTrigger = (e: Event) => {
      const customEvent = e as CustomEvent;
      const queryText = customEvent.detail?.message;
      if (queryText && queryText.trim()) {
        setTimeout(() => {
          handleSendMessage(queryText.trim());
        }, 400);
      }
    };
    window.addEventListener("open-dofo-ai", handleQueryTrigger);
    return () => window.removeEventListener("open-dofo-ai", handleQueryTrigger);
  }, [messages, loading]);

  return (
    <motion.div
      ref={panelRef}
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 250 }}
      role="dialog"
      aria-modal="true"
      aria-label="DoFo AI Assistant Panel"
      className="fixed top-0 right-0 h-full bg-white z-50 shadow-2xl border-l border-slate-200 flex flex-col w-full mobile-width md:max-w-[360px] lg:max-w-[400px]"
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-coral to-emerald flex items-center justify-center text-white text-lg shadow-sm">
            🤖
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              DoFo AI Assistant
            </h2>
            <p className="text-[10px] font-semibold text-slate-400">Powered by Google Gemini</p>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close Assistant"
          className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Message List */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-slate-50/30"
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
        ))}
        {loading && <TypingIndicator />}
        
        {error && (
          <div className="flex items-center gap-2 p-3.5 bg-red-50 border border-red-150 rounded-2xl text-xs text-red-600 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Bottom Input Area */}
      <div className="p-4 border-t border-slate-100 bg-white space-y-3">
        {/* Suggestion Chips */}
        {messages.length === 1 && !loading && (
          <QuickActions onActionClick={(text) => handleSendMessage(text)} />
        )}

        {/* Input bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
          className="relative flex items-center"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask me about pet nutrition..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={loading}
            aria-label="Ask AI Assistant"
            className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200/80 rounded-2xl text-sm focus:outline-none focus:border-coral focus:bg-white disabled:opacity-60 transition-colors"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || loading}
            aria-label="Send Message"
            className="absolute right-2 p-2 rounded-xl text-white bg-gradient-to-r from-coral to-emerald shadow-sm hover:shadow hover:scale-105 disabled:opacity-0 disabled:scale-95 transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      <style jsx>{`
        .mobile-width {
          width: 100%;
        }
        @media (min-width: 768px) {
          .mobile-width {
            width: 360px;
          }
        }
        @media (min-width: 1024px) {
          .mobile-width {
            width: 400px;
          }
        }
      `}</style>
    </motion.div>
  );
}
