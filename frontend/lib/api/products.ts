import { products, type Product } from "@/lib/data";

export interface ProductFilters {
  category?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  await new Promise((r) => setTimeout(r, 200));

  let filtered = [...products];

  if (filters) {
    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }
    if (filters.type) {
      filtered = filtered.filter((p) => p.type === filters.type);
    }
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
  }

  return filtered;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  await new Promise((r) => setTimeout(r, 150));
  return products.find((p) => p.id === id);
}
