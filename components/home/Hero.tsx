"use client";

import { motion } from "framer-motion";
import { Search, MapPin, PawPrint, ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-radial py-12">
      {/* Abstract background shapes */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-coral/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (Text & Search) */}
          <div className="lg:col-span-7">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-white/40 rounded-full px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm mb-6"
            >
              <PawPrint className="w-4 h-4 text-coral" />
              <span>Trusted by 10,000+ pet lovers</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.1] tracking-tight"
            >
              Find Your <br />
              <span className="text-gradient">Perfect Companion</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-slate-600 max-w-lg mt-6 leading-relaxed"
            >
              Discover loving pets near you. From playful pups to cuddly kittens — your new best friend is just a click away.
            </motion.p>

            {/* Premium Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 bg-white/80 backdrop-blur-xl border border-white/60 shadow-premium rounded-full p-2 flex flex-col md:flex-row items-center gap-2"
            >
              <div className="flex items-center gap-2 px-4 w-full md:w-auto flex-1">
                <MapPin className="w-5 h-5 text-coral shrink-0" />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full bg-transparent py-3 text-sm placeholder:text-slate-400 focus:outline-none"
                  defaultValue="New York, NY"
                />
              </div>
              <div className="hidden md:block w-px h-8 bg-slate-200" />
              <div className="flex items-center gap-2 px-4 w-full md:w-auto flex-1">
                <PawPrint className="w-5 h-5 text-coral shrink-0" />
                <input
                  type="text"
                  placeholder="Pet type"
                  className="w-full bg-transparent py-3 text-sm placeholder:text-slate-400 focus:outline-none"
                  defaultValue="Any"
                />
              </div>
              <div className="hidden md:block w-px h-8 bg-slate-200" />
              <div className="flex items-center gap-2 px-4 w-full md:w-auto flex-1">
                <Search className="w-5 h-5 text-coral shrink-0" />
                <input
                  type="text"
                  placeholder="Breed"
                  className="w-full bg-transparent py-3 text-sm placeholder:text-slate-400 focus:outline-none"
                  defaultValue=""
                />
              </div>

              <button className="w-full md:w-auto bg-gradient-to-r from-coral to-emerald text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                Search <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex gap-8 mt-8"
            >
              <div>
                <p className="text-2xl font-bold text-slate-900">10k+</p>
                <p className="text-sm text-slate-500">Happy pets</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">500+</p>
                <p className="text-sm text-slate-500">Breeders</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">98%</p>
                <p className="text-sm text-slate-500">Satisfaction</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column (Cute Dog Image Container) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            {/* Round container with overflow-hidden and scaled-up image to crop thin black borders */}
            <div className="relative w-full max-w-[380px] aspect-square rounded-[3rem] overflow-hidden shadow-premium-lg border-8 border-white bg-[#FBE7A1] group">
              <motion.img
                src="/images/cute_dog.png"
                alt="Cute Cartoon Dog"
                className="w-full h-full object-cover scale-[1.08] group-hover:scale-[1.12] transition-transform duration-500"
                animate={{
                  y: [0, -8, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut"
                }}
              />
              
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-sm text-xs font-bold text-slate-800 border border-slate-100">
                🐾 Mascot: DoFo Puppy
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
