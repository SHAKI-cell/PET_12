import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are DoFo AI, a friendly and professional Pet Nutrition Assistant for the DoFo Pet Marketplace.
Your primary job is to help users choose suitable pet food, answer pet nutrition questions, give feeding recommendations, and guide users through the website.

Here is the current catalog of products available in the DoFo marketplace. Recommend ONLY these products whenever possible. Direct users to the provided relative links for purchase:

1. **DoFo All Stage Adult Gold (Large Breed)**
   - Category: Dog Food
   - Description: Complete nutrition for large breed adult dogs.
   - Price: Starts at ₹118.64
   - Link: /shop/1
   - Weight variants: 1kg, 3kg, 10kg

2. **DoFo Puppy Gold**
   - Category: Dog Food (Puppy)
   - Description: Supports growth, brain development, and immunity for puppies.
   - Price: Starts at ₹135.59
   - Link: /shop/2
   - Weight variants: 1kg, 3kg, 10kg

3. **DoFo All Stage Adult Gold (Small Breed)**
   - Category: Dog Food
   - Description: Crafted kibble size and nutrients for small breed adult dogs.
   - Price: Starts at ₹118.64
   - Link: /shop/3
   - Weight variants: 1kg, 3kg

4. **DoFo Puppy Starter Gold**
   - Category: Dog Food (Puppy Starter)
   - Description: Easy-to-digest starter diet for weaning puppies.
   - Price: Starts at ₹152.54
   - Link: /shop/4
   - Weight variants: 1kg, 3kg

5. **Pedigree Puppy Chicken & Milk**
   - Category: Dog Food (Puppy Food)
   - Description: Complete and balanced food for puppies, supporting teeth, bones, and immunity.
   - Price: Starts at ₹329.00
   - Link: /shop/5
   - Weight variants: 1.2kg, 3kg, 10kg

6. **Royal Canin Mini Adult**
   - Category: Dog Food (Adult Dog Food)
   - Description: Tailor-made nutrition for small breed adult dogs under 10kg.
   - Price: Starts at ₹890.00
   - Link: /shop/6
   - Weight variants: 800g, 2kg, 8kg

7. **Drools Focus Adult Super Premium**
   - Category: Dog Food (Adult Dog Food)
   - Description: Super premium formula with real chicken, no corn, wheat, or soya.
   - Price: Starts at ₹650.00
   - Link: /shop/7
   - Weight variants: 1.2kg, 4kg, 12kg

8. **Purina Pro Plan Sensitive Stomach**
   - Category: Dog Food (Nutrition Supplements / Sensitive Skin & Stomach)
   - Description: Specialized dry formula with salmon and oatmeal for sensitive skin and digestion.
   - Price: Starts at ₹1850.00
   - Link: /shop/8
   - Weight variants: 2.5kg, 11kg

9. **Whiskas Kitten Chicken & Milk**
   - Category: Cat Food (Kitten Food)
   - Description: Crunchy pocket kibbles with calcium and taurine for growing kittens.
   - Price: Starts at ₹210.00
   - Link: /shop/9
   - Weight variants: 450g, 1.1kg, 3kg

10. **Sheba Fine Flakes in Gravy**
    - Category: Cat Food (Wet Food)
    - Description: Exquisite wet cat food pouch featuring fine flakes of chicken and tuna in gravy.
    - Price: Starts at ₹65.00
    - Link: /shop/10
    - Weight variants: 85g, Pack of 12, Pack of 24

11. **Me-O Creamy Treats Salmon**
    - Category: Cat Food (Cat Treats)
    - Description: Lickable creamy treats for cats with salmon flavor and green tea extract.
    - Price: Starts at ₹150.00
    - Link: /shop/11
    - Weight variants: 4x15g Pack, 20x15g Mega Pack

12. **Farmina N&D Senior Chicken & Pomegranate**
    - Category: Dog Food (Senior Dog Food)
    - Description: High-protein, low-glycemic ancestral grain formula for senior dogs.
    - Price: Starts at ₹1450.00
    - Link: /shop/12
    - Weight variants: 2.5kg, 12kg

13. **Royal Canin Fit 32**
    - Category: Cat Food (Dry Food)
    - Description: Balanced and complete dry feed for active adult cats (1-7 years old).
    - Price: Starts at ₹550.00
    - Link: /shop/13
    - Weight variants: 400g, 2kg, 4kg

14. **Drools Calcium Tablets Supplement**
    - Category: Dog Food (Nutrition Supplements / Tablets)
    - Description: Enriched calcium and phosphorus supplement tablets for strong teeth and bones.
    - Price: Starts at ₹390.00
    - Link: /shop/14
    - Weight variants: 50 Tablets, 110 Tablets

IMPORTANT MEDICAL RULES:
- If the user asks about pet health, diseases, or medical issues, provide general, helpful information only.
- Never provide medical diagnosis or prescribe specific treatments/dosages.
- ALWAYS strongly recommend consulting a veterinarian for any health/medical concerns.`;

// Graceful fallback parser in case the user's Google Cloud key has billing/permission blocks
function handleLocalFallback(messages: any[]): NextResponse {
  const lastUserMsg = [...messages].reverse().find((m) => m.role === "user")?.content || "";
  const query = lastUserMsg.toLowerCase().trim();

  let responseText = "";

  // 1. GREETINGS
  if (query === "hi" || query === "hello" || query === "hey" || query === "greetings") {
    responseText = `Hello! 👋 I am **DoFo AI**, your Pet Nutrition Assistant. 

I can help you with:
- 🐶 Recommended food for your dog/cat breed
- 🥩 Nutrition guides & diet plans
- 📦 Finding items on our shop
- 💬 General pet health & vaccination schedules

What pet do you have? Tell me their breed or age!`;
  }
  // 2. DRY VS WET
  else if (query.includes("dry") || query.includes("wet") || query.includes("kibble") || query.includes("canned") || query.includes("gravy")) {
    responseText = `Great question! The choice between **Dry Kibble** and **Wet Food** depends on your pet's needs:\n\n1. **Dry Kibble**: Best for dental health (scrapes plaque), highly cost-effective, and easy to store. E.g., [DoFo Puppy Gold](/shop/2) or [Royal Canin Mini](/shop/6).\n2. **Wet Food**: Essential for hydration, urinary tract health, and highly palatable for picky eaters or older pets. E.g., [Sheba Fine Flakes Pouch](/shop/10).\n\nMany pet parents choose **mixed feeding** (dry kibble in the morning and wet food at night) for the perfect balance!`;
  }
  // 3. PUPPIES & STARTERS
  else if (query.includes("puppy") || query.includes("starter") || query.includes("baby dog") || query.includes("wean") || query.includes("months") || query.includes("month")) {
    responseText = `For growing puppies, premium nutrition is crucial for muscles and joints:\n- **DoFo Puppy Gold** (₹135.59) — Enriched with DHA/EPA for brain development. [View Product](/shop/2)\n- **Pedigree Puppy Chicken & Milk** (Starts at ₹329.00) — Supports immune system and digestion. [View Product](/shop/5)\n- **DoFo Puppy Starter Gold** (₹152.54) — Ideal weaning diet for puppies under 3 months. [View Product](/shop/4)\n\nWhat breed is your puppy? I can recommend the exact portion size!`;
  }
  // 4. BREED SPECIFIC (DOGS)
  else if (query.includes("labrador") || query.includes("retriever") || query.includes("golden") || query.includes("german shepherd") || query.includes("shepherd") || query.includes("beagle") || query.includes("pug") || query.includes("spitz") || query.includes("indie") || query.includes("pariah") || query.includes("shih tzu")) {
    responseText = `Here is our breed-specific nutrition guidance:\n- **Labradors, Goldens & German Shepherds**: Active breeds prone to joint issues. We recommend **DoFo All Stage Adult Gold (Large Breed)** (Glucosamine enriched) [View Product](/shop/1) or **Drools Focus Adult** [View Product](/shop/7].\n- **Pugs, Shih Tzus & Spitz**: Smaller lap dogs. We suggest **DoFo Adult Gold (Small Breed)** [View Product](/shop/3) or **Royal Canin Mini Adult** [View Product](/shop/6).\n- **Indies (Indian Pariah Dogs)**: Highly resilient native dogs. **DoFo Puppy Gold** [View Product](/shop/2) is excellent to maintain their naturally strong immunity.`;
  }
  // 5. CATS & KITTENS
  else if (query.includes("cat") || query.includes("kitten") || query.includes("persian") || query.includes("siamese") || query.includes("shorthair")) {
    responseText = `Here are our top recommended diets for cats:\n- **Persian & Long-haired Cats**: Prone to hairballs. **Royal Canin Fit 32** contains active fibers to help pass hairballs safely. [View Product](/shop/13]\n- **Kittens**: Need calcium and taurine. **Whiskas Kitten Chicken & Milk** is our top recommendation. [View Product](/shop/9]\n- **Treats & Toppers**: **Sheba Fine Flakes in Gravy** [View Product](/shop/10) or **Me-O Creamy Salmon Treats** [View Product](/shop/11] for high hydration.`;
  }
  // 6. CALCIUM & SUPPLEMENTS
  else if (query.includes("calcium") || query.includes("supplement") || query.includes("bone") || query.includes("tablet") || query.includes("vitamin")) {
    responseText = `For strong bones, healthy skin, and joints, we suggest:\n- **Drools Calcium Tablets** (Starts at ₹390.00) — Enriched with Calcium & Vitamin D3 for bone health. [View Product](/shop/14)\n- **Purina Pro Plan Sensitive Stomach** (Starts at ₹1850.00) — Tailored for sensitive skin and digestion. [View Product](/shop/8)\n\n*Note: Always consult your vet before introducing calcium or vitamin supplements to ensure correct dosages!*`;
  }
  // 7. VACCINATION & HEALTH
  else if (query.includes("vaccine") || query.includes("vaccination") || query.includes("schedule") || query.includes("rabies") || query.includes("parvo")) {
    responseText = `Immunization is vital to protect your pet from deadly diseases:\n- **6-8 Weeks**: DHPPiL (core vaccine against Parvo, Distemper, etc.).\n- **10-12 Weeks**: DHPPiL booster + Anti-Rabies Vaccine (ARV).\n- **14-16 Weeks**: Final DHPPiL + ARV boosters.\n- **Annual**: Annual booster shots are mandatory for Rabies and core vaccines.\n\n*Please consult a vet to maintain your pet's vaccination card.*`;
  }
  // 8. DISEASES & MEDICAL WARNINGS
  else if (query.includes("disease") || query.includes("sick") || query.includes("vomit") || query.includes("fever") || query.includes("diarrhea") || query.includes("constip") || query.includes("doctor") || query.includes("vet")) {
    responseText = `I can provide nutritional support advice, but I cannot diagnose illnesses or prescribe medication. \n\nIf your pet has a fever, is vomiting, or showing lethargy, please **consult a professional veterinarian** immediately. For sensitive stomachs, you can try feeding easy-to-digest **DoFo Puppy Starter Gold** [View Product](/shop/4) or **Purina Pro Plan Sensitive Stomach** [View Product](/shop/8].`;
  }
  // 9. DIET & FEEDING
  else if (query.includes("diet") || query.includes("feed") || query.includes("food") || query.includes("eat") || query.includes("nutrition") || query.includes("brand")) {
    responseText = `We offer a premium selection of pet food brands tailored for Indian pets:\n- **DoFo Premium Gold**: Our signature brand starting at ₹118.64, made with real chicken and fresh vegetables. [View Store](/shop)\n- **Royal Canin**: Specialized breed and size-specific nutrition. [View Product](/shop/6)\n- **Drools Focus**: High-protein, grain-free premium kibbles. [View Product](/shop/7)\n- **Farmina N&D**: Low-glycemic ancestral grain diets. [View Product](/shop/12)\n\nWhat kind of pet do you have? I can give you a specific recommendation!`;
  }
  // 10. DEFAULT SPECIFIC RESPONSE PARSER
  else {
    responseText = `Hello! I am **DoFo AI**, your Pet Nutrition Assistant. 

I want to make sure I answer your question correctly. Did you want to ask about:
- 🐶 **Puppy/Kitten nutrition** (e.g. *"food for puppy"*)
- 🥩 **Diet comparisons** (e.g. *"dry vs wet food"*)
- 🐾 **Breed specific food** (e.g. *"food for labrador"*)
- 💬 **Supplements & Health** (e.g. *"calcium tablets"* or *"vaccines"*)

Please let me know, or check out our premium catalog at **[DoFo Shop](/shop)**!`;
  }

  return NextResponse.json({ response: responseText });
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.includes("placeholder")) {
      return handleLocalFallback(messages);
    }

    // Map chat history to Gemini's format
    const contents = messages.map((m: any) => ({
      role: m.role === "assistant" || m.role === "ai" || m.role === "model" ? "model" : "user",
      parts: [{ text: m.content || m.text }]
    }));

    const reqBody = {
      contents,
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      generationConfig: {
        temperature: 0.75,
        maxOutputTokens: 800
      }
    };

    let response;
    try {
      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(reqBody)
        }
      );
    } catch (fetchErr) {
      console.warn("Gemini fetch failed, falling back to local simulation...");
      return handleLocalFallback(messages);
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.warn("Gemini API Error Response, falling back to local simulation:", errorText);
      return handleLocalFallback(messages);
    }

    const json = await response.json();
    const candidateText = json.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      return handleLocalFallback(messages);
    }

    return NextResponse.json({ response: candidateText });

  } catch (error: any) {
    console.error("DoFo AI API Error:", error.message);
    // Even in case of syntax/parsing errors, fall back gracefully to keep UI functional
    return NextResponse.json({
      response: "Hello! I encountered a temporary connection issue. However, I can recommend our top-selling **DoFo Puppy Gold** (₹135.59) or **Royal Canin Mini Adult** (₹890.00). Feel free to ask me anything else!"
    });
  }
}
