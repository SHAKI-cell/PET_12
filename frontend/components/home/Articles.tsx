"use client";

import { motion } from "framer-motion";
import { articles } from "@/lib/articles";
import Link from "next/link";

const Articles = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-12">
        <div>
          <span className="text-sm font-semibold text-emerald uppercase tracking-wider">Latest News</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-1">From our blog</h2>
        </div>
        <Link href="/blog" className="hidden md:block text-sm font-semibold text-coral hover:underline">
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group bg-white rounded-3xl overflow-hidden card-shadow hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between"
          >
            <div>
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Body */}
              <div className="p-6">
                <span className="text-xs font-semibold text-coral uppercase tracking-wider">
                  Pet Care
                </span>
                <h3 className="font-serif text-lg font-bold leading-snug mt-2 group-hover:text-coral transition-colors duration-300 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-slate-500 text-sm mt-3 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
            </div>

            {/* Read More Footer */}
            <div className="px-6 pb-6 pt-2">
              <a
                href={`/blog/${article.slug}`}
                className="text-xs font-bold text-slate-900 group-hover:text-coral transition-colors flex items-center gap-1"
              >
                Read article <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Articles;
