"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, CheckCircle2 } from "lucide-react";
import { useAuthStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  message?: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function LoginModal({
  open,
  onClose,
  onSuccess,
  message,
}: LoginModalProps) {
  const { login } = useAuthStore();

  // "home" | "details" | "success"
  const [view, setView] = useState<"home" | "details" | "success">("home");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setView("home");
    setName("");
    setEmail("");
    setErrors({});
    onClose();
  };

  const handleGoogleClick = () => {
    setView("details");
  };

  const handleCreate = () => {
    const errs: { name?: string; email?: string } = {};
    if (!name.trim() || name.trim().length < 2) errs.name = "Enter your full name";
    if (!email.trim() || !email.includes("@")) errs.email = "Enter a valid email address";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      login({
        id: `google-${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        avatar: "",
        role: "adopter",
      });
      setLoading(false);
      setView("success");
      setTimeout(() => {
        handleClose();
        onSuccess?.();
      }, 1200);
    }, 900);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
          />

          {/* Card */}
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden pointer-events-auto">

              {/* ── CLOSE BUTTON ── always visible */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4 text-slate-600" />
              </button>

              {/* ── VIEW: HOME ── */}
              {view === "home" && (
                <div className="px-8 pt-10 pb-8">
                  {/* Google Logo */}
                  <div className="flex justify-center mb-5">
                    <svg viewBox="0 0 48 48" className="h-10 w-10">
                      <path fill="#4285F4" d="M24 23.3v4.9h6.8c-.3 1.7-1.8 5-6.8 5-4.1 0-7.4-3.4-7.4-7.5s3.3-7.5 7.4-7.5c2.3 0 3.9.9 4.8 1.8l3.3-3.2C30.2 15 27.3 14 24 14c-6.6 0-12 5.4-12 12s5.4 12 12 12c6.9 0 11.5-4.9 11.5-11.7 0-.8-.1-1.4-.2-2H24z"/>
                      <path fill="#34A853" d="M10 28.9l3.9-2.9c-.9-2.6-.9-5.4 0-8L10 15.1C7.4 19.5 7.4 24.5 10 28.9z"/>
                      <path fill="#FBBC05" d="M24 10c2.8 0 5.4 1 7.5 2.7l3.6-3.6C32.6 7.3 28.5 6 24 6 17.1 6 11.1 9.9 8.2 15.7l4.8 3.6C14.4 14.5 18.8 10 24 10z"/>
                      <path fill="#EA4335" d="M24 42c4.5 0 8.6-1.5 11.6-4.2l-4.2-3.2c-1.8 1.4-4.1 2.2-7.4 2.2-5.1 0-9.5-3.4-11-8.1l-4.8 3.6C11.2 38.3 17.1 42 24 42z"/>
                    </svg>
                  </div>

                  <h2 className="text-center text-xl font-medium text-slate-800 mb-1">Sign in</h2>
                  <p className="text-center text-sm text-slate-500 mb-1">
                    to continue to <span className="font-semibold text-slate-700">DoFo</span>
                  </p>

                  {message && (
                    <div className="mt-3 mb-4 rounded-2xl bg-coral-light border border-coral/20 px-4 py-2.5 text-xs font-semibold text-coral text-center">
                      {message}
                    </div>
                  )}

                  <div className="mt-6 space-y-3">
                    {/* Continue with Google */}
                    <button
                      onClick={handleGoogleClick}
                      className="w-full flex items-center gap-3 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-400 hover:shadow-md transition-all cursor-pointer group"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="flex-1 text-center">Continue with Google</span>
                      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <p className="text-center text-[10px] text-slate-400 leading-relaxed pt-1">
                      By continuing, you agree to DoFo's{" "}
                      <span className="text-coral cursor-pointer underline">Terms</span>{" "}
                      and{" "}
                      <span className="text-coral cursor-pointer underline">Privacy Policy</span>
                    </p>
                  </div>
                </div>
              )}

              {/* ── VIEW: DETAILS (name + email) ── */}
              {view === "details" && (
                <div>
                  <div className="px-8 pt-10 pb-5">
                    {/* Google small icon + heading */}
                    <div className="flex items-center gap-3 mb-6">
                      <svg viewBox="0 0 24 24" className="h-6 w-6 flex-shrink-0">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">Continue with Google</p>
                        <p className="text-xs text-slate-400">Enter your Google account details</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-600">Full Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Shakib Khan"
                          value={name}
                          autoFocus
                          onChange={(e) => {
                            setName(e.target.value);
                            setErrors((prev) => ({ ...prev, name: undefined }));
                          }}
                          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                          className={cn(
                            "w-full rounded-xl border px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all",
                            errors.name
                              ? "border-red-300 focus:ring-red-100"
                              : "border-slate-200 focus:ring-[#4285F4]/20 focus:border-[#4285F4]"
                          )}
                        />
                        {errors.name && (
                          <p className="text-[10px] text-red-500 font-semibold">{errors.name}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-600">Gmail address</label>
                        <input
                          type="email"
                          placeholder="you@gmail.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors((prev) => ({ ...prev, email: undefined }));
                          }}
                          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                          className={cn(
                            "w-full rounded-xl border px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all",
                            errors.email
                              ? "border-red-300 focus:ring-red-100"
                              : "border-slate-200 focus:ring-[#4285F4]/20 focus:border-[#4285F4]"
                          )}
                        />
                        {errors.email && (
                          <p className="text-[10px] text-red-500 font-semibold">{errors.email}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between bg-slate-50 px-8 py-4 border-t border-slate-100">
                    <button
                      onClick={() => setView("home")}
                      className="text-sm font-medium text-[#4285F4] hover:underline cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleCreate}
                      disabled={loading}
                      className="flex items-center gap-2 rounded-full bg-[#1a73e8] text-white text-sm font-semibold px-6 py-2.5 hover:bg-[#1557b0] transition-colors cursor-pointer shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign in"
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* ── VIEW: SUCCESS ── */}
              {view === "success" && (
                <div className="px-8 py-12 text-center space-y-5">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4285F4] to-[#34A853] flex items-center justify-center text-white text-2xl font-black mx-auto shadow-lg"
                  >
                    {getInitials(name)}
                  </motion.div>
                  <div>
                    <p className="text-lg font-semibold text-slate-800">
                      Welcome, {name.split(" ")[0]}! 👋
                    </p>
                    <p className="text-xs text-slate-400 mt-1">{email}</p>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-[#34A853] font-semibold">
                    <CheckCircle2 className="h-4 w-4" />
                    Signed in successfully
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
