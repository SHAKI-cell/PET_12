export interface Product {
  id: string;
  name: string;
  category: string; // Dog Food or Cat Food
  type: string; // Large Breed, Puppy, etc.
  price: number; // in Rupees
  image: string;
  description: string;
  ingredients: string[];
  nutritionalInfo: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "DoFo All Stage Adult Gold",
    category: "Dog Food",
    type: "Large Breed",
    price: 118.64,
    image: "/images/dofo_adult_gold.png",
    description: "Complete and balanced nutrition tailored for large breed adult dogs.",
    ingredients: ["Real Chicken (30%)", "Brown Rice", "Oats", "Fish Oil", "Glucosamine"],
    nutritionalInfo: "Protein: 28%, Fat: 15%, Fiber: 4%",
  },
  {
    id: "2",
    name: "DoFo Puppy Gold",
    category: "Dog Food",
    type: "Puppy",
    price: 135.59,
    image: "/images/dofo_puppy_gold.png",
    description: "Supports healthy growth, brain development, and strong immunity for puppies.",
    ingredients: ["Real Chicken (35%)", "Milk Replacer", "DHA", "Antioxidants", "Calcium"],
    nutritionalInfo: "Protein: 32%, Fat: 20%, Fiber: 3%",
  },
  {
    id: "3",
    name: "DoFo All Stage Adult Gold",
    category: "Dog Food",
    type: "Small Breed",
    price: 118.64,
    image: "/images/dofo_small_breed.png",
    description: "Specially crafted kibble size and nutrients for small breed adult dogs.",
    ingredients: ["Real Chicken (28%)", "Whole Wheat", "Vegetable Protein", "Omega-3", "Taurine"],
    nutritionalInfo: "Protein: 27%, Fat: 14%, Fiber: 4.5%",
  },
  {
    id: "4",
    name: "DoFo Puppy Starter Gold",
    category: "Dog Food",
    type: "Puppy Starter",
    price: 152.54,
    image: "/images/dofo_puppy_starter.png",
    description: "Easy-to-digest starter diet for weaning puppies with high energy needs.",
    ingredients: ["Real Chicken (38%)", "Rice Flour", "Egg Protein", "Probiotics", "Zinc"],
    nutritionalInfo: "Protein: 34%, Fat: 22%, Fiber: 2.5%",
  },
];
