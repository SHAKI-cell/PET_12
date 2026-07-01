export interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
}

export const articles: Article[] = [
  {
    id: "1",
    title: "MeWow Cat Food – Delicious, Nutritious & Affordable...",
    excerpt: "At MeWow, we believe that your cat deserves food that’s not just tasty but also packed with real nutrition. Whether you’ve got a playful kitten or a chill adult cat....",
    image: "/images/cat_food.png",
    slug: "mewow-cat-food",
  },
  {
    id: "2",
    title: "MeWow Cat Food – Why Real Chicken and Vegetables Are Great for Your Dog...",
    excerpt: "When it comes to keeping your dog happy and healthy, nothing beats real, natural food. At the heart of a nutritious dog diet are two power-packed categories: high-quality protein and...",
    image: "/images/chicken_veg.png",
    slug: "real-chicken-vegetables",
  },
  {
    id: "3",
    title: "Woof... woof! Our grand launch is here!",
    excerpt: "We are thrilled to announce the launch of DoFo, marking a significant milestone in our commitment to provide pets with the love, care, and attention.",
    image: "/images/grand_launch.png",
    slug: "grand-launch",
  },
];
