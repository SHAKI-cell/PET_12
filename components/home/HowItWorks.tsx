"use client";

import { motion } from "framer-motion";
import { Search, MessageCircle, HeartHandshake } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search",
    desc: "Find your match by breed, location, or age.",
  },
  {
    icon: MessageCircle,
    title: "Connect",
    desc: "Chat with the current owner and schedule a meet.",
  },
  {
    icon: HeartHandshake,
    title: "Adopt",
    desc: "Complete the paperwork and bring them home forever.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white/60 border-y border-slate-200/60 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-emerald uppercase tracking-wider">Simple Process</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-1">How It Works</h2>
          <p className="text-slate-600 mt-4">Three easy steps to find your new best friend.</p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Dashed line connector (desktop) */}
          <div className="hidden md:block absolute top-1/3 left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-slate-300 -translate-y-1/2" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center text-center bg-white rounded-3xl p-8 card-shadow hover:shadow-premium-lg transition-shadow"
            >
              <div className="w-20 h-20 rounded-full bg-coral-light flex items-center justify-center text-coral mb-6">
                <step.icon className="w-10 h-10" strokeWidth={1.5} />
              </div>
              <span className="absolute -top-3 right-4 text-sm font-bold text-slate-300">0{idx + 1}</span>
              <h3 className="font-serif text-2xl font-bold">{step.title}</h3>
              <p className="text-slate-500 text-sm mt-2 max-w-xs">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
