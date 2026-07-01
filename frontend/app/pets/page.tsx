"use client";

import { useState, useEffect } from "react";
import { Search, Grid, Map, Sparkles } from "lucide-react";
import { getPets, type PetFilters as PetFiltersType } from "@/lib/api/pets";
import type { Pet } from "@/lib/pets-data";
import { PetFilters } from "@/components/pets/PetFilters";
import { PetGrid } from "@/components/pets/PetGrid";
import { MapViewPlaceholder } from "@/components/pets/MapViewPlaceholder";
import { SwipeDiscovery } from "@/components/pets/SwipeDiscovery";
import { Input } from "@/components/ui/Input";

export default function PetsPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "map" | "swipe">("grid");
  const [filters, setFilters] = useState<PetFiltersType>({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchPets() {
      setLoading(true);
      const data = await getPets({ ...filters, search: searchQuery });
      setPets(data);
      setLoading(false);
    }
    fetchPets();
  }, [filters, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header & Page Title */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
              Find Your New Best Friend
            </h1>
            <p className="text-slate-600 mt-2">
              Browse healthy, verified pets ready for adoption in your neighborhood.
            </p>
          </div>

          {/* View Toggles & Search */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search name, breed, city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-white"
              />
            </div>

            {/* View Mode Selector */}
            <div className="bg-slate-100 p-1 rounded-full flex w-full sm:w-auto">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  viewMode === "grid"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Grid className="w-3.5 h-3.5" /> Grid
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  viewMode === "map"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Map className="w-3.5 h-3.5" /> Map
              </button>
              <button
                onClick={() => setViewMode("swipe")}
                className={`flex-1 sm:flex-initial md:hidden flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  viewMode === "swipe"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" /> Swipe
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Filters Sidebar (desktop) */}
          <PetFilters
            filters={filters}
            onFiltersChange={setFilters}
            className="lg:col-span-3"
          />

          {/* Listings Content */}
          <div className="lg:col-span-9">
            {viewMode === "grid" && (
              <PetGrid pets={pets} isLoading={loading} />
            )}

            {viewMode === "map" && !loading && (
              <MapViewPlaceholder pets={pets} />
            )}

            {viewMode === "swipe" && !loading && (
              <div className="flex justify-center">
                <SwipeDiscovery pets={pets} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
