"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  CheckCircle2,
  XCircle,
  Trash2,
  Copy,
  Eye,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ListingStatus {
  id: string;
  name: string;
  species: string;
  breed: string;
  photos: string[];
  location: { city: string; state: string };
  referenceId: string;
  submittedAt: string;
  status: "Pending" | "Approved" | "Rejected";
  adoptionFee: number;
  gender: string;
  age: number;
  ageUnit: string;
}

export default function MyListings() {
  const [listings, setListings] = useState<ListingStatus[]>([]);
  const [loading, setLoading] = useState(true);

  const loadListings = () => {
    if (typeof window === "undefined") return;
    try {
      const stored = JSON.parse(localStorage.getItem("dofo_my_listings") || "[]");
      setListings(stored);
    } catch {
      setListings([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadListings();
  }, []);

  const handleDelete = (id: string) => {
    if (!confirm("Delete this listing? This action cannot be undone.")) return;
    const updated = listings.filter((l) => l.id !== id);
    localStorage.setItem("dofo_my_listings", JSON.stringify(updated));
    // Also remove from pending
    const pending = JSON.parse(localStorage.getItem("dofo_pending_listings") || "[]");
    localStorage.setItem("dofo_pending_listings", JSON.stringify(pending.filter((l: ListingStatus) => l.id !== id)));
    setListings(updated);
  };

  const handleDuplicate = (listing: ListingStatus) => {
    const newListing: ListingStatus = {
      ...listing,
      id: `custom-${Date.now()}`,
      referenceId: `DOFO-PET-${Math.floor(10000 + Math.random() * 90000)}`,
      status: "Pending",
      submittedAt: new Date().toISOString(),
    };
    const updated = [newListing, ...listings];
    localStorage.setItem("dofo_my_listings", JSON.stringify(updated));
    const pending = JSON.parse(localStorage.getItem("dofo_pending_listings") || "[]");
    localStorage.setItem("dofo_pending_listings", JSON.stringify([newListing, ...pending]));
    setListings(updated);
  };

  const getStatusConfig = (status: ListingStatus["status"]) => {
    switch (status) {
      case "Approved":
        return {
          icon: <CheckCircle2 className="h-3.5 w-3.5" />,
          className: "bg-emerald-light text-emerald border border-emerald/20",
        };
      case "Rejected":
        return {
          icon: <XCircle className="h-3.5 w-3.5" />,
          className: "bg-red-50 text-red-600 border border-red-200",
        };
      default:
        return {
          icon: <Clock className="h-3.5 w-3.5" />,
          className: "bg-amber-50 text-amber-700 border border-amber-200",
        };
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-coral border-t-transparent" />
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-coral-light">
          <AlertCircle className="h-10 w-10 text-coral" />
        </div>
        <h3 className="font-serif text-lg font-bold text-slate-800">No listings yet</h3>
        <p className="mt-2 text-sm text-slate-500">
          Submit your first pet listing to see it here.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {listings.map((listing, index) => {
        const statusConfig = getStatusConfig(listing.status);
        return (
          <motion.div
            key={listing.id}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex gap-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-premium hover:shadow-premium-lg transition-shadow duration-300"
          >
            {/* Photo */}
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-100">
              {listing.photos && listing.photos[0] ? (
                <img
                  src={listing.photos[0]}
                  alt={listing.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-3xl">🐾</div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col justify-between min-w-0">
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <h3 className="font-serif font-bold text-slate-800">{listing.name}</h3>
                  <span className={cn("flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold", statusConfig.className)}>
                    {statusConfig.icon}
                    {listing.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 capitalize">
                  {listing.species} • {listing.breed} • {listing.gender} • {listing.age} {listing.ageUnit}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">
                  📍 {(listing.location as { area?: string; city: string; state: string }).area || listing.location.city}, {listing.location.state}
                </p>
                <p className="mt-1 text-xs text-slate-300 font-mono">
                  Ref: {listing.referenceId} • {new Date(listing.submittedAt).toLocaleDateString("en-IN")}
                </p>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleDuplicate(listing)}
                  className="flex items-center gap-1.5 rounded-xl bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <Copy className="h-3.5 w-3.5" />
                  Duplicate
                </button>
                <button
                  onClick={() => handleDelete(listing.id)}
                  className="ml-auto flex items-center gap-1.5 rounded-xl bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </button>
              </div>
            </div>

            {/* Fee */}
            <div className="hidden sm:flex flex-col items-end justify-between flex-shrink-0">
              <div className="text-right">
                <p className="text-lg font-black text-slate-800">
                  {listing.adoptionFee === 0 ? "Free" : `₹${listing.adoptionFee.toLocaleString()}`}
                </p>
                <p className="text-xs text-slate-400">Adoption Fee</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
