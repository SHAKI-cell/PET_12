import { products, type Product } from "@/lib/data";

export interface ProductFilters {
  petType?: "Dog" | "Cat" | "All";
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  weight?: string;
  availability?: "in-stock" | "out-of-stock" | "all";
  search?: string;
  sortBy?: "newest" | "price-asc" | "price-desc" | "best-selling" | "highest-rated";
}

export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 200));

  let filtered = [...products];

  if (filters) {
    // 1. Pet Type Filter (Dog/Cat)
    if (filters.petType && filters.petType !== "All") {
      const typeLower = filters.petType.toLowerCase();
      filtered = filtered.filter((p) => {
        const cat = p.category.toLowerCase();
        const type = p.type.toLowerCase();
        const name = p.name.toLowerCase();
        
        if (typeLower === "dog") {
          return cat.includes("dog") || cat.includes("puppy") || type.includes("dog") || type.includes("puppy") || name.includes("dog") || name.includes("puppy");
        } else if (typeLower === "cat") {
          return cat.includes("cat") || cat.includes("kitten") || type.includes("cat") || type.includes("kitten") || name.includes("cat") || name.includes("kitten");
        }
        return true;
      });
    }

    // 2. Category Filter
    if (filters.category && filters.category !== "All") {
      filtered = filtered.filter((p) => p.category === filters.category || p.type === filters.category);
    }

    // 3. Brand Filter
    if (filters.brand && filters.brand !== "All") {
      filtered = filtered.filter((p) => p.brand === filters.brand);
    }

    // 4. Price Filter
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
    }

    // 5. Rating Filter
    if (filters.rating !== undefined && filters.rating > 0) {
      filtered = filtered.filter((p) => (p.rating || 0) >= filters.rating!);
    }

    // 6. Weight Filter
    if (filters.weight && filters.weight !== "All") {
      filtered = filtered.filter((p) => 
        p.weightVariants?.some((v) => v.weight === filters.weight)
      );
    }

    // 7. Availability Filter
    if (filters.availability && filters.availability !== "all") {
      filtered = filtered.filter((p) => {
        const status = p.stockStatus || "in-stock";
        return filters.availability === "in-stock" ? status === "in-stock" : status !== "in-stock";
      });
    }

    // 8. Search Filter
    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.brand && p.brand.toLowerCase().includes(q))
      );
    }

    // 9. Sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "price-asc":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "highest-rated":
          filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case "best-selling":
          // Simulated best selling using reviewsCount
          filtered.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
          break;
        case "newest":
        default:
          // Simulate newest by id descending
          filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
          break;
      }
    }
  }

  return filtered;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  await new Promise((r) => setTimeout(r, 150));
  return products.find((p) => p.id === id);
}

export function getAllBrands(): string[] {
  const brands = products.map((p) => p.brand).filter(Boolean) as string[];
  return Array.from(new Set(brands)).sort();
}

export function getAllCategories(): string[] {
  const categories = products.map((p) => p.category);
  const types = products.map((p) => p.type);
  return Array.from(new Set([...categories, ...types])).sort();
}

export function getAllWeights(): string[] {
  const weights: string[] = [];
  products.forEach((p) => {
    p.weightVariants?.forEach((v) => weights.push(v.weight));
  });
  return Array.from(new Set(weights)).sort();
}
