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
  
  // Custom fields for Pet Food Marketplace
  brand?: string;
  rating?: number;
  reviewsCount?: number;
  discount?: number; // percentage, e.g. 10 for 10%
  stockStatus?: "in-stock" | "low-stock" | "out-of-stock";
  weightVariants?: { weight: string; price: number; stock: number }[];
  feedingGuide?: string;
  images?: string[];
  selectedWeight?: string;
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
    brand: "DoFo",
    rating: 4.6,
    reviewsCount: 34,
    stockStatus: "in-stock",
    weightVariants: [
      { weight: "1kg", price: 118.64, stock: 50 },
      { weight: "3kg", price: 320.00, stock: 30 },
      { weight: "10kg", price: 950.00, stock: 15 }
    ]
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
    brand: "DoFo",
    rating: 4.8,
    reviewsCount: 52,
    stockStatus: "in-stock",
    weightVariants: [
      { weight: "1kg", price: 135.59, stock: 40 },
      { weight: "3kg", price: 380.00, stock: 25 },
      { weight: "10kg", price: 1150.00, stock: 10 }
    ]
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
    brand: "DoFo",
    rating: 4.5,
    reviewsCount: 28,
    stockStatus: "in-stock",
    weightVariants: [
      { weight: "1kg", price: 118.64, stock: 60 },
      { weight: "3kg", price: 320.00, stock: 35 }
    ]
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
    brand: "DoFo",
    rating: 4.7,
    reviewsCount: 41,
    stockStatus: "in-stock",
    weightVariants: [
      { weight: "1kg", price: 152.54, stock: 20 },
      { weight: "3kg", price: 420.00, stock: 15 }
    ]
  },
  {
    id: "5",
    name: "Pedigree Puppy Chicken & Milk",
    brand: "Pedigree",
    category: "Dog Food",
    type: "Puppy Food",
    price: 329.00,
    image: "/images/pedigree_puppy.png",
    description: "Complete and balanced dry food for puppies, supporting strong teeth, bones, and immune system.",
    ingredients: ["Chicken", "Milk Powder", "Cereals", "Soybean Meal", "Dietary Fiber"],
    nutritionalInfo: "Protein: 24%, Fat: 10%, Fiber: 5%",
    rating: 4.5,
    reviewsCount: 124,
    discount: 10,
    stockStatus: "in-stock",
    weightVariants: [
      { weight: "1.2kg", price: 329.00, stock: 45 },
      { weight: "3kg", price: 799.00, stock: 20 },
      { weight: "10kg", price: 2399.00, stock: 12 }
    ],
    feedingGuide: "Feed 50g-200g daily depending on puppy's weight. Split into 3-4 meals."
  },
  {
    id: "6",
    name: "Royal Canin Mini Adult",
    brand: "Royal Canin",
    category: "Dog Food",
    type: "Adult Dog Food",
    price: 890.00,
    image: "/images/royal_canin_mini.png",
    description: "Premium tailor-made nutrition for small breed adult dogs up to 10kg, maintaining ideal weight.",
    ingredients: ["Dehydrated Poultry", "Maize", "Animal Fats", "Beet Pulp", "L-Carnitine"],
    nutritionalInfo: "Protein: 27%, Fat: 16%, Fiber: 1.3%",
    rating: 4.8,
    reviewsCount: 210,
    discount: 5,
    stockStatus: "in-stock",
    weightVariants: [
      { weight: "800g", price: 890.00, stock: 30 },
      { weight: "2kg", price: 1950.00, stock: 15 },
      { weight: "8kg", price: 6200.00, stock: 8 }
    ],
    feedingGuide: "Feed 100g-150g daily in 2 meals."
  },
  {
    id: "7",
    name: "Drools Focus Adult Super Premium",
    brand: "Drools",
    category: "Dog Food",
    type: "Adult Dog Food",
    price: 650.00,
    image: "/images/drools_focus.png",
    description: "Super premium formula with real chicken, no corn, wheat or soya, for optimal health.",
    ingredients: ["Real Chicken (32%)", "Rice", "Dried Egg", "Flaxseed", "Vitamins & Minerals"],
    nutritionalInfo: "Protein: 26%, Fat: 14%, Fiber: 2.5%",
    rating: 4.4,
    reviewsCount: 88,
    discount: 15,
    stockStatus: "in-stock",
    weightVariants: [
      { weight: "1.2kg", price: 650.00, stock: 50 },
      { weight: "4kg", price: 1950.00, stock: 25 },
      { weight: "12kg", price: 4800.00, stock: 10 }
    ],
    feedingGuide: "Feed 150g-300g daily based on activity level."
  },
  {
    id: "8",
    name: "Purina Pro Plan Sensitive Stomach",
    brand: "Purina",
    category: "Dog Food",
    type: "Nutrition Supplements",
    price: 1850.00,
    image: "/images/purina_pro_plan.png",
    description: "Specialized dry formula with salmon and oatmeal for dogs with sensitive skin and digestion.",
    ingredients: ["Salmon", "Barley", "Oatmeal", "Fish Meal", "Canola Meal"],
    nutritionalInfo: "Protein: 26%, Fat: 16%, Fiber: 4%",
    rating: 4.7,
    reviewsCount: 145,
    discount: 8,
    stockStatus: "in-stock",
    weightVariants: [
      { weight: "2.5kg", price: 1850.00, stock: 15 },
      { weight: "11kg", price: 6950.00, stock: 5 }
    ],
    feedingGuide: "Feed 120g-250g daily."
  },
  {
    id: "9",
    name: "Whiskas Kitten Chicken & Milk",
    brand: "Whiskas",
    category: "Cat Food",
    type: "Kitten Food",
    price: 210.00,
    image: "/images/whiskas_kitten.png",
    description: "Tasty and crunchy pocket kibbles packed with calcium, protein, and antioxidants for growing kittens.",
    ingredients: ["Chicken", "Wholegrain Cereals", "Poultry Meal", "Milk Powder", "Taurine"],
    nutritionalInfo: "Protein: 30%, Fat: 12%, Fiber: 3%",
    rating: 4.6,
    reviewsCount: 320,
    discount: 12,
    stockStatus: "in-stock",
    weightVariants: [
      { weight: "450g", price: 210.00, stock: 60 },
      { weight: "1.1kg", price: 460.00, stock: 40 },
      { weight: "3kg", price: 1150.00, stock: 18 }
    ],
    feedingGuide: "Feed 30g-70g daily split in 4 meals. Soften with water for very young kittens."
  },
  {
    id: "10",
    name: "Sheba Fine Flakes in Gravy",
    brand: "Sheba",
    category: "Cat Food",
    type: "Wet Food",
    price: 65.00,
    image: "/images/sheba_wet.png",
    description: "Exquisite wet cat food pouches featuring fine flakes of chicken and tuna in gravy.",
    ingredients: ["Chicken Breast", "Tuna Flakes", "Thickening Agents", "Minerals"],
    nutritionalInfo: "Protein: 10%, Fat: 0.5%, Moisture: 85%",
    rating: 4.9,
    reviewsCount: 412,
    stockStatus: "in-stock",
    weightVariants: [
      { weight: "85g", price: 65.00, stock: 150 },
      { weight: "Pack of 12", price: 740.00, stock: 40 },
      { weight: "Pack of 24", price: 1420.00, stock: 20 }
    ],
    feedingGuide: "Give 2-3 pouches daily for an adult cat of 4kg."
  },
  {
    id: "11",
    name: "Me-O Creamy Treats Salmon",
    brand: "Me-O",
    category: "Cat Food",
    type: "Cat Treats",
    price: 150.00,
    image: "/images/meo_treats.png",
    description: "Lickable creamy treats for cats with delicious salmon flavor, added green tea extract.",
    ingredients: ["Salmon", "Chicken Meat", "Flavoring Agent", "Salmon Oil", "Taurine"],
    nutritionalInfo: "Protein: 5%, Fat: 1%, Fiber: 1%",
    rating: 4.7,
    reviewsCount: 195,
    discount: 5,
    stockStatus: "in-stock",
    weightVariants: [
      { weight: "4x15g Pack", price: 150.00, stock: 100 },
      { weight: "20x15g Mega Pack", price: 680.00, stock: 35 }
    ],
    feedingGuide: "Give as a treat or topping. Do not exceed 2 sachets daily."
  },
  {
    id: "12",
    name: "Farmina N&D Senior Chicken & Pomegranate",
    brand: "Farmina",
    category: "Dog Food",
    type: "Senior Dog Food",
    price: 1450.00,
    image: "/images/farmina_senior.png",
    description: "High-protein low-glycemic ancestral grain formula for senior dogs, containing chicken and pomegranate.",
    ingredients: ["Boneless Chicken", "Spelt", "Oats", "Pomegranate", "Glucosamine"],
    nutritionalInfo: "Protein: 27%, Fat: 15%, Fiber: 5.5%",
    rating: 4.8,
    reviewsCount: 64,
    discount: 10,
    stockStatus: "in-stock",
    weightVariants: [
      { weight: "2.5kg", price: 1450.00, stock: 15 },
      { weight: "12kg", price: 5990.00, stock: 6 }
    ],
    feedingGuide: "Feed 100g-250g daily based on senior dog's weight."
  },
  {
    id: "13",
    name: "Royal Canin Fit 32",
    brand: "Royal Canin",
    category: "Cat Food",
    type: "Dry Food",
    price: 550.00,
    image: "/images/royal_canin_cat.png",
    description: "Balanced and complete dry feed for active adult cats from 1 to 7 years old.",
    ingredients: ["Dehydrated Poultry", "Rice", "Wheat", "Animal Fats", "Vegetable Fibers"],
    nutritionalInfo: "Protein: 32%, Fat: 15%, Fiber: 4.6%",
    rating: 4.8,
    reviewsCount: 175,
    discount: 5,
    stockStatus: "in-stock",
    weightVariants: [
      { weight: "400g", price: 550.00, stock: 40 },
      { weight: "2kg", price: 2150.00, stock: 20 },
      { weight: "4kg", price: 3950.00, stock: 10 }
    ],
    feedingGuide: "Feed 50g-75g daily depending on cat's weight."
  },
  {
    id: "14",
    name: "Drools Calcium Tablets Supplement",
    brand: "Drools",
    category: "Dog Food",
    type: "Nutrition Supplements",
    price: 390.00,
    image: "/images/drools_calcium.png",
    description: "Enriched calcium and phosphorus supplement tablets for strong teeth and bones in dogs.",
    ingredients: ["Calcium", "Phosphorus", "Vitamin D3", "Vitamin B12", "Excipients"],
    nutritionalInfo: "Calcium: 6.5%, Phosphorus: 5.0%, Vitamin D3: 1200 IU",
    rating: 4.6,
    reviewsCount: 150,
    discount: 10,
    stockStatus: "in-stock",
    weightVariants: [
      { weight: "50 Tablets", price: 390.00, stock: 80 },
      { weight: "110 Tablets", price: 690.00, stock: 50 }
    ],
    feedingGuide: "Give 1 tablet for puppies/small dogs, 2 tablets for large adult dogs daily."
  }
];
