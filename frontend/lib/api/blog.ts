import { blogArticles, type BlogArticle } from "@/lib/blog-data";

export async function getArticles(category?: string): Promise<BlogArticle[]> {
  await new Promise((r) => setTimeout(r, 200));

  if (category && category !== "all") {
    return blogArticles.filter((a) => a.category === category);
  }
  return [...blogArticles];
}

export async function getArticleBySlug(slug: string): Promise<BlogArticle | undefined> {
  await new Promise((r) => setTimeout(r, 150));
  return blogArticles.find((a) => a.slug === slug);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(blogArticles.map((a) => a.category))).sort();
}
