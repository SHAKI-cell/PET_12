"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, PawPrint, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4">
      <nav className="glass w-full max-w-7xl rounded-2xl px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <PawPrint className="w-7 h-7 text-coral fill-coral/20" />
          <span className="font-serif text-2xl font-bold tracking-tight text-slate-900">
            Dofo
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
          <a href="#" className="hover:text-coral transition-colors relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-coral transition-all group-hover:w-full" />
          </a>
          <a href="#" className="hover:text-coral transition-colors">Find Pets</a>
          <a href="#" className="hover:text-coral transition-colors">About</a>
          <a href="#" className="hover:text-coral transition-colors">Contact</a>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button className="px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-full transition-all">
            List a pet
          </button>
          <button className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-coral to-emerald rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
            Sign Up
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-4 right-4 glass rounded-2xl p-6 md:hidden flex flex-col gap-4"
          >
            <a href="#" className="text-lg font-medium text-slate-700 hover:text-coral">Home</a>
            <a href="#" className="text-lg font-medium text-slate-700 hover:text-coral">Find Pets</a>
            <a href="#" className="text-lg font-medium text-slate-700 hover:text-coral">About</a>
            <a href="#" className="text-lg font-medium text-slate-700 hover:text-coral">Contact</a>
            <hr className="border-slate-200" />
            <button className="w-full py-3 text-center font-semibold bg-slate-100 rounded-full">List a pet</button>
            <button className="w-full py-3 text-center font-semibold text-white bg-gradient-to-r from-coral to-emerald rounded-full shadow-md">
              Sign Up
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
