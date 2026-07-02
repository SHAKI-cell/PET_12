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

function getApprovedCustomListings(): Pet[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("dofo_approved_listings");
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return parsed.map((c: any) => {
      const months = c.ageUnit === "years" ? c.age * 12 : c.age;
      const size = c.weight < 5 ? "small" : c.weight < 15 ? "medium" : "large";
      return {
        id: c.id,
        name: c.name,
        breed: c.breed,
        species: c.species,
        age: { months, label: `${c.age} ${c.ageUnit}` },
        gender: c.gender,
        size,
        location: {
          city: c.location.city,
          state: c.location.state,
          lat: c.location.lat || 19.076,
          lng: c.location.lng || 72.8777,
        },
        images: c.photos && c.photos.length > 0 ? c.photos : [],
        verified: true,
        vaccinated: !!c.vaccinated,
        spayed: !!c.spayed,
        temperament: ["Friendly", "Playful"],
        adoptionFee: Number(c.adoptionFee) || 0,
        ownerId: "custom-owner",
        ownerName: c.owner?.name || "Owner",
        ownerAvatar: "",
        ownerRating: 5.0,
        ownerMemberSince: "New Member",
        description: c.description || "",
        healthNotes: c.healthNotes || "",
        createdAt: c.submittedAt || new Date().toISOString(),
      };
    });
  } catch (e) {
    console.error("Failed to parse approved custom listings", e);
    return [];
  }
}

export async function getPets(filters?: PetFilters): Promise<Pet[]> {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 300));

  const customApproved = getApprovedCustomListings();
  let filtered = [...customApproved, ...pets];

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
  const customApproved = getApprovedCustomListings();
  const allPets = [...customApproved, ...pets];
  return allPets.find((p) => p.id === id);
}

export function getAllBreeds(): string[] {
  const customApproved = getApprovedCustomListings();
  const allPets = [...customApproved, ...pets];
  return Array.from(new Set(allPets.map((p) => p.breed))).sort();
}

export function getAllCities(): string[] {
  const customApproved = getApprovedCustomListings();
  const allPets = [...customApproved, ...pets];
  return Array.from(new Set(allPets.map((p) => p.location.city))).sort();
}

