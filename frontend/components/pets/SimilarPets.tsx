"use client";

import { useEffect, useState } from "react";
import { getPets } from "@/lib/api/pets";
import type { Pet } from "@/lib/pets-data";
import { PetCard } from "./PetCard";
import { motion } from "framer-motion";

interface SimilarPetsProps {
  species: "dog" | "cat" | "other";
  currentPetId: string;
}

export function SimilarPets({ species, currentPetId }: SimilarPetsProps) {
  const [similar, setSimilar] = useState<Pet[]>([]);

  useEffect(() => {
    async function fetchSimilar() {
      const allPets = await getPets({ species });
      const filtered = allPets.filter((p) => p.id !== currentPetId).slice(0, 3);
      setSimilar(filtered);
    }
    fetchSimilar();
  }, [species, currentPetId]);

  if (similar.length === 0) return null;

  return (
    <section className="space-y-6">
      <h3 className="font-serif text-2xl font-bold text-slate-900">Similar Pets You May Like</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {similar.map((pet, idx) => (
          <motion.div
            key={pet.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
          >
            <PetCard pet={pet} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
