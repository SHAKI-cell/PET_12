"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList, LayoutGrid } from "lucide-react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const ListPetWizard = dynamic(
  () => import("@/components/pets/ListPetWizard"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-coral border-t-transparent animate-spin" />
          <p className="text-xs font-semibold text-slate-400">Loading form...</p>
        </div>
      </div>
    ),
  }
);

const MyListings = dynamic(
  () => import("@/components/pets/MyListings"),
  { ssr: false }
);

const TABS = [
  { id: "list", label: "List a New Pet", icon: <ClipboardList className="w-4 h-4" /> },
  { id: "my", label: "My Listings", icon: <LayoutGrid className="w-4 h-4" /> },
];

export default function ListPetPage() {
  const [activeTab, setActiveTab] = useState<"list" | "my">("list");

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-coral-light px-4 py-1.5 mb-4">
            <span className="text-xs font-black text-coral uppercase tracking-widest">DoFo Adoption</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-black text-slate-800 leading-tight">
            Find Your Pet a{" "}
            <span className="text-gradient">Loving Home</span>
          </h1>
          <p className="mt-3 text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            List your pet for free. Our team reviews every listing within 24–48 hours to ensure a safe, verified experience.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex gap-2 rounded-2xl bg-white border border-slate-100 p-1.5 shadow-glass"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "list" | "my")}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all duration-300 cursor-pointer",
                activeTab === tab.id
                  ? "bg-gradient-to-r from-coral to-emerald text-white shadow-md"
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "list" ? <ListPetWizard /> : <MyListings />}
        </motion.div>
      </div>
    </main>
  );
}
