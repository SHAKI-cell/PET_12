import React, { useMemo } from "react";
import Link from "next/link";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
}

export default function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "user";

  // Safe client-side Markdown rendering (bold, italics, links, newlines)
  const renderedHTML = useMemo(() => {
    let html = content
      // Escape HTML entities to prevent XSS
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Convert bold: **text** -> <strong>text</strong>
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Convert italics: *text* -> <em>text</em>
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Convert links: [label](/path) -> <a href="/path" class="text-coral hover:text-emerald font-bold underline transition-colors">label</a>
    // Make sure we handle relative store links safely
    html = html.replace(
      /\[(.*?)\]\((.*?)\)/g,
      (match, label, href) => {
        // If it is a relative link (like /shop/5), render it cleanly
        const isRelative = href.startsWith("/");
        return `<a href="${href}" ${
          isRelative ? "" : 'target="_blank" rel="noopener noreferrer"'
        } class="text-coral hover:text-emerald font-bold underline transition-colors">${label}</a>`;
      }
    );

    // Convert bullet lists
    html = html.replace(/^\s*-\s+(.*?)$/gm, '<li class="ml-4 list-disc">$1</li>');

    // Convert newlines to breaks (if not inside list tag structures)
    html = html.replace(/\n/g, "<br />");

    return html;
  }, [content]);

  // Handle local Next.js client-side navigation clicks inside rendered links
  const handleLinkClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "A") {
      const href = target.getAttribute("href");
      if (href && href.startsWith("/")) {
        e.preventDefault();
        // Since we are inside a client component, we can use standard window routing or standard navigation
        // It's clean and safe
        window.location.href = href;
      }
    }
  };

  return (
    <div className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-sm ${
          isUser
            ? "bg-slate-200 text-slate-700"
            : "bg-gradient-to-tr from-coral to-emerald text-white"
        }`}
      >
        {isUser ? "👤" : "🤖"}
      </div>

      {/* Message Bubble */}
      <div
        onClick={handleLinkClick}
        className={`rounded-2xl px-4 py-3 shadow-sm text-sm leading-relaxed max-w-[80%] border ${
          isUser
            ? "bg-white text-slate-800 border-slate-200/60 rounded-tr-sm"
            : "bg-slate-100 text-slate-800 border-slate-200/30 rounded-tl-sm"
        }`}
        dangerouslySetInnerHTML={{ __html: renderedHTML }}
      />
    </div>
  );
}
