"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Clock,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
  Mail,
  User,
  ExternalLink,
  ShieldCheck,
  Search,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ListingItem {
  id: string;
  referenceId: string;
  name: string;
  species: "dog" | "cat" | "other";
  breed: string;
  gender: "male" | "female";
  age: number;
  ageUnit: "months" | "years";
  weight: number;
  color: string;
  vaccinated: boolean;
  spayed: boolean;
  microchipped: boolean;
  adoptionFee: number;
  description: string;
  healthNotes: string;
  photos: string[];
  location: { state: string; city: string; area: string; lat: number; lng: number };
  owner: { name: string; phone: string; email: string; whatsapp: string; contact: string };
  status: "Pending" | "Approved" | "Rejected";
  submittedAt: string;
}

export default function AdminListingsPage() {
  const [pending, setPending] = useState<ListingItem[]>([]);
  const [approvedList, setApprovedList] = useState<ListingItem[]>([]);
  const [allMyListings, setAllMyListings] = useState<ListingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const p = JSON.parse(localStorage.getItem("dofo_pending_listings") || "[]");
      const a = JSON.parse(localStorage.getItem("dofo_approved_listings") || "[]");
      const m = JSON.parse(localStorage.getItem("dofo_my_listings") || "[]");
      setPending(p);
      setApprovedList(a);
      setAllMyListings(m);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, []);

  const handleApprove = (item: ListingItem) => {
    // 1. Move to approved list
    const updatedApproved = [item, ...approvedList];
    localStorage.setItem("dofo_approved_listings", JSON.stringify(updatedApproved));
    setApprovedList(updatedApproved);

    // 2. Remove from pending list
    const updatedPending = pending.filter((p) => p.id !== item.id);
    localStorage.setItem("dofo_pending_listings", JSON.stringify(updatedPending));
    setPending(updatedPending);

    // 3. Update status in all listings (my listings)
    const updatedAll = allMyListings.map((l) => {
      if (l.id === item.id) {
        return { ...l, status: "Approved" as const };
      }
      return l;
    });
    localStorage.setItem("dofo_my_listings", JSON.stringify(updatedAll));
    setAllMyListings(updatedAll);

    // Close expansion
    setExpandedId(null);
  };

  const handleReject = (item: ListingItem) => {
    // 1. Remove from pending list
    const updatedPending = pending.filter((p) => p.id !== item.id);
    localStorage.setItem("dofo_pending_listings", JSON.stringify(updatedPending));
    setPending(updatedPending);

    // 2. Update status in all listings (my listings) to Rejected
    const updatedAll = allMyListings.map((l) => {
      if (l.id === item.id) {
        return { ...l, status: "Rejected" as const };
      }
      return l;
    });
    localStorage.setItem("dofo_my_listings", JSON.stringify(updatedAll));
    setAllMyListings(updatedAll);

    // Close expansion
    setExpandedId(null);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredPending = pending.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.referenceId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-coral border-t-transparent" />
          <p className="text-sm font-semibold text-slate-400">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="mx-auto max-w-5xl px-4">
        
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-coral-light px-3 py-1 mb-2">
              <ShieldAlert className="w-3.5 h-3.5 text-coral" />
              <span className="text-[10px] font-black text-coral uppercase tracking-widest">Admin Control</span>
            </div>
            <h1 className="font-serif text-3xl font-black text-slate-800 leading-tight">
              Adoption Listing <span className="text-gradient">Verification</span>
            </h1>
            <p className="mt-1.5 text-xs text-slate-500 font-semibold">
              Review and verify user-submitted pets before they appear publicly.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search reference, name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Pending Review", count: pending.length, color: "text-amber-600 bg-amber-50" },
            { label: "Total Approved", count: approvedList.length, color: "text-emerald bg-emerald-light" },
            { label: "All Submissions", count: allMyListings.length, color: "text-slate-700 bg-slate-100" },
          ].map((stat, idx) => (
            <div key={idx} className="rounded-2xl bg-white border border-slate-100 p-4 shadow-glass">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{stat.label}</span>
              <p className={cn("text-2xl font-black mt-1.5 px-3 py-1 rounded-xl w-fit font-mono", stat.color)}>
                {stat.count}
              </p>
            </div>
          ))}
        </div>

        {/* Listings Section */}
        <div className="space-y-4">
          {filteredPending.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center rounded-3xl bg-white border border-slate-100 shadow-glass">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-light">
                <CheckCircle2 className="h-8 w-8 text-emerald" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-800">Queue is clear!</h3>
              <p className="mt-1 text-sm text-slate-400 max-w-xs leading-relaxed">
                There are no pending listings requiring review right now.
              </p>
              <Link href="/pets" className="mt-4 text-xs font-bold text-coral hover:underline">
                Browse Live Pets Catalog →
              </Link>
            </div>
          ) : (
            filteredPending.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <div
                  key={item.id}
                  className="rounded-3xl bg-white border border-slate-100 shadow-premium overflow-hidden transition-all duration-300"
                >
                  {/* Summary Card Header */}
                  <div
                    onClick={() => toggleExpand(item.id)}
                    className="flex items-center justify-between gap-4 p-5 cursor-pointer hover:bg-slate-50/50 transition-colors select-none"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Photo Thumbnail */}
                      <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                        {item.photos && item.photos[0] ? (
                          <img
                            src={item.photos[0]}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xl">🐾</div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-serif text-base font-black text-slate-800">{item.name}</h3>
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-black text-amber-700 uppercase tracking-wider border border-amber-200">
                            <Clock className="w-2.5 h-2.5" />
                            Pending Review
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 capitalize mt-0.5">
                          {item.species} • {item.breed} • {item.gender} • {item.age} {item.ageUnit}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1 font-mono">
                          Ref: {item.referenceId} • Submitted: {new Date(item.submittedAt).toLocaleDateString("en-IN")}
                        </p>
                      </div>
                    </div>

                    <button className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Expanded Content Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden border-t border-slate-50"
                      >
                        <div className="p-6 md:p-8 bg-slate-50/50 space-y-6">
                          
                          {/* Grid Details */}
                          <div className="grid gap-6 md:grid-cols-3">
                            
                            {/* Pet Characteristics */}
                            <div className="space-y-4">
                              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">Characteristics</h4>
                              <div className="bg-white rounded-2xl p-4 border border-slate-100 space-y-2 text-xs">
                                <div className="flex justify-between"><span className="text-slate-400">Weight</span><span className="font-bold text-slate-700">{item.weight} kg</span></div>
                                <div className="flex justify-between"><span className="text-slate-400">Color</span><span className="font-bold text-slate-700">{item.color}</span></div>
                                <div className="flex justify-between"><span className="text-slate-400">Adoption Fee</span><span className="font-bold text-slate-800">{item.adoptionFee === 0 ? "Free" : `₹${item.adoptionFee.toLocaleString()}`}</span></div>
                                <div className="flex justify-between"><span className="text-slate-400">Vaccinated</span><span className="font-bold text-slate-700">{item.vaccinated ? "Yes" : "No"}</span></div>
                                <div className="flex justify-between"><span className="text-slate-400">Spayed</span><span className="font-bold text-slate-700">{item.spayed ? "Yes" : "No"}</span></div>
                                <div className="flex justify-between"><span className="text-slate-400">Microchip</span><span className="font-bold text-slate-700">{item.microchipped ? "Yes" : "No"}</span></div>
                              </div>
                            </div>

                            {/* Location Info */}
                            <div className="space-y-4">
                              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">Location details</h4>
                              <div className="bg-white rounded-2xl p-4 border border-slate-100 space-y-2 text-xs">
                                <div className="flex justify-between"><span className="text-slate-400">Area</span><span className="font-bold text-slate-700">{item.location.area}</span></div>
                                <div className="flex justify-between"><span className="text-slate-400">City</span><span className="font-bold text-slate-700">{item.location.city}</span></div>
                                <div className="flex justify-between"><span className="text-slate-400">State</span><span className="font-bold text-slate-700">{item.location.state}</span></div>
                                <div className="flex justify-between"><span className="text-slate-400">Coordinates</span><span className="font-mono text-[10px] text-slate-500">{item.location.lat.toFixed(4)}, {item.location.lng.toFixed(4)}</span></div>
                              </div>
                            </div>

                            {/* Owner Contact */}
                            <div className="space-y-4">
                              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">Owner / Submitter</h4>
                              <div className="bg-white rounded-2xl p-4 border border-slate-100 space-y-3 text-xs">
                                <div className="flex items-center gap-2">
                                  <User className="w-3.5 h-3.5 text-coral" />
                                  <span className="font-bold text-slate-700">{item.owner.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="w-3.5 h-3.5 text-coral" />
                                  <span className="font-bold text-slate-700">{item.owner.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Mail className="w-3.5 h-3.5 text-coral" />
                                  <span className="font-bold text-slate-700">{item.owner.email}</span>
                                </div>
                                <div className="text-[10px] text-slate-400">
                                  Preferred Contact: <span className="font-bold uppercase text-coral">{item.owner.contact}</span>
                                </div>
                              </div>
                            </div>

                          </div>

                          {/* Photos Grid */}
                          <div className="space-y-3">
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">Photos ({item.photos.length})</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {item.photos.map((photo, idx) => (
                                <a
                                  key={idx}
                                  href={photo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-white group hover:opacity-90 transition-opacity"
                                >
                                  <img src={photo} alt="" className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <ExternalLink className="w-4 h-4 text-white" />
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>

                          {/* Description Bio */}
                          <div className="space-y-3">
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">Bio & Description</h4>
                            <div className="bg-white rounded-2xl p-4 border border-slate-100 text-xs text-slate-600 leading-relaxed">
                              {item.description}
                            </div>
                          </div>

                          {/* Health Notes */}
                          <div className="space-y-3">
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">Health Notes & History</h4>
                            <div className="bg-white rounded-2xl p-4 border border-slate-100 text-xs text-slate-600 leading-relaxed">
                              {item.healthNotes}
                            </div>
                          </div>

                          {/* Action Bar */}
                          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                            <button
                              onClick={() => handleReject(item)}
                              className="flex items-center gap-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-xs font-black text-red-600 px-5 py-2.5 transition-colors cursor-pointer"
                            >
                              <XCircle className="w-4 h-4" />
                              Reject Submission
                            </button>
                            <button
                              onClick={() => handleApprove(item)}
                              className="flex items-center gap-1.5 rounded-xl bg-emerald-light hover:bg-emerald/20 text-xs font-black text-emerald px-6 py-2.5 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              Approve Listing
                            </button>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

      </div>
    </main>
  );
}
