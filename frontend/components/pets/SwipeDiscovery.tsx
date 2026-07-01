"use client";

import { useState, useCallback } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Heart, MapPin, Undo2, X as XIcon } from "lucide-react";
import type { Pet } from "@/lib/pets-data";
import { useFavoritesStore } from "@/lib/store";
import { VerifiedBadge } from "@/components/trust/VerifiedBadge";
import Link from "next/link";

interface SwipeDiscoveryProps {
  pets: Pet[];
}

interface SwipeHistoryEntry {
  pet: Pet;
  direction: "left" | "right";
}

export function SwipeDiscovery({ pets }: SwipeDiscoveryProps) {
  const [deck, setDeck] = useState<Pet[]>([...pets]);
  const [undoStack, setUndoStack] = useState<SwipeHistoryEntry[]>([]);
  const { add, remove } = useFavoritesStore();

  const handleSwipe = useCallback(
    (pet: Pet, direction: "left" | "right") => {
      setUndoStack((prev) => [...prev, { pet, direction }]);
      setDeck((prev) => prev.filter((p) => p.id !== pet.id));

      if (direction === "right") {
        add(pet.id);
      }
    },
    [add]
  );

  const handleUndo = useCallback(() => {
    if (undoStack.length === 0) return;
    const last = undoStack[undoStack.length - 1];
    setUndoStack((prev) => prev.slice(0, -1));
    setDeck((prev) => [last.pet, ...prev]);

    if (last.direction === "right") {
      remove(last.pet.id);
    }
  }, [undoStack, remove]);

  if (deck.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 bg-coral-light rounded-full flex items-center justify-center mb-4">
          <Heart className="w-10 h-10 text-coral" />
        </div>
        <h3 className="font-serif text-2xl font-bold mb-2">No more pets!</h3>
        <p className="text-slate-500 text-sm max-w-xs">
          You&apos;ve seen all available pets. Check your saved favorites or come back later!
        </p>
        <button
          onClick={() => {
            setDeck([...pets]);
            setUndoStack([]);
          }}
          className="mt-4 text-sm font-semibold text-coral hover:underline"
        >
          Start Over
        </button>
      </div>
    );
  }

  const currentPet = deck[0];

  return (
    <div className="flex flex-col items-center">
      {/* Card Stack */}
      <div className="relative w-full max-w-[340px] h-[480px]">
        {deck.slice(0, 3).map((pet, index) => (
          <SwipeCard
            key={pet.id}
            pet={pet}
            isTop={index === 0}
            stackIndex={index}
            onSwipe={handleSwipe}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={handleUndo}
          disabled={undoStack.length === 0}
          className="p-3 rounded-full bg-white shadow-md border border-slate-200 hover:bg-slate-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Undo2 className="w-5 h-5 text-slate-600" />
        </button>
        <button
          onClick={() => handleSwipe(currentPet, "left")}
          className="p-4 rounded-full bg-white shadow-md border-2 border-red-200 hover:bg-red-50 transition-all"
        >
          <XIcon className="w-6 h-6 text-red-400" />
        </button>
        <button
          onClick={() => handleSwipe(currentPet, "right")}
          className="p-4 rounded-full bg-white shadow-md border-2 border-emerald/30 hover:bg-emerald-light transition-all"
        >
          <Heart className="w-6 h-6 text-coral" />
        </button>
      </div>

      <p className="text-xs text-slate-400 mt-4">
        Swipe right to save, left to skip · {deck.length} remaining
      </p>
    </div>
  );
}

// --- Individual Swipe Card ---
interface SwipeCardProps {
  pet: Pet;
  isTop: boolean;
  stackIndex: number;
  onSwipe: (pet: Pet, direction: "left" | "right") => void;
}

function SwipeCard({ pet, isTop, stackIndex, onSwipe }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 100) {
      onSwipe(pet, "right");
    } else if (info.offset.x < -100) {
      onSwipe(pet, "left");
    }
  };

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        scale: 1 - stackIndex * 0.05,
        zIndex: 3 - stackIndex,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
    >
      <div className="w-full h-full bg-white rounded-3xl overflow-hidden shadow-premium-lg border border-slate-100 cursor-grab active:cursor-grabbing">
        {/* Image */}
        <div className="relative h-[60%] overflow-hidden bg-slate-100">
          <img
            src={pet.images[0]}
            alt={pet.name}
            onError={(e) => { e.currentTarget.src = "/images/pets/placeholder.jpg"; }}
            className="w-full h-full object-cover"
          />

          {/* Swipe Indicators */}
          {isTop && (
            <>
              <motion.div
                style={{ opacity: likeOpacity }}
                className="absolute top-6 left-6 bg-emerald text-white px-4 py-2 rounded-xl font-bold text-lg rotate-[-12deg] border-2 border-white"
              >
                LIKE ❤️
              </motion.div>
              <motion.div
                style={{ opacity: nopeOpacity }}
                className="absolute top-6 right-6 bg-red-400 text-white px-4 py-2 rounded-xl font-bold text-lg rotate-[12deg] border-2 border-white"
              >
                NOPE
              </motion.div>
            </>
          )}

          {pet.verified && (
            <div className="absolute bottom-3 left-3">
              <VerifiedBadge size="md" showLabel />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-5 h-[40%] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-bold text-slate-900">
                {pet.name}
              </h3>
              <span className="text-sm text-slate-500">{pet.age.label}</span>
            </div>
            <p className="text-sm text-slate-500 mt-0.5">{pet.breed}</p>
            <div className="flex items-center gap-1 mt-2 text-slate-400">
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-xs">
                {pet.location.city}, {pet.location.state}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {pet.temperament.map((t) => (
              <span
                key={t}
                className="text-xs font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
