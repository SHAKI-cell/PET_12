export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: "nutrition" | "adoption" | "care" | "news";
  image: string;
  author: { name: string; avatar: string; bio: string };
  publishedAt: string;
  readTime: string;
  relatedSlugs: string[];
}

export const blogArticles: BlogArticle[] = [
  {
    id: "blog-001",
    title: "MeWow Cat Food – Delicious, Nutritious & Affordable",
    slug: "mewow-cat-food",
    excerpt: "At MeWow, we believe that your cat deserves food that's not just tasty but also packed with real nutrition. Whether you've got a playful kitten or a chill adult cat...",
    content: `At MeWow, we believe that your cat deserves food that's not just tasty but also packed with real nutrition. Whether you've got a playful kitten or a chill adult cat, finding the right food is key to their happiness and health.\n\n## Why MeWow?\n\nOur cat food is made with real chicken as the first ingredient, combined with essential vitamins and minerals. We avoid artificial preservatives, colors, and flavors — because your cat deserves better.\n\n## Key Benefits\n\n- **High Protein**: 32% protein from real chicken\n- **Omega-3 & 6**: For a shiny, healthy coat\n- **Taurine Enriched**: Essential for heart and eye health\n- **No Fillers**: No corn, wheat, or soy\n\n## Available Variants\n\n1. Kitten Formula (2-12 months)\n2. Adult Indoor (1-7 years)\n3. Senior Care (7+ years)\n\nTry MeWow today and see the difference in your cat's energy, coat, and overall well-being!`,
    category: "nutrition",
    image: "/images/cat_food.png",
    author: { name: "Dr. Priya Menon", avatar: "", bio: "Veterinary nutritionist with 10+ years of experience in pet dietary science." },
    publishedAt: "2026-06-20T09:00:00Z",
    readTime: "4 min read",
    relatedSlugs: ["real-chicken-vegetables", "puppy-nutrition-guide"],
  },
  {
    id: "blog-002",
    title: "Why Real Chicken and Vegetables Are Great for Your Dog",
    slug: "real-chicken-vegetables",
    excerpt: "When it comes to keeping your dog happy and healthy, nothing beats real, natural food. At the heart of a nutritious dog diet are two power-packed categories...",
    content: `When it comes to keeping your dog happy and healthy, nothing beats real, natural food. At the heart of a nutritious dog diet are two power-packed categories: high-quality protein and fresh vegetables.\n\n## The Power of Real Chicken\n\nChicken is one of the most digestible proteins for dogs. It provides:\n\n- Essential amino acids for muscle growth\n- B vitamins for energy metabolism\n- Selenium for thyroid function\n- Phosphorus for strong bones\n\n## Why Vegetables Matter\n\nFresh vegetables add fiber, antioxidants, and micronutrients that processed foods often lack:\n\n- **Carrots**: Beta-carotene for eye health\n- **Sweet Potato**: Complex carbs for sustained energy\n- **Spinach**: Iron and calcium for bone health\n- **Peas**: Plant-based protein boost\n\n## How DoFo Uses These Ingredients\n\nEvery DoFo recipe starts with real chicken (minimum 28%) and includes a carefully selected blend of vegetables. No by-products, no mystery ingredients — just real food for real dogs.`,
    category: "nutrition",
    image: "/images/chicken_veg.png",
    author: { name: "Amit Khanna", avatar: "", bio: "Pet nutrition advocate and founder of Canine Kitchen blog." },
    publishedAt: "2026-06-15T14:00:00Z",
    readTime: "5 min read",
    relatedSlugs: ["mewow-cat-food", "first-time-pet-owner-guide"],
  },
  {
    id: "blog-003",
    title: "Woof... woof! Our Grand Launch Is Here!",
    slug: "grand-launch",
    excerpt: "We are thrilled to announce the launch of DoFo, marking a significant milestone in our commitment to provide pets with the love, care, and attention.",
    content: `We are thrilled to announce the launch of DoFo, marking a significant milestone in our commitment to provide pets with the love, care, and attention they deserve.\n\n## What Is DoFo?\n\nDoFo is more than just a pet food brand — it's a complete pet ecosystem. We're building a platform where:\n\n1. **Pet lovers can adopt** verified, healthy pets from trusted shelters and breeders\n2. **Premium nutrition** is accessible to every pet parent\n3. **Community connections** help pet owners support each other\n\n## Our Promise\n\n- Every pet listed on DoFo is verified\n- Every product uses real, traceable ingredients\n- Every interaction is designed with love\n\n## Launch Offers\n\n🎉 **20% off** on all DoFo products for the first month\n🐾 **Free vet consultation** for the first 100 adoptions\n📦 **Free delivery** on orders above Rs. 999\n\nJoin us in this journey to make every pet's life better. Welcome to the DoFo family! 🐕`,
    category: "news",
    image: "/images/grand_launch.png",
    author: { name: "DoFo Team", avatar: "", bio: "The passionate team behind DoFo — building a better world for pets." },
    publishedAt: "2026-06-01T10:00:00Z",
    readTime: "3 min read",
    relatedSlugs: ["mewow-cat-food", "real-chicken-vegetables"],
  },
  {
    id: "blog-004",
    title: "The Complete Puppy Nutrition Guide: What to Feed & When",
    slug: "puppy-nutrition-guide",
    excerpt: "Bringing home a new puppy? Here's everything you need to know about feeding your growing furball the right nutrition at the right time.",
    content: `Bringing home a new puppy is exciting! But with so many food options available, it's easy to feel overwhelmed. This guide breaks down puppy nutrition into simple, actionable steps.\n\n## Feeding Schedule by Age\n\n- **6-12 weeks**: 4 meals per day (small portions)\n- **3-6 months**: 3 meals per day\n- **6-12 months**: 2 meals per day\n- **12+ months**: 2 meals per day (adult food)\n\n## Key Nutrients for Puppies\n\n1. **Protein (28-32%)**: For muscle and tissue development\n2. **Fat (15-20%)**: For energy and brain development\n3. **DHA**: For cognitive development\n4. **Calcium & Phosphorus**: For bone growth\n\n## Common Mistakes to Avoid\n\n- Don't overfeed — obesity in puppies causes joint issues\n- Don't give adult dog food to puppies\n- Avoid table scraps, especially onions, garlic, chocolate, and grapes\n- Don't switch foods suddenly — transition over 7-10 days\n\nDoFo Puppy Gold and Puppy Starter are specifically formulated to meet all these nutritional needs.`,
    category: "care",
    image: "/images/dofo_puppy_gold.png",
    author: { name: "Dr. Priya Menon", avatar: "", bio: "Veterinary nutritionist with 10+ years of experience in pet dietary science." },
    publishedAt: "2026-06-10T11:00:00Z",
    readTime: "6 min read",
    relatedSlugs: ["real-chicken-vegetables", "first-time-pet-owner-guide"],
  },
  {
    id: "blog-005",
    title: "First-Time Pet Owner? Here's Your Complete Checklist",
    slug: "first-time-pet-owner-guide",
    excerpt: "Getting a pet for the first time? Don't panic! This comprehensive checklist covers everything from supplies to vet visits to help you prepare.",
    content: `Congratulations on deciding to become a pet parent! Whether you're adopting a dog or a cat, preparation is key to a smooth transition.\n\n## Before Bringing Your Pet Home\n\n### Essential Supplies\n- [ ] Food and water bowls (stainless steel preferred)\n- [ ] Age-appropriate food (puppy/kitten or adult)\n- [ ] Collar with ID tag\n- [ ] Leash (for dogs)\n- [ ] Bed or crate\n- [ ] Toys (chew toys, interactive toys)\n- [ ] Grooming supplies (brush, nail clipper)\n- [ ] Poop bags / litter box\n\n### Home Preparation\n- [ ] Pet-proof your home (secure cables, remove toxic plants)\n- [ ] Designate a quiet space for your pet\n- [ ] Find a nearby vet and schedule a first visit\n\n## The First Week\n\n1. **Day 1-2**: Let them explore at their own pace\n2. **Day 3-4**: Establish a routine (feeding times, walks)\n3. **Day 5-7**: Start basic training (sit, stay, name recognition)\n\n## When to See the Vet\n\n- Within the first week of adoption\n- For vaccination schedule\n- If you notice any unusual behavior or symptoms\n\nDoFo's adoption process includes a free first vet consultation for every adopted pet!`,
    category: "adoption",
    image: "/images/grand_launch.png",
    author: { name: "Sneha Kapoor", avatar: "", bio: "Animal welfare advocate and adoption counselor at Happy Paws Foundation." },
    publishedAt: "2026-06-05T08:30:00Z",
    readTime: "7 min read",
    relatedSlugs: ["puppy-nutrition-guide", "grand-launch"],
  },
  {
    id: "blog-006",
    title: "5 Signs Your Dog Is Happy and Healthy",
    slug: "happy-healthy-dog-signs",
    excerpt: "How do you know if your dog is truly thriving? Look for these five key indicators of a happy, healthy pup.",
    content: `Every dog parent wants their furry friend to be happy and healthy. But dogs can't tell us how they feel in words. Here are 5 reliable signs to watch for:\n\n## 1. Bright, Clear Eyes\n\nHealthy dogs have bright, clear eyes without excessive discharge. Cloudy eyes or persistent tearing may indicate health issues.\n\n## 2. Shiny Coat\n\nA glossy, smooth coat is one of the best indicators of good nutrition and overall health. Dry, flaky skin or excessive shedding might signal dietary deficiencies.\n\n## 3. Consistent Energy Levels\n\nA healthy dog has a consistent energy level appropriate for their age and breed. Sudden lethargy or hyperactivity can be warning signs.\n\n## 4. Healthy Appetite\n\nYour dog should be enthusiastic about meals without being obsessive. Loss of appetite or sudden overeating needs attention.\n\n## 5. Relaxed Body Language\n\nA happy dog shows:\n- Relaxed ears (not pinned back)\n- Loose, wiggly body\n- Soft, squinty eyes\n- Play bows\n- Tail at mid-height, wagging broadly\n\n## How Nutrition Plays a Role\n\nMany of these health indicators are directly linked to diet. Quality ingredients like those in DoFo products support coat health, energy levels, and overall well-being.`,
    category: "care",
    image: "/images/cute_dog.png",
    author: { name: "Amit Khanna", avatar: "", bio: "Pet nutrition advocate and founder of Canine Kitchen blog." },
    publishedAt: "2026-05-28T16:00:00Z",
    readTime: "4 min read",
    relatedSlugs: ["puppy-nutrition-guide", "mewow-cat-food"],
  },
];
