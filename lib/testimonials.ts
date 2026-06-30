export interface Testimonial {
  id: string;
  name: string;
  review: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Siya",
    rating: 5,
    review: "Switched to Dofo recently and it’s been amazing. My dog’s coat looks shinier, his energy is up, and he actually loves mealtime now. You can tell it’s...",
  },
  {
    id: "2",
    name: "Anupam J.",
    rating: 5,
    review: "I was skeptical at first, but Dofo totally won us over. My dog’s super picky, but he devours every meal. You can see the fresh chicken and veggies—it’...",
  },
  {
    id: "3",
    name: "Vignesh",
    rating: 5,
    review: "I tried Dofo for my pup and he’s obsessed! It’s real chicken and fresh veggies—no weird stuff. He’s happier, healthier, and finishes every bowl. Honestly, ...",
  },
  {
    id: "4",
    name: "Anvita",
    rating: 5,
    review: "As a dog owner with two pups, I tried Dofo Dog Food and was pleasantly surprised. It contains real meat as the first ingredient, along with grains...",
  },
];
