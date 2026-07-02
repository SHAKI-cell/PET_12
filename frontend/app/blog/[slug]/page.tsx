"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, Eye, Heart, Bookmark, Share2, ArrowLeft, MessageSquare, ChevronRight, Copy, Check } from "lucide-react";
import { getArticleBySlug, getArticles } from "@/lib/api/blog";
import type { BlogArticle } from "@/lib/blog-data";
import { products } from "@/lib/data";
import { cn } from "@/lib/utils";

interface BlogArticlePageProps {
  params: {
    slug: string;
  };
}

export default function BlogArticlePage({ params }: BlogArticlePageProps) {
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);

  // User states
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Custom AI input state
  const [customQuestion, setCustomQuestion] = useState("");

  const articleRef = useRef<HTMLDivElement>(null);

  // Fetch article detail
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getArticleBySlug(params.slug);
      if (!data) {
        notFound();
        return;
      }
      setArticle(data);

      // Load related articles
      const allArticles = await getArticles();
      const related = allArticles.filter(
        (a) => data.relatedSlugs.includes(a.slug) && a.id !== data.id
      );
      setRelatedArticles(related);
      setLoading(false);
    }
    loadData();
  }, [params.slug]);

  // Scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const totalHeight = articleRef.current.clientHeight - window.innerHeight;
      const windowScroll = window.scrollY - articleRef.current.offsetTop;
      if (totalHeight > 0 && windowScroll > 0) {
        setScrollProgress(Math.min((windowScroll / totalHeight) * 100, 100));
      } else {
        setScrollProgress(0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [article]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-coral border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!article) {
    return notFound();
  }

  // Get matching store products for the article
  const relatedProducts = products.filter((p) =>
    article.relatedProductIds.includes(p.id)
  );

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Trigger floating AI chatbot with pre-filled question
  const triggerAIChat = (question: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-dofo-ai", { detail: { message: question } })
      );
    }
  };

  // Copy Link action
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Basic HTML-styled parser for content rendering
  const paragraphs = article.content.split("\n\n");

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Sticky Progress Bar */}
      <div className="fixed top-20 left-0 w-full h-1 bg-slate-100 z-40">
        <div
          className="h-full bg-gradient-to-r from-coral to-emerald transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-coral transition-colors mb-6 group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          Back to Knowledge Hub
        </Link>

        {/* Article Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Content Area */}
          <div ref={articleRef} className="lg:col-span-8 space-y-6">
            
            {/* Header Meta */}
            <div className="space-y-4">
              <span className="inline-block bg-emerald-light/60 text-emerald text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                {article.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-serif font-black text-slate-900 leading-tight">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-y border-slate-200/60 py-4 text-xs font-bold text-slate-500">
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
                    <img src={article.author.avatar} alt={article.author.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-slate-800 font-extrabold">{article.author.name}</h4>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Author & Expert</p>
                  </div>
                </div>

                {/* Article Info */}
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-300" /> {formatDate(article.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-300" /> {article.readTime}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-slate-300" /> {article.views} Views
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Cover Image */}
            <div className="aspect-[21/10] w-full rounded-[2.5rem] overflow-hidden bg-slate-100 shadow-sm border border-slate-200/40 relative">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Rendered Text Body */}
            <div className="prose prose-slate max-w-none p-6 md:p-8 bg-white border border-slate-200/50 rounded-[2.5rem] shadow-sm space-y-6">
              {paragraphs.map((p, idx) => {
                // If it starts with h2 header markdown
                if (p.startsWith("## ")) {
                  return (
                    <h2 key={idx} className="font-serif text-xl md:text-2xl font-bold text-slate-900 pt-4 pb-2 border-b border-slate-100">
                      {p.replace("## ", "")}
                    </h2>
                  );
                }
                // If it is a bullet list
                if (p.startsWith("- ")) {
                  return (
                    <ul key={idx} className="space-y-2 list-disc pl-5">
                      {p.split("\n").map((line, lIdx) => (
                        <li key={lIdx} className="text-sm leading-relaxed text-slate-600">
                          {line.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "$1")}
                        </li>
                      ))}
                    </ul>
                  );
                }
                // Normal paragraph (replace bold markup safely)
                return (
                  <p key={idx} className="text-sm leading-relaxed text-slate-600" dangerouslySetInnerHTML={{
                    __html: p.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                  }} />
                );
              })}
            </div>

            {/* Interaction Bar: Likes & bookmarks */}
            <div className="flex items-center justify-between p-4 bg-white border border-slate-200/50 rounded-[1.8rem] shadow-sm">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setLiked(!liked)}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:border-coral hover:bg-red-50/20 text-xs font-bold rounded-2xl transition-all cursor-pointer",
                    liked ? "text-coral border-coral bg-red-50/10" : "text-slate-500"
                  )}
                >
                  <Heart className={cn("w-4 h-4", liked && "fill-coral")} />
                  <span>{article.likes + (liked ? 1 : 0)} Likes</span>
                </button>

                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:border-emerald hover:bg-emerald-light/20 text-xs font-bold rounded-2xl transition-all cursor-pointer",
                    bookmarked ? "text-emerald border-emerald bg-emerald-light/10" : "text-slate-500"
                  )}
                >
                  <Bookmark className={cn("w-4 h-4", bookmarked && "fill-emerald")} />
                  <span>{bookmarked ? "Saved" : "Save"}</span>
                </button>
              </div>

              {/* Copy / Share buttons */}
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:border-slate-300 text-xs font-bold rounded-2xl text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Link Copied!" : "Copy Link"}</span>
              </button>
            </div>

            {/* Ask DoFo AI Integration Widget */}
            <div className="bg-gradient-to-tr from-coral/10 via-white to-emerald/10 p-6 md:p-8 rounded-[2.5rem] border border-emerald/10 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-coral to-emerald flex items-center justify-center text-white text-xl shadow-sm">
                  🤖
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-800">Ask DoFo AI Assistant</h3>
                  <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Quickly query pet care advice related to this article</p>
                </div>
              </div>

              {/* Predefined Questions Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={() => triggerAIChat(`Is the advice in "${article.title}" suitable for a 3 month puppy?`)}
                  className="text-left text-[11px] font-bold bg-white border border-slate-200 text-slate-600 hover:text-coral hover:border-coral px-3 py-2 rounded-2xl transition-all cursor-pointer shadow-sm"
                >
                  👶 Is this suitable for a 3 month puppy?
                </button>
                <button
                  onClick={() => triggerAIChat(`What food is best recommended in "${article.title}"?`)}
                  className="text-left text-[11px] font-bold bg-white border border-slate-200 text-slate-600 hover:text-coral hover:border-coral px-3 py-2 rounded-2xl transition-all cursor-pointer shadow-sm"
                >
                  🥣 What food is best recommended?
                </button>
              </div>

              {/* Custom Input */}
              <div className="relative flex items-center pt-2">
                <input
                  type="text"
                  placeholder="Ask a question about this article..."
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 bg-white border border-slate-200 rounded-2xl text-xs focus:outline-none focus:border-coral shadow-sm"
                />
                <button
                  onClick={() => {
                    if (customQuestion.trim()) {
                      triggerAIChat(customQuestion.trim());
                      setCustomQuestion("");
                    }
                  }}
                  disabled={!customQuestion.trim()}
                  className="absolute right-2 p-2 rounded-xl text-white bg-gradient-to-r from-coral to-emerald shadow-sm hover:scale-105 active:scale-95 disabled:opacity-0 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Related Store Products Grid */}
            {relatedProducts.length > 0 && (
              <div className="space-y-4 pt-4">
                <h3 className="font-serif text-xl font-bold text-slate-900 border-l-4 border-coral pl-3">
                  Recommended Products For You
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedProducts.map((prod) => (
                    <Link
                      key={prod.id}
                      href={`/shop/${prod.id}`}
                      className="group bg-white p-4 border border-slate-200/50 hover:border-slate-300 rounded-[1.8rem] transition-all flex gap-4 hover:shadow-premium"
                    >
                      <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-slate-100 border border-slate-100">
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow flex flex-col justify-between min-w-0">
                        <div>
                          <h4 className="font-bold text-sm text-slate-800 group-hover:text-coral transition-colors truncate">
                            {prod.name}
                          </h4>
                          <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{prod.brand}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-slate-900">Starts at ₹{prod.price}</span>
                          <span className="text-[10px] font-extrabold text-coral flex items-center gap-0.5">
                            Shop Now <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar Area (Right - Author Bio & Table of Contents & Related Articles) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Table of Contents */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-200/50 shadow-sm space-y-3">
              <h3 className="font-serif text-sm font-bold text-slate-800 border-b border-slate-100 pb-2.5">
                Table of Contents
              </h3>
              <nav className="space-y-2.5">
                {paragraphs
                  .filter((p) => p.startsWith("## "))
                  .map((p, idx) => {
                    const headerText = p.replace("## ", "");
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          const elements = document.getElementsByTagName("h2");
                          for (let i = 0; i < elements.length; i++) {
                            if (elements[i].textContent === headerText) {
                              elements[i].scrollIntoView({ behavior: "smooth", block: "center" });
                              break;
                            }
                          }
                        }}
                        className="text-left text-xs font-semibold text-slate-500 hover:text-coral hover:underline transition-colors block w-full truncate cursor-pointer"
                      >
                        {headerText}
                      </button>
                    );
                  })}
              </nav>
            </div>

            {/* Author Bio Card */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-200/50 shadow-sm text-center space-y-3">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 border border-slate-200 mx-auto shadow-sm">
                <img src={article.author.avatar} alt={article.author.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-serif text-base font-bold text-slate-800">{article.author.name}</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                {article.author.bio}
              </p>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="bg-white p-6 rounded-[2rem] border border-slate-200/50 shadow-sm space-y-4">
                <h3 className="font-serif text-sm font-bold text-slate-800 border-b border-slate-100 pb-2.5">
                  Related Articles
                </h3>
                <div className="space-y-3">
                  {relatedArticles.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/blog/${rel.slug}`}
                      className="group flex gap-3 items-start border-b border-slate-50 pb-3 last:border-0 last:pb-0"
                    >
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                        <img src={rel.image} alt={rel.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-[11px] text-slate-800 leading-snug group-hover:text-coral transition-colors line-clamp-2">
                          {rel.title}
                        </h4>
                        <span className="text-[9px] text-slate-400 font-semibold">{rel.readTime}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
