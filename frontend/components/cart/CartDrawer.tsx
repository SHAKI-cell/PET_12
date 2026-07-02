"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  PackageCheck,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const subtotal = mounted ? getTotal() : 0;
  const shipping = subtotal > 499 ? 0 : 49;
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[70] flex w-full max-w-md flex-col bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-coral" />
                <h2 className="font-serif text-lg font-black text-slate-800">
                  Your Cart
                </h2>
                {mounted && items.length > 0 && (
                  <span className="rounded-full bg-coral-light px-2 py-0.5 text-xs font-black text-coral">
                    {items.reduce((s, i) => s + i.quantity, 0)} items
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {mounted && items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors cursor-pointer uppercase tracking-wide"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4 text-slate-600" />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {!mounted || items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50">
                    <ShoppingBag className="h-10 w-10 text-slate-200" />
                  </div>
                  <div>
                    <p className="font-serif font-bold text-slate-700">Your cart is empty</p>
                    <p className="mt-1 text-xs text-slate-400">
                      Add some pet food to get started!
                    </p>
                  </div>
                  <Link
                    href="/shop"
                    onClick={onClose}
                    className="mt-2 flex items-center gap-1.5 rounded-2xl bg-gradient-to-r from-coral to-emerald px-6 py-2.5 text-xs font-bold text-white shadow-md hover:shadow-lg hover:scale-105 transition-all"
                  >
                    Browse Shop
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-slate-50 px-5 py-2">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0 }}
                        className="flex gap-3 py-4"
                      >
                        {/* Image */}
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-50 border border-slate-100">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-contain p-1"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/images/placeholder.png";
                            }}
                          />
                        </div>

                        {/* Details */}
                        <div className="flex flex-1 flex-col justify-between min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="truncate text-xs font-bold text-slate-800 leading-tight">
                                {item.product.name}
                              </p>
                              <p className="text-[10px] text-slate-400 mt-0.5">
                                {item.product.brand || item.product.category}
                                {item.product.selectedWeight && ` • ${item.product.selectedWeight}`}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="flex-shrink-0 p-1 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-400 transition-colors cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Qty Controls */}
                            <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-0.5">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="flex h-6 w-6 items-center justify-center rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                              >
                                <Minus className="h-3 w-3 text-slate-500" />
                              </button>
                              <span className="w-6 text-center text-xs font-black text-slate-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="flex h-6 w-6 items-center justify-center rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                              >
                                <Plus className="h-3 w-3 text-slate-500" />
                              </button>
                            </div>

                            <p className="text-sm font-black text-slate-800">
                              ₹{(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer Summary */}
            {mounted && items.length > 0 && (
              <div className="border-t border-slate-100 bg-white px-5 py-4 space-y-3">
                {/* Free shipping banner */}
                {shipping > 0 && (
                  <div className="flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-100 px-3 py-2">
                    <Tag className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
                    <p className="text-[10px] font-bold text-amber-700">
                      Add ₹{(499 - subtotal).toFixed(0)} more for FREE shipping!
                    </p>
                  </div>
                )}
                {shipping === 0 && (
                  <div className="flex items-center gap-2 rounded-xl bg-emerald-light border border-emerald/20 px-3 py-2">
                    <PackageCheck className="h-3.5 w-3.5 text-emerald flex-shrink-0" />
                    <p className="text-[10px] font-bold text-emerald">
                      🎉 You've unlocked FREE shipping!
                    </p>
                  </div>
                )}

                {/* Price breakdown */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Shipping</span>
                    <span className={cn("font-semibold", shipping === 0 ? "text-emerald" : "")}>
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-slate-100 pt-1.5 font-black text-slate-800 text-sm">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-coral to-emerald py-3 text-sm font-black text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/shop"
                  onClick={onClose}
                  className="flex w-full items-center justify-center text-xs font-semibold text-slate-400 hover:text-coral transition-colors cursor-pointer"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
