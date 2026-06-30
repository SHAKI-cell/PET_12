"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/testimonials";

const Testimonials = () => {
  return (
    <section className="bg-white/60 border-y border-slate-200/60 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold">Our customers love us</h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="flex gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current" />
              ))}
            </div>
            <span className="text-lg font-semibold text-slate-700 ml-2">5.0 star</span>
            <span className="text-sm text-slate-400">Based on 4 reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-3xl card-shadow hover:shadow-premium-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-coral-light to-emerald-light flex items-center justify-center font-serif font-bold text-lg text-coral">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">{t.name}</h4>
                    <div className="flex gap-0.5 text-amber-400 mt-0.5">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed italic">
                  "{t.review}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
