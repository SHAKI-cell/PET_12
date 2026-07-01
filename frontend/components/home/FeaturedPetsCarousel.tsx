"use client";

import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Heart } from "lucide-react";
import Link from "next/link";
import { pets } from "@/lib/pets-data";
import { useFavoritesStore } from "@/lib/store";
import { VerifiedBadge } from "@/components/trust/VerifiedBadge";
import { Badge } from "@/components/ui/Badge";

const FeaturedPetsCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { toggle, isFavorite } = useFavoritesStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const featuredPets = pets.filter((p) => p.verified).slice(0, 8);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-12">
        <div>
          <span className="text-sm font-semibold text-coral uppercase tracking-wider">
            Find Your Companion
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-1">
            Featured Pets
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="p-2.5 rounded-full bg-white shadow-sm border border-slate-200 hover:bg-coral-light hover:border-coral/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="p-2.5 rounded-full bg-white shadow-sm border border-slate-200 hover:bg-coral-light hover:border-coral/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5 text-slate-700" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {featuredPets.map((pet, index) => (
            <motion.div
              key={pet.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="flex-[0_0_280px] md:flex-[0_0_300px]"
            >
              <div className="group bg-white rounded-3xl overflow-hidden card-shadow hover:shadow-card-hover transition-all duration-500">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={pet.images[0]}
                    alt={pet.name}
                    onError={(e) => { e.currentTarget.src = "/images/pets/placeholder.jpg"; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggle(pet.id);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all shadow-sm"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        mounted && isFavorite(pet.id)
                          ? "fill-coral text-coral"
                          : "text-slate-400"
                      }`}
                    />
                  </button>
                  {/* Free Badge */}
                  {pet.adoptionFee === 0 && (
                    <Badge className="absolute top-3 left-3" variant="success">
                      Free Adoption
                    </Badge>
                  )}
                </div>

                {/* Info */}
                <Link href={`/pets/${pet.id}`} className="block p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-serif text-lg font-bold text-slate-900">
                          {pet.name}
                        </h3>
                        {pet.verified && <VerifiedBadge />}
                      </div>
                      <p className="text-sm text-slate-500 mt-0.5">
                        {pet.breed} · {pet.age.label}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-slate-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="text-xs">
                      {pet.location.city}, {pet.location.state}
                    </span>
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile Scroll Buttons */}
      <div className="flex md:hidden items-center justify-center gap-3 mt-6">
        <button
          onClick={scrollPrev}
          className="p-2 rounded-full bg-white shadow-sm border border-slate-200"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={scrollNext}
          className="p-2 rounded-full bg-white shadow-sm border border-slate-200"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* View All Link */}
      <div className="text-center mt-10">
        <Link
          href="/pets"
          className="inline-flex items-center gap-2 text-sm font-semibold text-coral hover:underline underline-offset-4"
        >
          View all pets
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedPetsCarousel;
