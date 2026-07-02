"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const LoginModal = dynamic(() => import("@/components/auth/LoginModal"), { ssr: false });
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Tag,
  PackageCheck,
  ChevronRight,
  ChevronLeft,
  CreditCard,
  Smartphone,
  Building2,
  Banknote,
  CheckCircle2,
  Shield,
  Truck,
  ArrowLeft,
  AlertTriangle,
  Zap,
  Star,
  MapPin,
  Phone,
  Mail,
  User,
  Home,
  Copy,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore, useAuthStore } from "@/lib/store";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

interface Address {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

type PaymentMethod = "upi" | "card" | "netbanking" | "cod";

const STEPS = ["Cart", "Address", "Payment", "Confirmation"];

// Proper branded SVG logos for UPI apps
// ── Google Pay: white card, coloured "G" + "Pay" wordmark ──
const GPay = () => (
  <svg viewBox="0 0 56 56" className="h-10 w-10" xmlns="http://www.w3.org/2000/svg">
    <rect width="56" height="56" rx="12" fill="white" stroke="#E8EAED" strokeWidth="1"/>
    {/* Coloured G */}
    <path fill="#4285F4" d="M29 26.8h8.3c.1.6.2 1.2.2 1.9 0 5.3-3.6 9.1-9 9.1-5.2 0-9.5-4.2-9.5-9.5s4.3-9.5 9.5-9.5c2.5 0 4.7 1 6.3 2.5l-2.6 2.5c-1-.9-2.3-1.5-3.7-1.5-3.2 0-5.8 2.6-5.8 5.9s2.6 5.9 5.8 5.9c3 0 4.9-1.7 5.2-4H29v-3.3z"/>
    <path fill="#34A853" d="M19 31.6l-3.3-2.5c-.6-1.3-.9-2.7-.9-4.2s.3-2.9.9-4.2l3.3-2.5c-.8 1.9-1.2 4-1.2 6.7s.4 4.8 1.2 6.7z" transform="translate(0,1)"/>
    <path fill="#FBBC05" d="M29 18.8c2.5 0 4.7.9 6.4 2.4l3.3-3.3C36.2 15.8 32.9 14.3 29 14.3c-5.3 0-9.9 3-12.3 7.4l3.5 2.7c1.1-3.4 4.3-5.6 8.8-5.6z"/>
    <path fill="#EA4335" d="M29 37.8c-4.5 0-7.7-2.2-8.8-5.6l-3.5 2.7c2.4 4.4 7 7.4 12.3 7.4 3.9 0 7.2-1.4 9.7-3.8l-3.4-2.7c-1.5 1.3-3.5 2-6.3 2z"/>
  </svg>
);

// ── PhonePe: deep purple card, white "Ph" wordmark + teal dot ──
const PhonePe = () => (
  <svg viewBox="0 0 56 56" className="h-10 w-10" xmlns="http://www.w3.org/2000/svg">
    <rect width="56" height="56" rx="12" fill="#5F259F"/>
    {/* Stylised P shape */}
    <path fill="white" d="M20 14h10c5 0 9 4 9 9s-4 9-9 9h-5v10h-5V14zm5 5v8h5c2.2 0 4-1.8 4-4s-1.8-4-4-4h-5z"/>
    {/* Teal dot – PhonePe's signature element */}
    <circle cx="40" cy="14" r="5" fill="#00BAF2"/>
  </svg>
);

// ── Paytm: navy card, cyan+white "Paytm" logo block ──
const Paytm = () => (
  <svg viewBox="0 0 56 56" className="h-10 w-10" xmlns="http://www.w3.org/2000/svg">
    <rect width="56" height="56" rx="12" fill="#00BAF2"/>
    {/* Dark bar at top */}
    <rect x="0" y="0" width="56" height="22" rx="12" fill="#002B7A"/>
    <rect x="0" y="10" width="56" height="12" fill="#002B7A"/>
    {/* "Paytm" text */}
    <text x="28" y="17" textAnchor="middle" fontSize="9" fontWeight="900" fill="white" fontFamily="Arial,sans-serif" letterSpacing="0.5">Paytm</text>
    {/* Bottom "PAYMENTS" on cyan */}
    <text x="28" y="38" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#002B7A" fontFamily="Arial,sans-serif" letterSpacing="0.3">PAYMENTS</text>
    <text x="28" y="49" textAnchor="middle" fontSize="6" fontWeight="700" fill="#002B7A" fontFamily="Arial,sans-serif" letterSpacing="0.3">BANK</text>
  </svg>
);

// ── BHIM UPI: official blue-indigo card, orange swoosh, BHIM text ──
const Bhim = () => (
  <svg viewBox="0 0 56 56" className="h-10 w-10" xmlns="http://www.w3.org/2000/svg">
    <rect width="56" height="56" rx="12" fill="#1A3F91"/>
    {/* Orange arc / swoosh */}
    <path fill="#F47920" d="M8 36 Q28 10 48 36 Q38 28 28 26 Q18 28 8 36z"/>
    {/* BHIM white text */}
    <text x="28" y="30" textAnchor="middle" fontSize="10" fontWeight="900" fill="white" fontFamily="Arial Black,sans-serif" letterSpacing="1">BHIM</text>
    {/* UPI label */}
    <text x="28" y="48" textAnchor="middle" fontSize="7" fontWeight="700" fill="#F47920" fontFamily="Arial,sans-serif" letterSpacing="2">UPI</text>
  </svg>
);

const UPI_APPS = [
  { id: "gpay",    label: "Google Pay", Logo: GPay },
  { id: "phonepe", label: "PhonePe",   Logo: PhonePe },
  { id: "paytm",   label: "Paytm",     Logo: Paytm },
  { id: "bhim",    label: "BHIM UPI",  Logo: Bhim },
];

const BANKS = [
  "State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank",
  "Kotak Mahindra Bank", "Punjab National Bank", "Bank of Baroda",
];

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Chandigarh", "Puducherry",
];

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [upiApp, setUpiApp] = useState("gpay");
  const [upiId, setUpiId] = useState("");
  const [selectedBank, setSelectedBank] = useState("State Bank of India");
  const [processing, setProcessing] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [address, setAddress] = useState<Address>({
    name: "", phone: "", email: "",
    address: "", city: "", state: "Maharashtra", pincode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cardNo, setCardNo] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => setMounted(true), []);

  // Pre-fill address from logged-in user
  useEffect(() => {
    if (user) {
      setAddress((prev) => ({
        ...prev,
        name: prev.name || user.name,
        email: prev.email || user.email,
      }));
    }
  }, [user]);

  const subtotal = mounted ? getTotal() : 0;
  const shipping = subtotal > 499 ? 0 : 49;
  const total = subtotal - discount + shipping;

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (code === "DOFO10") { setAppliedCoupon(code); setDiscount(Math.round(subtotal * 0.1)); }
    else if (code === "PETLOVE") { setAppliedCoupon(code); setDiscount(50); }
    else if (code === "FIRSTPET") { setAppliedCoupon(code); setDiscount(100); }
    else { setErrors((e) => ({ ...e, coupon: "Invalid coupon code" })); }
  };

  const validateAddress = () => {
    const errs: Record<string, string> = {};
    if (!address.name.trim()) errs.name = "Name is required";
    if (!address.phone.trim() || !/^\d{10}$/.test(address.phone)) errs.phone = "Valid 10-digit phone required";
    if (!address.email.trim() || !address.email.includes("@")) errs.email = "Valid email required";
    if (!address.address.trim()) errs.address = "Street address required";
    if (!address.city.trim()) errs.city = "City is required";
    if (!address.pincode.trim() || !/^\d{6}$/.test(address.pincode)) errs.pincode = "Valid 6-digit PIN required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validatePayment = () => {
    const errs: Record<string, string> = {};
    if (paymentMethod === "upi" && upiApp === "manual" && !upiId.includes("@")) {
      errs.upiId = "Enter valid UPI ID (e.g. name@upi)";
    }
    if (paymentMethod === "card") {
      if (cardNo.replace(/\s/g, "").length < 16) errs.cardNo = "Enter 16-digit card number";
      if (!cardName.trim()) errs.cardName = "Name on card required";
      if (!cardExpiry.match(/^\d{2}\/\d{2}$/)) errs.cardExpiry = "Format: MM/YY";
      if (cardCVV.length < 3) errs.cardCVV = "3-digit CVV required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && !validateAddress()) return;
    if (step === 2 && !validatePayment()) return;
    setStep((s) => s + 1);
  };

  const handlePlaceOrder = () => {
    if (!validatePayment()) return;
    setProcessing(true);
    const id = `DOFO-ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    setTimeout(() => {
      setOrderId(id);
      setStep(3);         // show confirmation screen FIRST
      setProcessing(false);
      // clear cart after the confirmation screen has rendered
      setTimeout(() => clearCart(), 100);
    }, 2200);
  };

  const formatCard = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 2) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  const router = useRouter();

  // ─── ORDER CONFIRMED SCREEN ───────────────────────────────────────────────
  if (step === 3) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg rounded-3xl bg-white border border-slate-100 shadow-premium p-8 md:p-12 text-center space-y-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-24 h-24 rounded-full bg-emerald-light flex items-center justify-center mx-auto"
          >
            <CheckCircle2 className="w-12 h-12 text-emerald" />
          </motion.div>

          <div>
            <h1 className="font-serif text-2xl font-black text-slate-800">Order Confirmed! 🎉</h1>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              Thank you for your purchase! Your order has been placed and will be delivered in 3–5 business days.
            </p>
          </div>

          <div className="bg-cream rounded-2xl p-5 text-left space-y-3 max-w-xs mx-auto">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-semibold">Order ID</span>
              <span className="font-mono font-black text-slate-800">{orderId}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-semibold">Delivery To</span>
              <span className="font-bold text-slate-800 text-right">{address.city}, {address.state}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-semibold">Payment</span>
              <span className="font-bold text-slate-800 capitalize">{paymentMethod.toUpperCase()}</span>
            </div>
            <div className="flex justify-between text-xs border-t border-slate-100 pt-2">
              <span className="text-slate-400 font-semibold">ETA</span>
              <span className="font-bold text-slate-800">3–5 Business Days</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => router.push("/shop")}
              className="px-6 py-2.5 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-coral to-emerald text-white text-sm font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <>
    <main className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-4">

        {/* Page Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link href="/shop" className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-coral transition-colors mb-2">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Shop
            </Link>
            <h1 className="font-serif text-2xl font-black text-slate-800">
              {STEPS[step] === "Cart" ? "Your Shopping Cart" :
               STEPS[step] === "Address" ? "Delivery Address" :
               STEPS[step] === "Payment" ? "Payment" : "Confirmation"}
            </h1>
          </div>

          {/* Step Progress */}
          <div className="hidden sm:flex items-center gap-0">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-black transition-all",
                  i < step ? "bg-emerald text-white" :
                  i === step ? "bg-gradient-to-r from-coral to-emerald text-white shadow-md" :
                  "bg-slate-100 text-slate-400"
                )}>
                  {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </div>
                {i < STEPS.length - 1 && (
                  <div className={cn("h-0.5 w-8 mx-0.5", i < step ? "bg-emerald" : "bg-slate-100")} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Left Column */}
          <AnimatePresence mode="wait">

            {/* ── STEP 0: CART ── */}
            {step === 0 && (
              <motion.div
                key="cart"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {!mounted || items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center rounded-3xl bg-white border border-slate-100 shadow-glass">
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50">
                      <ShoppingBag className="h-10 w-10 text-slate-200" />
                    </div>
                    <h2 className="font-serif font-bold text-slate-700">Your cart is empty</h2>
                    <p className="mt-2 text-sm text-slate-400">Add some items from our shop!</p>
                    <Link
                      href="/shop"
                      className="mt-4 flex items-center gap-1.5 rounded-2xl bg-gradient-to-r from-coral to-emerald px-6 py-2.5 text-sm font-bold text-white shadow-md hover:shadow-lg hover:scale-105 transition-all"
                    >
                      Browse Shop
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="rounded-3xl bg-white border border-slate-100 shadow-glass overflow-hidden">
                      {/* Table header */}
                      <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-6 py-3 border-b border-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <span>Product</span>
                        <span className="text-center">Price</span>
                        <span className="text-center">Qty</span>
                        <span className="text-right">Total</span>
                        <span></span>
                      </div>

                      <ul className="divide-y divide-slate-50">
                        <AnimatePresence initial={false}>
                          {items.map((item) => (
                            <motion.li
                              key={item.product.id}
                              layout
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0, height: 0 }}
                              className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1fr_auto] items-center gap-4 px-6 py-4"
                            >
                              {/* Product */}
                              <div className="flex items-center gap-3">
                                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-50 border border-slate-100">
                                  <Image
                                    src={item.product.image}
                                    alt={item.product.name}
                                    fill
                                    className="object-contain p-1"
                                  />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-slate-800 leading-tight">{item.product.name}</p>
                                  <p className="text-xs text-slate-400 mt-0.5">{item.product.brand} • {item.product.category}</p>
                                  {item.product.selectedWeight && (
                                    <span className="inline-block mt-1 text-[9px] font-black bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                                      {item.product.selectedWeight}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Unit Price */}
                              <p className="hidden sm:block text-sm font-semibold text-slate-600 text-center">
                                ₹{item.product.price.toFixed(2)}
                              </p>

                              {/* Qty */}
                              <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-0.5 w-fit mx-auto">
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                                >
                                  <Minus className="h-3 w-3 text-slate-500" />
                                </button>
                                <span className="w-7 text-center text-sm font-black text-slate-800">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                                >
                                  <Plus className="h-3 w-3 text-slate-500" />
                                </button>
                              </div>

                              {/* Line total */}
                              <p className="hidden sm:block text-sm font-black text-slate-800 text-right">
                                ₹{(item.product.price * item.quantity).toFixed(2)}
                              </p>

                              {/* Remove */}
                              <button
                                onClick={() => removeItem(item.product.id)}
                                className="p-2 rounded-xl hover:bg-red-50 text-slate-300 hover:text-red-400 transition-colors cursor-pointer"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </motion.li>
                          ))}
                        </AnimatePresence>
                      </ul>
                    </div>

                    {/* Coupon */}
                    <div className="rounded-3xl bg-white border border-slate-100 shadow-glass p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Tag className="h-4 w-4 text-coral" />
                        <p className="text-sm font-black text-slate-700">Apply Coupon Code</p>
                      </div>
                      {appliedCoupon ? (
                        <div className="flex items-center justify-between rounded-2xl bg-emerald-light border border-emerald/20 px-4 py-2.5">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald" />
                            <p className="text-xs font-black text-emerald font-mono">{appliedCoupon}</p>
                            <p className="text-xs text-emerald">— ₹{discount} off applied!</p>
                          </div>
                          <button
                            onClick={() => { setAppliedCoupon(""); setDiscount(0); setCoupon(""); }}
                            className="text-[10px] font-bold text-emerald/70 hover:text-red-500 transition-colors cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Input
                            placeholder="DOFO10, PETLOVE, FIRSTPET"
                            value={coupon}
                            onChange={(e) => { setCoupon(e.target.value.toUpperCase()); setErrors((er) => ({ ...er, coupon: "" })); }}
                            className={errors.coupon ? "border-red-300" : ""}
                          />
                          <button
                            onClick={applyCoupon}
                            className="px-4 py-2 rounded-xl bg-coral-light text-coral text-xs font-black hover:bg-coral hover:text-white transition-all cursor-pointer flex-shrink-0"
                          >
                            Apply
                          </button>
                        </div>
                      )}
                      {errors.coupon && <p className="text-[10px] text-red-500 font-semibold mt-1">{errors.coupon}</p>}
                      <p className="text-[10px] text-slate-400 mt-2 font-semibold">Try: DOFO10 (10% off) • PETLOVE (₹50 off) • FIRSTPET (₹100 off)</p>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* ── STEP 1: ADDRESS ── */}
            {step === 1 && (
              <motion.div
                key="address"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="rounded-3xl bg-white border border-slate-100 shadow-glass p-6 md:p-8 space-y-5"
              >
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="h-4 w-4 text-coral" />
                  <p className="text-sm font-black text-slate-700">Delivery Details</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1"><User className="h-3 w-3" /> Full Name *</label>
                    <Input
                      placeholder="Your name"
                      value={address.name}
                      onChange={(e) => setAddress({ ...address, name: e.target.value })}
                      className={errors.name ? "border-red-300" : ""}
                    />
                    {errors.name && <p className="text-[10px] text-red-500 font-semibold">{errors.name}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1"><Phone className="h-3 w-3" /> Phone *</label>
                    <Input
                      type="tel"
                      placeholder="10-digit mobile"
                      value={address.phone}
                      maxLength={10}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value.replace(/\D/g, "") })}
                      className={errors.phone ? "border-red-300" : ""}
                    />
                    {errors.phone && <p className="text-[10px] text-red-500 font-semibold">{errors.phone}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1"><Mail className="h-3 w-3" /> Email *</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    className={errors.email ? "border-red-300" : ""}
                  />
                  {errors.email && <p className="text-[10px] text-red-500 font-semibold">{errors.email}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1"><Home className="h-3 w-3" /> Street Address *</label>
                  <Input
                    placeholder="Flat / House No., Street, Area"
                    value={address.address}
                    onChange={(e) => setAddress({ ...address, address: e.target.value })}
                    className={errors.address ? "border-red-300" : ""}
                  />
                  {errors.address && <p className="text-[10px] text-red-500 font-semibold">{errors.address}</p>}
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">City *</label>
                    <Input
                      placeholder="Mumbai"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className={errors.city ? "border-red-300" : ""}
                    />
                    {errors.city && <p className="text-[10px] text-red-500 font-semibold">{errors.city}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">State *</label>
                    <select
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all cursor-pointer"
                    >
                      {INDIAN_STATES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">PIN Code *</label>
                    <Input
                      placeholder="400001"
                      value={address.pincode}
                      maxLength={6}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, "") })}
                      className={errors.pincode ? "border-red-300" : ""}
                    />
                    {errors.pincode && <p className="text-[10px] text-red-500 font-semibold">{errors.pincode}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: PAYMENT ── */}
            {step === 2 && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {/* Payment Method Selector */}
                <div className="rounded-3xl bg-white border border-slate-100 shadow-glass p-6 space-y-4">
                  <p className="text-sm font-black text-slate-700">Select Payment Method</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { id: "upi", label: "UPI", sub: "Google Pay, PhonePe, Paytm", icon: <Smartphone className="h-5 w-5" />, badge: "Instant" },
                      { id: "card", label: "Credit / Debit Card", sub: "Visa, Mastercard, Rupay", icon: <CreditCard className="h-5 w-5" />, badge: "" },
                      { id: "netbanking", label: "Net Banking", sub: "All major banks", icon: <Building2 className="h-5 w-5" />, badge: "" },
                      { id: "cod", label: "Cash on Delivery", sub: "Pay when delivered", icon: <Banknote className="h-5 w-5" />, badge: "₹25 extra" },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id as PaymentMethod)}
                        className={cn(
                          "relative flex items-center gap-3 rounded-2xl border p-4 text-left transition-all cursor-pointer",
                          paymentMethod === m.id
                            ? "border-coral bg-coral-light shadow-sm"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        )}
                      >
                        <div className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0",
                          paymentMethod === m.id ? "bg-coral text-white" : "bg-slate-100 text-slate-500"
                        )}>
                          {m.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-black text-slate-800">{m.label}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{m.sub}</p>
                        </div>
                        {m.badge && (
                          <span className={cn(
                            "absolute top-2 right-2 text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wide",
                            m.id === "upi" ? "bg-emerald-light text-emerald" : "bg-amber-50 text-amber-700"
                          )}>
                            {m.badge}
                          </span>
                        )}
                        {paymentMethod === m.id && (
                          <div className="absolute top-2 right-2">
                            <CheckCircle2 className="h-4 w-4 text-coral" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* UPI Details */}
                {paymentMethod === "upi" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl bg-white border border-slate-100 shadow-glass p-6 space-y-4"
                  >
                    <p className="text-xs font-black text-slate-700">Choose UPI App</p>
                    <div className="grid grid-cols-4 gap-3">
                      {UPI_APPS.map((app) => (
                        <button
                          key={app.id}
                          onClick={() => setUpiApp(app.id)}
                          className={cn(
                            "flex flex-col items-center gap-2 rounded-2xl border py-4 px-2 transition-all duration-200 cursor-pointer",
                            upiApp === app.id
                              ? "border-coral bg-coral-light shadow-md scale-[1.05]"
                              : "border-slate-200 bg-white hover:border-coral/40 hover:shadow-sm"
                          )}
                        >
                          <app.Logo />
                          <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">{app.label}</span>
                        </button>
                      ))}
                    </div>
                    <div className="pt-1 border-t border-slate-50">
                      <p className="text-[10px] text-slate-400 font-semibold mb-1.5">Or enter UPI ID manually</p>
                      <Input
                        placeholder="yourname@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className={errors.upiId ? "border-red-300" : ""}
                      />
                      {errors.upiId && <p className="text-[10px] text-red-500 font-semibold mt-1">{errors.upiId}</p>}
                    </div>
                  </motion.div>
                )}

                {/* Card Details */}
                {paymentMethod === "card" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl bg-white border border-slate-100 shadow-glass p-6 space-y-4"
                  >
                    {/* Card Preview */}
                    <div className="h-36 w-full max-w-xs rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-5 relative overflow-hidden">
                      <div className="absolute inset-0 opacity-10">
                        <div className="w-48 h-48 rounded-full bg-white absolute -top-10 -right-10" />
                        <div className="w-32 h-32 rounded-full bg-white absolute -bottom-8 -left-8" />
                      </div>
                      <p className="text-white/60 text-[9px] font-bold tracking-widest uppercase">Card Number</p>
                      <p className="text-white font-mono text-base font-bold mt-1 tracking-widest">
                        {cardNo || "•••• •••• •••• ••••"}
                      </p>
                      <div className="flex items-end justify-between mt-4">
                        <div>
                          <p className="text-white/40 text-[8px] uppercase">Name</p>
                          <p className="text-white text-xs font-bold">{cardName || "YOUR NAME"}</p>
                        </div>
                        <div>
                          <p className="text-white/40 text-[8px] uppercase">Expiry</p>
                          <p className="text-white text-xs font-bold">{cardExpiry || "MM/YY"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Card Number *</label>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        value={cardNo}
                        onChange={(e) => setCardNo(formatCard(e.target.value))}
                        maxLength={19}
                        className={errors.cardNo ? "border-red-300" : ""}
                      />
                      {errors.cardNo && <p className="text-[10px] text-red-500 font-semibold">{errors.cardNo}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Name on Card *</label>
                      <Input
                        placeholder="As printed on card"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                        className={errors.cardName ? "border-red-300" : ""}
                      />
                    </div>
                    <div className="grid gap-4 grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Expiry (MM/YY) *</label>
                        <Input
                          placeholder="09/27"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                          maxLength={5}
                          className={errors.cardExpiry ? "border-red-300" : ""}
                        />
                        {errors.cardExpiry && <p className="text-[10px] text-red-500 font-semibold">{errors.cardExpiry}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">CVV *</label>
                        <Input
                          type="password"
                          placeholder="•••"
                          value={cardCVV}
                          maxLength={4}
                          onChange={(e) => setCardCVV(e.target.value.replace(/\D/g, ""))}
                          className={errors.cardCVV ? "border-red-300" : ""}
                        />
                        {errors.cardCVV && <p className="text-[10px] text-red-500 font-semibold">{errors.cardCVV}</p>}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Net Banking */}
                {paymentMethod === "netbanking" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl bg-white border border-slate-100 shadow-glass p-6 space-y-3"
                  >
                    <p className="text-xs font-black text-slate-700">Select Bank</p>
                    <div className="space-y-2">
                      {BANKS.map((bank) => (
                        <button
                          key={bank}
                          onClick={() => setSelectedBank(bank)}
                          className={cn(
                            "w-full flex items-center justify-between rounded-xl border px-4 py-3 text-xs font-semibold transition-all cursor-pointer text-left",
                            selectedBank === bank
                              ? "border-coral bg-coral-light text-coral"
                              : "border-slate-200 text-slate-700 hover:border-slate-300"
                          )}
                        >
                          <span>{bank}</span>
                          {selectedBank === bank && <CheckCircle2 className="h-4 w-4" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* COD notice */}
                {paymentMethod === "cod" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl bg-amber-50 border border-amber-200 p-5 flex items-start gap-3"
                  >
                    <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-black text-amber-800">Cash on Delivery</p>
                      <p className="text-[10px] text-amber-700 mt-1 leading-relaxed">
                        Pay ₹{(total + 25).toFixed(2)} (includes ₹25 COD handling fee) in cash when your order is delivered. Keep exact change ready.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Security badges */}
                <div className="flex items-center justify-center gap-6 py-2">
                  {[
                    { icon: <Shield className="h-3.5 w-3.5" />, label: "256-bit SSL" },
                    { icon: <Zap className="h-3.5 w-3.5" />, label: "Instant Refund" },
                    { icon: <Star className="h-3.5 w-3.5" />, label: "100% Secure" },
                  ].map(({ icon, label }) => (
                    <div key={label} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                      {icon}
                      {label}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── RIGHT: ORDER SUMMARY ── */}
          <div className="space-y-4 lg:sticky lg:top-24 h-fit">
            <div className="rounded-3xl bg-white border border-slate-100 shadow-glass p-6 space-y-4">
              <p className="text-sm font-black text-slate-800">Order Summary</p>

              {/* Item list */}
              {mounted && items.length > 0 && (
                <ul className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <li key={item.product.id} className="flex items-center gap-2.5">
                      <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-xl bg-slate-50 border border-slate-100">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-contain p-0.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-slate-700 truncate">{item.product.name}</p>
                        <p className="text-[9px] text-slate-400">×{item.quantity}</p>
                      </div>
                      <p className="text-xs font-black text-slate-800">₹{(item.product.price * item.quantity).toFixed(0)}</p>
                    </li>
                  ))}
                </ul>
              )}

              {/* Price breakdown */}
              <div className="border-t border-slate-50 pt-3 space-y-2 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald">
                    <span>Coupon ({appliedCoupon})</span>
                    <span className="font-semibold">−₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500">
                  <span>Shipping</span>
                  <span className={cn("font-semibold", shipping === 0 ? "text-emerald" : "")}>
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
                {paymentMethod === "cod" && step === 2 && (
                  <div className="flex justify-between text-amber-600">
                    <span>COD Fee</span>
                    <span className="font-semibold">₹25</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-slate-100 pt-2 font-black text-slate-800 text-sm">
                  <span>Total</span>
                  <span>₹{(total + (paymentMethod === "cod" && step === 2 ? 25 : 0)).toFixed(2)}</span>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="rounded-2xl bg-slate-50 p-3 flex items-center gap-2">
                <Truck className="h-4 w-4 text-coral flex-shrink-0" />
                <p className="text-[10px] font-semibold text-slate-600">
                  {shipping === 0 ? "FREE delivery" : "₹49 delivery"} · Arrives in 3–5 days
                </p>
              </div>
            </div>

            {/* Nav Buttons */}
            <div className="flex flex-col gap-2">
              {step === 0 && items.length > 0 && (
                <button
                  onClick={() => {
                    if (!isAuthenticated) {
                      setLoginModalOpen(true);
                    } else {
                      setStep(1);
                    }
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-coral to-emerald py-3.5 text-sm font-black text-white shadow-md hover:shadow-lg hover:scale-[1.01] transition-all cursor-pointer"
                >
                  Proceed to Address
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
              {step === 1 && (
                <button
                  onClick={handleNext}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-coral to-emerald py-3.5 text-sm font-black text-white shadow-md hover:shadow-lg hover:scale-[1.01] transition-all cursor-pointer"
                >
                  Continue to Payment
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
              {step === 2 && (
                <button
                  onClick={handlePlaceOrder}
                  disabled={processing}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-coral to-emerald py-3.5 text-sm font-black text-white shadow-md hover:shadow-lg hover:scale-[1.01] transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
                >
                  {processing ? (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <PackageCheck className="h-4 w-4" />
                      Place Order — ₹{(total + (paymentMethod === "cod" ? 25 : 0)).toFixed(2)}
                    </>
                  )}
                </button>
              )}
              {step > 0 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="flex w-full items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  Back
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>

    {/* Login Gate Modal */}
    <LoginModal
      open={loginModalOpen}
      onClose={() => setLoginModalOpen(false)}
      onSuccess={() => setStep(1)}
      message="Please sign in to proceed with your order."
    />
  </>
  );
}
