"use client";

import { useState } from "react";
import { PawPrint, Twitter, Instagram, Youtube, Mail, Send } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-white border-t border-slate-200/60 px-6 py-12 mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 pb-12 border-b border-slate-200/60">
          <div>
            <h3 className="font-serif text-2xl font-bold text-slate-900">Stay in the loop</h3>
            <p className="text-sm text-slate-500 mt-1">Get adoption tips, new pet listings, and exclusive offers.</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 md:w-64 px-4 py-2.5 rounded-full border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all"
              required
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-coral to-emerald text-white text-sm font-semibold rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              {subscribed ? "Subscribed! ✓" : <><Send className="w-4 h-4" /> Subscribe</>}
            </button>
          </form>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Col 1 - Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <PawPrint className="w-6 h-6 text-coral fill-coral/20" />
              <span className="font-serif text-2xl font-bold">Dofo</span>
            </Link>
            <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
              Connecting loving homes with adorable pets. Your journey to finding a perfect companion starts here.
            </p>
          </div>

          {/* Col 2 - Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/pets" className="hover:text-coral transition">Browse Pets</Link></li>
              <li><Link href="/shop" className="hover:text-coral transition">Pet Food Shop</Link></li>
              <li><Link href="/blog" className="hover:text-coral transition">Blog & Tips</Link></li>
              <li><Link href="/list-pet" className="hover:text-coral transition">List a Pet</Link></li>
            </ul>
          </div>

          {/* Col 3 - Support */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/blog" className="hover:text-coral transition">Help Center</Link></li>
              <li><Link href="/blog" className="hover:text-coral transition">Safety</Link></li>
              <li><Link href="/blog" className="hover:text-coral transition">Contact us</Link></li>
              <li><Link href="/login" className="hover:text-coral transition">My Account</Link></li>
            </ul>
          </div>

          {/* Col 4 - Social */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Follow us</h4>
            <div className="flex gap-3">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 rounded-full hover:bg-coral-light transition group">
                <Twitter className="w-4 h-4 text-slate-700 group-hover:text-coral" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 rounded-full hover:bg-coral-light transition group">
                <Instagram className="w-4 h-4 text-slate-700 group-hover:text-coral" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 rounded-full hover:bg-coral-light transition group">
                <Youtube className="w-4 h-4 text-slate-700 group-hover:text-coral" />
              </a>
              <a href="mailto:hello@dofo.in" className="p-2 bg-slate-100 rounded-full hover:bg-coral-light transition group">
                <Mail className="w-4 h-4 text-slate-700 group-hover:text-coral" />
              </a>
            </div>
            <p className="text-xs text-slate-400 mt-4">© 2026 Dofo. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
