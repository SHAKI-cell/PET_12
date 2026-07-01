import { pets, type Pet } from "@/lib/pets-data";

export interface PetFilters {
  breed?: string;
  species?: "dog" | "cat" | "other";
  gender?: "male" | "female";
  size?: "small" | "medium" | "large";
  city?: string;
  minAge?: number;
  maxAge?: number;
  freeOnly?: boolean;
  search?: string;
}

export async function getPets(filters?: PetFilters): Promise<Pet[]> {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 300));

  let filtered = [...pets];

  if (filters) {
    if (filters.breed) {
      filtered = filtered.filter((p) =>
        p.breed.toLowerCase().includes(filters.breed!.toLowerCase())
      );
    }
    if (filters.species) {
      filtered = filtered.filter((p) => p.species === filters.species);
    }
    if (filters.gender) {
      filtered = filtered.filter((p) => p.gender === filters.gender);
    }
    if (filters.size) {
      filtered = filtered.filter((p) => p.size === filters.size);
    }
    if (filters.city) {
      filtered = filtered.filter((p) =>
        p.location.city.toLowerCase().includes(filters.city!.toLowerCase())
      );
    }
    if (filters.minAge !== undefined) {
      filtered = filtered.filter((p) => p.age.months >= filters.minAge!);
    }
    if (filters.maxAge !== undefined) {
      filtered = filtered.filter((p) => p.age.months <= filters.maxAge!);
    }
    if (filters.freeOnly) {
      filtered = filtered.filter((p) => p.adoptionFee === 0);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.breed.toLowerCase().includes(q) ||
          p.location.city.toLowerCase().includes(q)
      );
    }
  }

  return filtered;
}

export async function getPetById(id: string): Promise<Pet | undefined> {
  await new Promise((r) => setTimeout(r, 200));
  return pets.find((p) => p.id === id);
}

export function getAllBreeds(): string[] {
  return Array.from(new Set(pets.map((p) => p.breed))).sort();
}

export function getAllCities(): string[] {
  return Array.from(new Set(pets.map((p) => p.location.city))).sort();
}
