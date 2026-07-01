"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, PawPrint, Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore, useFavoritesStore } from "@/lib/store";
import { cn } from "@/lib/utils";

import { useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/pets", label: "Find Pets" },
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Blog" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const cartItemCount = useCartStore((s) => s.getItemCount());
  const favoriteCount = useFavoritesStore((s) => s.favoriteIds.length);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4">
      <nav className="glass w-full max-w-7xl rounded-2xl px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <PawPrint className="w-7 h-7 text-coral fill-coral/20" />
          <span className="font-serif text-2xl font-bold tracking-tight text-slate-900">
            Dofo
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "hover:text-coral transition-colors relative group",
                pathname === link.href && "text-coral"
              )}
            >
              {link.label}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-coral transition-all",
                  pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                )}
              />
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Favorites */}
          <Link
            href="/dashboard/saved-pets"
            className="relative p-2 text-slate-700 hover:bg-slate-100 rounded-full transition-all"
          >
            <Heart className="w-5 h-5" />
            {mounted && favoriteCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-coral text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {favoriteCount > 9 ? "9+" : favoriteCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            href="/shop"
            className="relative p-2 text-slate-700 hover:bg-slate-100 rounded-full transition-all"
          >
            <ShoppingBag className="w-5 h-5" />
            {mounted && cartItemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-coral text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartItemCount > 9 ? "9+" : cartItemCount}
              </span>
            )}
          </Link>

          <Link
            href="/list-pet"
            className="px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-full transition-all"
          >
            List a pet
          </Link>
          <Link
            href="/signup"
            className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-coral to-emerald rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Sign Up
          </Link>
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-lg font-medium text-slate-700 hover:text-coral transition-colors",
                  pathname === link.href && "text-coral"
                )}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-slate-200" />
            <div className="flex gap-3">
              <Link
                href="/dashboard/saved-pets"
                onClick={() => setIsOpen(false)}
                className="relative p-2 text-slate-700 hover:bg-slate-100 rounded-full transition-all"
              >
                <Heart className="w-5 h-5" />
                {mounted && favoriteCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-coral text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {favoriteCount}
                  </span>
                )}
              </Link>
              <Link
                href="/shop"
                onClick={() => setIsOpen(false)}
                className="relative p-2 text-slate-700 hover:bg-slate-100 rounded-full transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                {mounted && cartItemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-coral text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
            <Link
              href="/list-pet"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 text-center font-semibold bg-slate-100 rounded-full"
            >
              List a pet
            </Link>
            <Link
              href="/signup"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 text-center font-semibold text-white bg-gradient-to-r from-coral to-emerald rounded-full shadow-md"
            >
              Sign Up
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
