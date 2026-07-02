"use client";

import React, { useState, useEffect, useTransition } from "react";
import { Search, Calendar, Clock, Eye, Heart, Bookmark, ArrowRight, BookOpen, Compass } from "lucide-react";
import Link from "next/link";
import { getArticles, getAllCategories, type BlogFilters } from "@/lib/api/blog";
import type { BlogArticle } from "@/lib/blog-data";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/Input";

export default function BlogPage() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState<BlogFilters["sortBy"]>("newest");
  const [loading, setLoading] = useState(true);

  // Likes and Bookmarks local persistence simulation
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  const categories = ["all", ...getAllCategories()];

  // Fetch articles on filter change
  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      const data = await getArticles({
        category: activeCategory,
        search,
        sortBy
      });
      setArticles(data);
      setLoading(false);
    }
    fetchArticles();
  }, [activeCategory, search, sortBy]);

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleBookmark = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <div className="text-center py-12 md:py-16 bg-gradient-to-br from-sage/20 to-emerald-light/20 rounded-[3rem] border border-emerald/10 mb-12">
          <BookOpen className="w-12 h-12 text-emerald mx-auto mb-4" />
          <h1 className="text-4xl md:text-6xl font-serif font-black text-slate-900 tracking-tight">
            Pet Care Knowledge Hub
          </h1>
          <p className="text-slate-600 mt-3 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Expert nutrition advice, breed guides, health schedules, and pet care tips to help your companion thrive.
          </p>
        </div>

        {/* Toolbar: Search, Sort, Category Scroll */}
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200/60 shadow-sm space-y-6 mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search articles by title, breed, food..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-slate-50/50 border-slate-200/80 rounded-2xl text-sm"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sort by</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as BlogFilters["sortBy"])}
                className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-coral cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="views">Most Viewed</option>
                <option value="readTime">Reading Time</option>
              </select>
            </div>
          </div>

          {/* Categories Filter Scrollable Track */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 cursor-pointer border",
                  activeCategory === cat
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                {cat === "all" ? "🐾 All Topics" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-slate-100 h-[420px] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => {
              const isLiked = likedIds.includes(article.id);
              const isBookmarked = bookmarkedIds.includes(article.id);
              const likeCount = article.likes + (isLiked ? 1 : 0);

              return (
                <div
                  key={article.id}
                  className="group bg-white rounded-[2rem] overflow-hidden border border-slate-200/50 hover:border-slate-300 hover:shadow-premium hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    {/* Cover Image */}
                    <Link href={`/blog/${article.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={article.image}
                        alt={article.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      />
                      <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[9px] font-black text-emerald uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                        {article.category}
                      </span>
                    </Link>

                    {/* Card Content */}
                    <div className="p-6">
                      {/* Meta information */}
                      <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-300" /> {formatDate(article.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-300" /> {article.readTime}
                        </span>
                      </div>

                      {/* Title & Excerpt */}
                      <Link href={`/blog/${article.slug}`}>
                        <h3 className="font-serif text-lg font-bold text-slate-900 leading-snug group-hover:text-coral transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                      </Link>
                      <p className="text-slate-500 text-xs mt-3 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 pb-6 pt-3 border-t border-slate-50">
                    <div className="flex items-center justify-between">
                      {/* Author */}
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-100 border border-slate-200">
                          <img src={article.author.avatar} alt={article.author.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[11px] font-bold text-slate-700 truncate max-w-[100px]">
                          {article.author.name}
                        </span>
                      </div>

                      {/* Action widgets */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => toggleLike(e, article.id)}
                          className={cn(
                            "flex items-center gap-1 text-[11px] font-bold transition-colors cursor-pointer",
                            isLiked ? "text-coral" : "text-slate-400 hover:text-coral"
                          )}
                          title="Like article"
                        >
                          <Heart className={cn("w-3.5 h-3.5", isLiked && "fill-coral")} />
                          <span>{likeCount}</span>
                        </button>

                        <button
                          onClick={(e) => toggleBookmark(e, article.id)}
                          className={cn(
                            "text-slate-400 hover:text-emerald transition-colors cursor-pointer",
                            isBookmarked && "text-emerald"
                          )}
                          title="Bookmark article"
                        >
                          <Bookmark className={cn("w-3.5 h-3.5", isBookmarked && "fill-emerald")} />
                        </button>

                        <Link
                          href={`/blog/${article.slug}`}
                          className="p-1.5 rounded-full bg-slate-50 group-hover:bg-coral-light text-slate-700 group-hover:text-coral transition-all duration-300"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty state search */}
        {!loading && articles.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/50">
            <Compass className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-serif text-lg font-bold text-slate-800">No articles found</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto mt-2">
              Try searching different keywords, breeds, or choose another topic category.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
