"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Slider } from "@/components/ui/Slider";
import { Switch } from "@/components/ui/Switch";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { PetFilters as PetFiltersType } from "@/lib/api/pets";
import { getAllBreeds, getAllCities } from "@/lib/api/pets";

interface PetFiltersProps {
  filters: PetFiltersType;
  onFiltersChange: (filters: PetFiltersType) => void;
  className?: string;
}

const SPECIES_OPTIONS = [
  { value: "", label: "All" },
  { value: "dog", label: "🐕 Dogs" },
  { value: "cat", label: "🐱 Cats" },
];

const SIZE_OPTIONS = [
  { value: "", label: "Any" },
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
];

const GENDER_OPTIONS = [
  { value: "", label: "Any" },
  { value: "male", label: "♂ Male" },
  { value: "female", label: "♀ Female" },
];

export function PetFilters({ filters, onFiltersChange, className }: PetFiltersProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const breeds = getAllBreeds();
  const cities = getAllCities();

  const updateFilter = (key: keyof PetFiltersType, value: unknown) => {
    onFiltersChange({ ...filters, [key]: value || undefined });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== undefined && v !== "" && v !== false
  ).length;

  const filterContent = (
    <div className="space-y-6">
      {/* Species */}
      <div>
        <label className="text-sm font-semibold text-slate-700 mb-2 block">Pet Type</label>
        <div className="flex flex-wrap gap-2">
          {SPECIES_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateFilter("species", opt.value as PetFiltersType["species"])}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                (filters.species || "") === opt.value
                  ? "bg-coral text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Breed */}
      <div>
        <label className="text-sm font-semibold text-slate-700 mb-2 block">Breed</label>
        <select
          value={filters.breed || ""}
          onChange={(e) => updateFilter("breed", e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all"
        >
          <option value="">All breeds</option>
          {breeds.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Age Range */}
      <div>
        <label className="text-sm font-semibold text-slate-700 mb-2 block">
          Age (up to {filters.maxAge || 60} months)
        </label>
        <Slider
          defaultValue={[filters.maxAge || 60]}
          max={60}
          min={1}
          step={1}
          onValueChange={(val) => updateFilter("maxAge", val[0])}
        />
        <div className="flex justify-between mt-1 text-xs text-slate-400">
          <span>1 month</span>
          <span>5 years</span>
        </div>
      </div>

      {/* Size */}
      <div>
        <label className="text-sm font-semibold text-slate-700 mb-2 block">Size</label>
        <div className="flex flex-wrap gap-2">
          {SIZE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateFilter("size", opt.value as PetFiltersType["size"])}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                (filters.size || "") === opt.value
                  ? "bg-coral text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gender */}
      <div>
        <label className="text-sm font-semibold text-slate-700 mb-2 block">Gender</label>
        <div className="flex flex-wrap gap-2">
          {GENDER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateFilter("gender", opt.value as PetFiltersType["gender"])}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                (filters.gender || "") === opt.value
                  ? "bg-coral text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* City */}
      <div>
        <label className="text-sm font-semibold text-slate-700 mb-2 block">Location</label>
        <select
          value={filters.city || ""}
          onChange={(e) => updateFilter("city", e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all"
        >
          <option value="">All cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Free Only */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-700">Free Adoption Only</label>
        <Switch
          checked={filters.freeOnly || false}
          onCheckedChange={(checked) => updateFilter("freeOnly", checked)}
        />
      </div>

      {/* Clear */}
      {activeFilterCount > 0 && (
        <Button variant="ghost" onClick={clearFilters} className="w-full">
          Clear all filters ({activeFilterCount})
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-gradient-to-r from-coral to-emerald text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform"
      >
        <SlidersHorizontal className="w-5 h-5" />
        {activeFilterCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-coral text-[10px] font-bold rounded-full flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Mobile Filter Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto animate-slide-in-bottom">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl font-bold">Filters</h3>
              <button onClick={() => setIsMobileOpen(false)} className="p-1.5 bg-slate-100 rounded-full">
                <X className="w-4 h-4" />
              </button>
            </div>
            {filterContent}
            <div className="mt-6">
              <Button onClick={() => setIsMobileOpen(false)} className="w-full">
                Show Results
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className={cn("hidden lg:block", className)}>
        <div className="bg-white rounded-3xl p-6 card-shadow sticky top-28">
          <h3 className="font-serif text-lg font-bold text-slate-900 mb-6">Filters</h3>
          {filterContent}
        </div>
      </div>
    </>
  );
}
