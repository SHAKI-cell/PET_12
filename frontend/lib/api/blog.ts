import { blogArticles, type BlogArticle } from "@/lib/blog-data";

export interface BlogFilters {
  category?: string;
  search?: string;
  sortBy?: "newest" | "popular" | "views" | "readTime";
}

export async function getArticles(filters: BlogFilters = {}): Promise<BlogArticle[]> {
  await new Promise((r) => setTimeout(r, 100));
  let result = [...blogArticles];

  // Category filter (case-insensitive)
  if (filters.category && filters.category.toLowerCase() !== "all") {
    result = result.filter(
      (a) => a.category.toLowerCase() === filters.category!.toLowerCase()
    );
  }

  // Search filter (title, excerpt, content, category, keywords)
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );
  }

  // Sorting logic
  if (filters.sortBy) {
    if (filters.sortBy === "newest") {
      result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } else if (filters.sortBy === "popular") {
      result.sort((a, b) => b.likes - a.likes);
    } else if (filters.sortBy === "views") {
      result.sort((a, b) => b.views - a.views);
    } else if (filters.sortBy === "readTime") {
      const getMinutes = (s: string) => parseInt(s.split(" ")[0]) || 0;
      result.sort((a, b) => getMinutes(a.readTime) - getMinutes(b.readTime));
    }
  }

  return result;
}

export async function getArticleBySlug(slug: string): Promise<BlogArticle | undefined> {
  await new Promise((r) => setTimeout(r, 100));
  return blogArticles.find((a) => a.slug === slug);
}

export function getAllCategories(): string[] {
  return [
    "Nutrition",
    "Pet Health",
    "Breed Guides",
    "Feeding Guide",
    "Grooming",
    "Puppy Care",
    "Cat Care",
    "Buying Guide",
    "Veterinary Tips"
  ];
}
