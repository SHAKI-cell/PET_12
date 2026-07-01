"use client";

import { motion } from "framer-motion";
import type { Pet } from "@/lib/pets-data";
import { PetCard } from "./PetCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { PawPrint, SearchX } from "lucide-react";

interface PetGridProps {
  pets: Pet[];
  isLoading: boolean;
}

function PetCardSkeleton() {
  return (
    <div className="rounded-3xl overflow-hidden bg-white shadow-premium">
      <Skeleton className="aspect-[4/3] rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-3 w-2/3" />
        <div className="flex gap-1 pt-1">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="col-span-full py-20 text-center">
      <div className="w-20 h-20 bg-coral-light rounded-full flex items-center justify-center mx-auto mb-6">
        <SearchX className="w-10 h-10 text-coral" />
      </div>
      <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
        No pets found
      </h3>
      <p className="text-slate-500 max-w-md mx-auto">
        Try adjusting your filters or search terms. There are many adorable pets waiting for a loving home!
      </p>
    </div>
  );
}

export function PetGrid({ pets, isLoading }: PetGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <PetCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (pets.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {pets.map((pet, index) => (
        <motion.div
          key={pet.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <PetCard pet={pet} />
        </motion.div>
      ))}
    </div>
  );
}
