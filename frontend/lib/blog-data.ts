export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: "Nutrition" | "Pet Health" | "Breed Guides" | "Feeding Guide" | "Grooming" | "Puppy Care" | "Cat Care" | "Buying Guide" | "Veterinary Tips";
  image: string;
  author: { name: string; avatar: string; bio: string };
  publishedAt: string;
  readTime: string; // e.g. "4 min read"
  views: number;
  likes: number;
  relatedSlugs: string[];
  relatedProductIds: string[]; // Relate articles to products in the store (e.g. /shop/X)
}

export const blogArticles: BlogArticle[] = [
  {
    id: "blog-001",
    title: "Best Food for Labrador Puppies",
    slug: "best-food-labrador-puppies",
    excerpt: "Discover the ideal nutrients, proteins, and portion sizes to support the rapid growth, strong bones, and healthy joints of your Labrador puppy.",
    content: `Labrador Retrievers are one of the most beloved breeds in India, but they grow very quickly. A Labrador puppy can gain up to 1-2 kg per week during their peak growth phase. Providing the right nutrition is critical to prevent skeletal issues and support cognitive development.\n\n## Nutritional Needs of Labrador Puppies\n\n- **High-Quality Protein (28-32%)**: Crucial for building lean muscle mass and supporting active play.\n- **Optimized Calcium & Phosphorus**: Joint development is key since Labs are prone to Hip Dysplasia. The calcium-to-phosphorus ratio must be balanced.\n- **Omega Fatty Acids (DHA/EPA)**: Derived from fish oils, these support brain growth, healthy eyesight, and a glossy coat.\n\n## Feeding Schedule Guidelines\n\n- **2 to 4 Months**: Feed 4 small meals per day. This maintains blood sugar and prevents bloating.\n- **4 to 8 Months**: Transition to 3 meals per day.\n- **8 to 12 Months**: Feed 2 meals per day. Transition to adult food around 12-15 months.\n\n## Recommended DoFo Products\n\nTo ensure your Lab puppy thrives, we recommend serving **DoFo Puppy Gold** or **Pedigree Puppy Chicken & Milk**. These contain structured joint supplements (Glucosamine) and the correct mineral levels for large breeds.`,
    category: "Nutrition",
    image: "/images/pets/pet-001/1.jpg",
    author: { name: "Dr. Priya Menon", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaMenon", bio: "Veterinary nutritionist with 10+ years of experience in pet dietary science." },
    publishedAt: "2026-06-28T09:00:00Z",
    readTime: "5 min read",
    views: 1420,
    likes: 312,
    relatedSlugs: ["puppy-feeding-guide", "dog-vaccination-schedule"],
    relatedProductIds: ["2", "5"]
  },
  {
    id: "blog-002",
    title: "Dry Food vs Wet Food: Which Is Better for Your Pet?",
    slug: "dry-food-vs-wet-food",
    excerpt: "Unpack the pros and cons of dry kibble and wet canned diets, and learn how a mixed feeding strategy can benefit your pet's hydration and dental health.",
    content: `When walking down the pet food aisle, the choice between dry kibble and wet canned food can be confusing. Both formats offer complete and balanced nutrition, but they cater to different dietary needs and preferences.\n\n## Dry Kibble: The Convenient Choice\n\nDry food is the most popular choice among pet parents due to its convenience and long shelf life.\n\n- **Dental Hygiene**: The mechanical action of chewing dry kibbles helps scrape away plaque and tartar buildup.\n- **Convenience**: Easy to measure, store, and can be left in the bowl for hours without spoiling.\n- **Cost-Effective**: Generally cheaper per serving compared to wet food.\n\n## Wet Food: The Hydration Powerhouse\n\nWet food is excellent for hydration and palatability, especially for picky eaters.\n\n- **High Moisture Content**: Typically consists of 70-80% water. This is highly beneficial for cats who are prone to urinary tract issues and kidney disease.\n- **Rich Aroma & Flavor**: Stronger scent and softer texture makes it irresistible to senior pets or those with dental issues.\n- **Weight Management**: High water content fills up your pet faster, helping them manage weight.\n\n## The Verdict: Mixed Feeding\n\nFor many pets, a **combination of both (mixed feeding)** is the ideal solution. You can feed dry kibble in the morning for dental benefits, and wet food in the evening to boost hydration and taste.`,
    category: "Feeding Guide",
    image: "/images/cat_food.png",
    author: { name: "Amit Khanna", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AmitKhanna", bio: "Pet nutrition advocate and founder of Canine Kitchen blog." },
    publishedAt: "2026-06-25T14:00:00Z",
    readTime: "4 min read",
    views: 980,
    likes: 215,
    relatedSlugs: ["best-food-labrador-puppies", "how-to-read-pet-food-labels"],
    relatedProductIds: ["10", "13", "9"]
  },
  {
    id: "blog-003",
    title: "The Ultimate Puppy Feeding Guide",
    slug: "puppy-feeding-guide",
    excerpt: "Learn how much, how often, and what type of food to feed your new puppy at every stage of their development from weaning to their first birthday.",
    content: `Bringing a new puppy home is a joyful experience, but establishing a proper feeding routine is vital. Puppies need twice as much energy per kilogram of body weight compared to adult dogs to support their growing muscles, bones, and organs.\n\n## Puppy Feeding Schedule By Age\n\n- **6-12 Weeks (Weaning & Growth)**: Feed 4 meals per day. Food should be soft (kibble soaked in warm water or puppy starter formula).\n- **3-6 Months**: Reduce to 3 meals per day. At this stage, puppies begin losing baby teeth, so dry kibbles are excellent for chew relief.\n- **6-12 Months**: Feed 2 meals per day. Large breeds may continue puppy food until 18 months, while small breeds transition to adult food by 12 months.\n\n## How Much to Feed?\n\nAlways refer to the feeding chart on your dog food packaging. Portions are determined by your puppy's current weight and expected adult weight. Monitor their body condition: you should be able to feel their ribs easily but not see them.\n\n## Recommended Starter Products\n\nWe recommend starting with **DoFo Puppy Starter Gold** (for puppies under 3 months) and transitioning to **DoFo Puppy Gold** or **Pedigree Puppy Chicken & Milk** (for older puppies).`,
    category: "Feeding Guide",
    image: "/images/pets/pet-002/1.jpg",
    author: { name: "Dr. Priya Menon", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaMenon", bio: "Veterinary nutritionist with 10+ years of experience in pet dietary science." },
    publishedAt: "2026-06-20T11:00:00Z",
    readTime: "6 min read",
    views: 2110,
    likes: 490,
    relatedSlugs: ["best-food-labrador-puppies", "dog-vaccination-schedule"],
    relatedProductIds: ["4", "2", "5"]
  },
  {
    id: "blog-004",
    title: "Dog Vaccination Schedule in India",
    slug: "dog-vaccination-schedule",
    excerpt: "Protect your furry family member from deadly diseases like Rabies and Parvovirus with this essential veterinary vaccination timeline.",
    content: `Vaccinating your dog is the single most effective way to protect them from dangerous and fatal diseases. As a pet parent in India, keeping up with immunization protects not only your pet but your community as well.\n\n## Essential Core Vaccines for Dogs\n\n1. **DHPPiL (Combined Vaccine)**: Protects against Distemper, Hepatitis, Parvovirus, Parainfluenza, and Leptospirosis.\n2. **Rabies Vaccine (ARV)**: Mandatory by law in India, Rabies is 100% fatal but 100% preventable.\n\n## Timeline & Schedule\n\n- **6 to 8 Weeks**: First dose of DHPPiL.\n- **10 to 12 Weeks**: Second booster of DHPPiL + First dose of Anti-Rabies Vaccine (ARV).\n- **14 to 16 Weeks**: Third booster of DHPPiL + ARV booster.\n- **Annual Boosters**: Both DHPPiL and ARV must be administered annually throughout your dog's life.\n\nAlways consult your veterinarian to document every dose on your pet's vaccination card. Safe adoption profiles on DoFo always feature verified vaccination tags!`,
    category: "Pet Health",
    image: "/images/pets/pet-004/1.jpg",
    author: { name: "Dr. Priya Menon", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaMenon", bio: "Veterinary nutritionist with 10+ years of experience in pet dietary science." },
    publishedAt: "2026-06-15T08:30:00Z",
    readTime: "5 min read",
    views: 1840,
    likes: 412,
    relatedSlugs: ["puppy-feeding-guide", "foods-dogs-never-eat"],
    relatedProductIds: ["14"]
  },
  {
    id: "blog-005",
    title: "Best Cat Food for Persian Cats",
    slug: "best-cat-food-persian-cats",
    excerpt: "Learn how specialized diets with hairball control, Omega-3 fatty acids, and small cross-shaped kibbles cater to the unique needs of Persian cats.",
    content: `Persian cats are known for their magnificent long coats, sweet flat faces, and calm, lazy personalities. These unique traits also mean they require highly specific nutrition to address hairballs, skin health, and difficulty chewing.\n\n## Dietary Priorities for Persian Cats\n\n- **Hairball Control**: Due to their long fur and self-grooming, Persians ingest a lot of hair. Diets high in natural fibers help pass ingested hair smoothly through the digestive tract.\n- **Skin & Coat Support**: Rich sources of Omega-3 and Omega-6 fatty acids (like salmon oil) nourish their long coats, preventing tangles and dry skin.\n- **Brachycephalic Kibbles**: Flat-faced cats struggle to pick up normal round kibbles. Almond or cross-shaped kibbles are easier for them to grab and chew.\n\n## Recommended Cat Foods\n\nWe recommend **Royal Canin Fit 32** or **Whiskas Kitten Chicken & Milk** (for Persian kittens). Wet options like **Sheba Fine Flakes in Gravy** are also essential to support kidney health.`,
    category: "Cat Care",
    image: "/images/pets/pet-003/1.jpg",
    author: { name: "Dr. Priya Menon", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaMenon", bio: "Veterinary nutritionist with 10+ years of experience in pet dietary science." },
    publishedAt: "2026-06-12T10:00:00Z",
    readTime: "4 min read",
    views: 1150,
    likes: 288,
    relatedSlugs: ["dry-food-vs-wet-food", "how-to-read-pet-food-labels"],
    relatedProductIds: ["13", "9", "10", "11"]
  },
  {
    id: "blog-006",
    title: "10 Foods Dogs Should Never Eat",
    slug: "foods-dogs-never-eat",
    excerpt: "Avoid toxic household items! Read our comprehensive list of dangerous foods that can cause serious illness or poisoning in your canine companion.",
    content: `As pet owners, we love sharing treats with our dogs. However, many human foods that are completely safe for us can be highly toxic or even fatal to dogs. Here are 10 foods you must keep far out of your dog's reach:\n\n## The Danger List\n\n1. **Chocolate**: Contains theobromine, which dogs cannot metabolize. It can cause kidney failure and heart issues.\n2. **Onions & Garlic**: These destroy red blood cells, leading to severe anemia.\n3. **Grapes & Raisins**: Highly toxic; even a small amount can cause acute kidney failure.\n4. **Caffeine**: Causes abnormal heart rates, seizures, and hyperactivity.\n5. **Xylitol (Artificial Sweetener)**: Found in sugar-free gums, it triggers rapid insulin release, causing hypoglycemia and liver failure.\n6. **Avocado**: Contains persin, causing stomach upset and diarrhea.\n7. **Macadamia Nuts**: Extremely toxic, affecting their nervous and muscle systems.\n8. **Alcohol**: Causes coordination loss, breathing difficulties, and coma.\n9. **Yeast Dough**: Expands in the dog's stomach, releasing toxic ethanol.\n10. **Salty Snacks**: Too much salt can lead to sodium ion poisoning.\n\n*If you suspect your dog has eaten any of these, contact your vet immediately.*`,
    category: "Veterinary Tips",
    image: "/images/pets/pet-006/1.jpg",
    author: { name: "Dr. Priya Menon", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaMenon", bio: "Veterinary nutritionist with 10+ years of experience in pet dietary science." },
    publishedAt: "2026-06-08T16:00:00Z",
    readTime: "5 min read",
    views: 3100,
    likes: 742,
    relatedSlugs: ["dog-vaccination-schedule", "weight-management-dogs"],
    relatedProductIds: ["8", "14"]
  },
  {
    id: "blog-007",
    title: "Best Dog Food Brands in India",
    slug: "best-dog-food-brands-india",
    excerpt: "An analysis of the leading pet food brands in the Indian market, evaluating nutrition value, ingredient transparency, and price options.",
    content: `Choosing the right dog food brand is one of the most important decisions you make for your pet. In India, the pet food market has grown significantly, offering everything from economical kibbles to premium grain-free ancestral diets.\n\n## Evaluating the Top Brands\n\n### 1. Royal Canin\n- **Focus**: Breed-specific formulas and veterinary diets.\n- **Best For**: Flat-faced breeds, sensitive stomachs, and size-specific nutrition. [View Product](/shop/6)\n\n### 2. Pedigree\n- **Focus**: Complete, budget-friendly baseline nutrition.\n- **Best For**: Accessible everyday feeding and weaning diets. [View Product](/shop/5)\n\n### 3. Drools Focus\n- **Focus**: Super premium grain-free and no-byproduct diets.\n- **Best For**: High energy levels, muscle growth, and cost-effective premium kibble. [View Product](/shop/7)\n\n### 4. Farmina N&D\n- **Focus**: High-protein, low-glycemic ancestral grains.\n- **Best For**: Natural ingredients, antioxidant support, and premium dogs. [View Product](/shop/12)\n\nChoose the brand that matches your dog's activity level, breed size, and your budget!`,
    category: "Buying Guide",
    image: "/images/pets/pet-008/1.jpg",
    author: { name: "Amit Khanna", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AmitKhanna", bio: "Pet nutrition advocate and founder of Canine Kitchen blog." },
    publishedAt: "2026-06-05T12:00:00Z",
    readTime: "6 min read",
    views: 2450,
    likes: 588,
    relatedSlugs: ["how-to-read-pet-food-labels", "dry-food-vs-wet-food"],
    relatedProductIds: ["6", "5", "7", "12"]
  },
  {
    id: "blog-008",
    title: "Senior Dog Nutrition Guide",
    slug: "senior-dog-nutrition-guide",
    excerpt: "Help your aging dog grow old gracefully! Adapt their diet to support stiff joints, slow metabolisms, and dental constraints.",
    content: `As dogs grow older, their nutritional needs change. They become less active, their metabolism slows down, and they become prone to joint stiffness (arthritis) and cognitive decline. Adapting their diet is crucial for their golden years.\n\n## Dietary Needs of Senior Dogs\n\n- **Reduced Calories**: To prevent obesity, as they burn fewer calories.\n- **Joint Support (Glucosamine & Chondroitin)**: Vital to support joint cartilage and reduce stiffness.\n- **High-Quality Protein**: To prevent muscle wasting, which is common in older dogs.\n- **Fiber**: High fiber content keeps their digestive tract moving smoothly.\n\n## Recommended Senior Products\n\nWe highly suggest serving **Farmina N&D Senior Chicken & pomegranate** or supplementing with **Drools Calcium Tablets** to support bone strength.`,
    category: "Nutrition",
    image: "/images/pets/pet-009/1.jpg",
    author: { name: "Dr. Priya Menon", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaMenon", bio: "Veterinary nutritionist with 10+ years of experience in pet dietary science." },
    publishedAt: "2026-06-01T14:30:00Z",
    readTime: "5 min read",
    views: 890,
    likes: 195,
    relatedSlugs: ["dry-food-vs-wet-food", "weight-management-dogs"],
    relatedProductIds: ["12", "14", "8"]
  },
  {
    id: "blog-009",
    title: "How to Read Pet Food Labels Like a Pro",
    slug: "how-to-read-pet-food-labels",
    excerpt: "Stop falling for marketing gimmicks! Learn how to inspect guaranteed analysis, ingredient lists, and AAFCO statements on pet food packaging.",
    content: `Pet food packaging is filled with terms like 'organic', 'natural', and 'veterinarian recommended'. But how do you know what's actually inside the bag? Reading the ingredients list and guaranteed analysis table is key.\n\n## Look at the First Three Ingredients\n\nIngredients are listed by weight before cooking. Look for real meats (like 'chicken', 'salmon', or 'lamb') as the first ingredient. Avoid brands listing corn, wheat, or mystery meat by-products as the primary source of nutrition.\n\n## The Guaranteed Analysis Table\n\n- **Crude Protein**: Look for at least 24-30% for dogs and 30-35% for cats.\n- **Crude Fat**: Crucial for skin health, ideally between 12-18%.\n- **Crude Fiber**: Supports digestion, usually around 3-5%.\n\n## The AAFCO Statement\n\nLook for a statement stating that the food is 'formulated to meet the nutritional levels established by the AAFCO Dog Food Nutrient Profiles' for 'all life stages' or 'adult maintenance'.`,
    category: "Buying Guide",
    image: "/images/pets/pet-010/1.jpg",
    author: { name: "Amit Khanna", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AmitKhanna", bio: "Pet nutrition advocate and founder of Canine Kitchen blog." },
    publishedAt: "2026-05-28T10:00:00Z",
    readTime: "5 min read",
    views: 1210,
    likes: 310,
    relatedSlugs: ["best-dog-food-brands-india", "dry-food-vs-wet-food"],
    relatedProductIds: ["7", "12", "13"]
  },
  {
    id: "blog-010",
    title: "Indian Spitz: The Ultimate Care Guide",
    slug: "indian-spitz-care-guide",
    excerpt: "Learn how to care for the cheerful and adaptable Indian Spitz, covering grooming tips, exercise requirements, and weather adaptation strategies.",
    content: `The Indian Spitz is one of the most adaptable, cheerful, and loyal dog breeds, uniquely suited to the Indian climate. Often confused with the Pomeranian, the Indian Spitz is larger, more robust, and has a dense white coat that actually protects them from heat.\n\n## Essential Grooming Tips\n\nDespite their thick white coats, the Indian Spitz is surprisingly low-maintenance:\n\n- **Daily Brushing**: Use a slicker brush to remove dead undercoat fur and prevent matting.\n- **Bathing**: Only bathe once every 3-4 weeks. Frequent washing strips natural skin oils.\n- **Dental Care**: Spitz breeds can be prone to tartar buildup. Chews and dry food are vital.\n\n## Nutrition Requirements\n\nSpitz dogs are highly active but can gain weight easily in small apartments. Serve a balanced, moderate-fat kibble like **DoFo All Stage Adult Gold (Small Breed)** or **Royal Canin Mini Adult** to support their active lifestyles.`,
    category: "Breed Guides",
    image: "/images/pets/pet-006/1.jpg",
    author: { name: "Sneha Kapoor", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SnehaKapoor", bio: "Animal welfare advocate and adoption counselor at Happy Paws Foundation." },
    publishedAt: "2026-05-25T11:00:00Z",
    readTime: "6 min read",
    views: 1540,
    likes: 395,
    relatedSlugs: ["grooming-tips-thick-coats", "weight-management-dogs"],
    relatedProductIds: ["3", "6", "14"]
  },
  {
    id: "blog-011",
    title: "Weight Management for Dogs: Steps & Nutrition",
    slug: "weight-management-dogs",
    excerpt: "Help your overweight dog shed extra pounds! Learn how portion controls, low-fat formulas, and exercise routines keep their joints healthy.",
    content: `Obesity is the leading cause of joint pain, diabetes, and heart disease in dogs. In India, breeds like Labradors, Beagles, and Pugs are highly susceptible to overeating and gaining excess weight.\n\n## Steps to Help Your Dog Lose Weight\n\n- **Measure Every Meal**: Use a scale or cup. Never free-feed or guess portions.\n- **Choose a High-Fiber, Low-Fat Formula**: High fiber keeps them feeling full while reducing calorie intake.\n- **Strict Limit on Table Treats**: Human snacks add hundreds of hidden calories. Use healthy low-calorie treats instead, like carrots.\n- **Low-Impact Exercise**: Regular, brisk walks are better than intense runs for overweight dogs to protect their joints.\n\nChoose balanced, premium formulas like **DoFo All Stage Adult Gold (Large Breed)** or **Purina Pro Plan Sensitive Stomach** for controlled diets.`,
    category: "Pet Health",
    image: "/images/pets/pet-005/1.jpg",
    author: { name: "Dr. Priya Menon", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaMenon", bio: "Veterinary nutritionist with 10+ years of experience in pet dietary science." },
    publishedAt: "2026-05-20T16:00:00Z",
    readTime: "5 min read",
    views: 1330,
    likes: 310,
    relatedSlugs: ["senior-dog-nutrition-guide", "foods-dogs-never-eat"],
    relatedProductIds: ["1", "8", "14"]
  },
  {
    id: "blog-012",
    title: "Homemade vs Commercial Pet Food: Finding Balance",
    slug: "homemade-vs-commercial-pet-food",
    excerpt: "An objective comparison between home-cooked pet meals and commercially manufactured premium pet foods, focusing on nutritional balance and safety.",
    content: `Many pet parents in India prefer feeding home-cooked food (like roti, rice, paneer, or boiled chicken) to their pets. While fresh ingredients are excellent, creating a fully balanced diet at home is scientifically challenging.\n\n## Homemade Food: Pros & Cons\n\n- **Pros**: 100% fresh ingredients, no preservatives, complete ingredient transparency.\n- **Cons**: Extremely difficult to balance the correct calcium-to-phosphorus ratio, vitamins, and micro-nutrients. A simple diet of chicken and rice lacks over 20 essential minerals, leading to bone deficiencies over time.\n\n## Commercial Food: Pros & Cons\n\n- **Pros**: Formulated by veterinary nutritionists to meet AAFCO standards. Fully balanced, convenient, and easy to measure.\n- **Cons**: Highly processed, includes preservatives, and quality varies widely between budget brands.\n\n## The Balanced Approach\n\nUse commercial kibble (like **DoFo All Stage Adult Gold** or **Drools Focus**) as the primary foundation (70% of their diet) to guarantee they receive all vitamins and minerals, and supplement it with home-cooked boiled chicken, pumpkin, or yogurt (30% of their diet) as a fresh topper!`,
    category: "Nutrition",
    image: "/images/pets/pet-002/1.jpg",
    author: { name: "Dr. Priya Menon", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaMenon", bio: "Veterinary nutritionist with 10+ years of experience in pet dietary science." },
    publishedAt: "2026-05-15T09:30:00Z",
    readTime: "6 min read",
    views: 1720,
    likes: 420,
    relatedSlugs: ["dry-food-vs-wet-food", "how-to-read-pet-food-labels"],
    relatedProductIds: ["1", "7", "3", "14"]
  }
];
