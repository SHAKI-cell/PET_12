"use client";

import { MapPin, Map } from "lucide-react";
import type { Pet } from "@/lib/pets-data";
import { cn } from "@/lib/utils";

interface MapViewPlaceholderProps {
  pets: Pet[];
  className?: string;
}

export function MapViewPlaceholder({ pets, className }: MapViewPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative bg-gradient-to-br from-sage to-emerald-light rounded-3xl overflow-hidden border border-emerald/10 min-h-[500px] flex items-center justify-center",
        className
      )}
    >
      {/* Decorative grid lines */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute left-0 right-0 border-t border-emerald"
            style={{ top: `${(i + 1) * 12.5}%` }}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute top-0 bottom-0 border-l border-emerald"
            style={{ left: `${(i + 1) * 12.5}%` }}
          />
        ))}
      </div>

      {/* Decorative pins */}
      {pets.slice(0, 5).map((pet, i) => {
        const positions = [
          { top: "25%", left: "30%" },
          { top: "45%", left: "55%" },
          { top: "35%", left: "70%" },
          { top: "60%", left: "40%" },
          { top: "50%", left: "20%" },
        ];
        return (
          <div
            key={pet.id}
            className="absolute animate-bounce"
            style={{
              ...positions[i],
              animationDelay: `${i * 0.3}s`,
              animationDuration: "2s",
            }}
          >
            <div className="bg-coral text-white p-1.5 rounded-full shadow-lg">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white px-2 py-0.5 rounded-lg shadow-sm text-[10px] font-semibold whitespace-nowrap">
              {pet.name}
            </div>
          </div>
        );
      })}

      {/* Center Message */}
      <div className="relative z-10 text-center">
        <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Map className="w-8 h-8 text-emerald" />
        </div>
        <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
          Map View Coming Soon
        </h3>
        <p className="text-sm text-slate-600 max-w-xs mx-auto">
          We&apos;re working on an interactive map to help you find pets near your location.
        </p>
        <p className="text-xs text-slate-400 mt-3">
          {pets.length} pets in {new Set(pets.map((p) => p.location.city)).size} cities
        </p>
      </div>
    </div>
  );
}
