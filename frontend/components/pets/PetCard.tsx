"use client";

import { Heart, MapPin } from "lucide-react";
import Link from "next/link";
import type { Pet } from "@/lib/pets-data";
import { useFavoritesStore } from "@/lib/store";
import { VerifiedBadge } from "@/components/trust/VerifiedBadge";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";

import { useEffect, useState } from "react";

interface PetCardProps {
  pet: Pet;
}

export function PetCard({ pet }: PetCardProps) {
  const { toggle, isFavorite } = useFavoritesStore();
  const [mounted, setMounted] = useState(false);
  const [imgSrc, setImgSrc] = useState(pet.images[0] || "/images/pets/placeholder.jpg");
  const fav = isFavorite(pet.id);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="group bg-white rounded-3xl overflow-hidden card-shadow hover:shadow-card-hover transition-all duration-500">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={imgSrc}
          alt={pet.name}
          onError={() => setImgSrc("/images/pets/placeholder.jpg")}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggle(pet.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all shadow-sm"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              mounted && fav ? "fill-coral text-coral" : "text-slate-400"
            }`}
          />
        </button>
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {pet.adoptionFee === 0 && (
            <Badge variant="success">Free Adoption</Badge>
          )}
          {pet.species === "cat" && (
            <Badge variant="secondary">🐱 Cat</Badge>
          )}
        </div>
        {/* Gender */}
        <div className="absolute bottom-3 left-3">
          <span className="text-xs font-semibold bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full text-slate-700">
            {pet.gender === "male" ? "♂ Male" : "♀ Female"}
          </span>
        </div>
      </div>

      {/* Info */}
      <Link href={`/pets/${pet.id}`} className="block p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-serif text-lg font-bold text-slate-900 truncate">
                {pet.name}
              </h3>
              {pet.verified && <VerifiedBadge />}
            </div>
            <p className="text-sm text-slate-500 mt-0.5">
              {pet.breed} · {pet.age.label}
            </p>
          </div>
          {pet.adoptionFee > 0 && (
            <span className="text-sm font-bold text-coral whitespace-nowrap ml-2">
              {formatPrice(pet.adoptionFee)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 mt-2.5 text-slate-400">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="text-xs truncate">
            {pet.location.city}, {pet.location.state}
          </span>
        </div>

        {/* Temperament tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {pet.temperament.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
      </Link>
    </div>
  );
}
