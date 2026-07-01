"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, PawPrint, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { getAllBreeds, getAllCities } from "@/lib/api/pets";

const Hero = () => {
  const router = useRouter();

  // Autocomplete states
  const [cities, setCities] = useState<string[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("");

  // Dropdown visibility
  const [activeDropdown, setActiveDropdown] = useState<"city" | "species" | "breed" | null>(null);

  // Suggestions lists
  const [citySearch, setCitySearch] = useState("");
  const [breedSearch, setBreedSearch] = useState("");

  useEffect(() => {
    setCities(getAllCities());
    setBreeds(getAllBreeds());
  }, []);

  const filteredCities = cities.filter((c) =>
    c.toLowerCase().includes(citySearch.toLowerCase())
  );

  const filteredBreeds = breeds.filter((b) =>
    b.toLowerCase().includes(breedSearch.toLowerCase())
  );

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedCity) params.set("city", selectedCity);
    if (selectedSpecies) params.set("species", selectedSpecies.toLowerCase());
    if (selectedBreed) params.set("breed", selectedBreed);
    
    router.push(`/pets?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-radial py-12">
      {/* Abstract background shapes */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-coral/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (Text & Search) */}
          <div className="lg:col-span-7 z-20">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-white/40 rounded-full px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm mb-6"
            >
              <PawPrint className="w-4 h-4 text-coral" />
              <span>Trusted by 10,000+ pet lovers</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.1] tracking-tight"
            >
              Find Your <br />
              <span className="text-gradient">Perfect Companion</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-slate-600 max-w-lg mt-6 leading-relaxed"
            >
              Discover loving pets near you. From playful pups to cuddly kittens — your new best friend is just a click away.
            </motion.p>

            {/* Premium Autocomplete Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 bg-white/95 backdrop-blur-xl border border-white/60 shadow-premium rounded-3xl p-3 md:rounded-full md:p-2 flex flex-col md:flex-row items-center gap-2 relative"
            >
              {/* Location Input */}
              <div className="relative flex-1 w-full">
                <div
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-2xl hover:bg-slate-50"
                  onClick={() => setActiveDropdown(activeDropdown === "city" ? null : "city")}
                >
                  <MapPin className="w-5 h-5 text-coral shrink-0" />
                  <div className="flex flex-col items-start text-left">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Location</span>
                    <span className="text-sm font-semibold text-slate-700">
                      {selectedCity || "Select City"}
                    </span>
                  </div>
                </div>

                <AnimatePresence>
                  {activeDropdown === "city" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-3 w-64 bg-white rounded-2xl shadow-premium border border-slate-100 p-3 space-y-2 z-30"
                    >
                      <input
                        type="text"
                        placeholder="Search city..."
                        value={citySearch}
                        onChange={(e) => setCitySearch(e.target.value)}
                        className="w-full text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-coral"
                      />
                      <div className="max-h-40 overflow-y-auto space-y-1 scrollbar-hide">
                        <button
                          onClick={() => {
                            setSelectedCity("");
                            setActiveDropdown(null);
                          }}
                          className="w-full text-left text-xs px-2.5 py-1.5 hover:bg-slate-50 rounded-lg text-slate-500 font-medium"
                        >
                          All Locations
                        </button>
                        {filteredCities.map((city) => (
                          <button
                            key={city}
                            onClick={() => {
                              setSelectedCity(city);
                              setActiveDropdown(null);
                            }}
                            className="w-full text-left text-xs px-2.5 py-1.5 hover:bg-coral-light hover:text-coral rounded-lg font-semibold text-slate-700"
                          >
                            {city}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="hidden md:block w-px h-8 bg-slate-200" />

              {/* Species Input */}
              <div className="relative flex-1 w-full">
                <div
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-2xl hover:bg-slate-50"
                  onClick={() => setActiveDropdown(activeDropdown === "species" ? null : "species")}
                >
                  <PawPrint className="w-5 h-5 text-coral shrink-0" />
                  <div className="flex flex-col items-start text-left">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pet Type</span>
                    <span className="text-sm font-semibold text-slate-700">
                      {selectedSpecies || "All Pets"}
                    </span>
                  </div>
                </div>

                <AnimatePresence>
                  {activeDropdown === "species" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-3 w-48 bg-white rounded-2xl shadow-premium border border-slate-100 p-2 z-30 space-y-1"
                    >
                      {["All Pets", "Dog", "Cat"].map((sp) => (
                        <button
                          key={sp}
                          onClick={() => {
                            setSelectedSpecies(sp === "All Pets" ? "" : sp);
                            setActiveDropdown(null);
                          }}
                          className="w-full text-left text-xs px-3 py-2 hover:bg-coral-light hover:text-coral rounded-lg font-semibold text-slate-700"
                        >
                          {sp}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="hidden md:block w-px h-8 bg-slate-200" />

              {/* Breed Input */}
              <div className="relative flex-1 w-full">
                <div
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-2xl hover:bg-slate-50"
                  onClick={() => setActiveDropdown(activeDropdown === "breed" ? null : "breed")}
                >
                  <Search className="w-5 h-5 text-coral shrink-0" />
                  <div className="flex flex-col items-start text-left">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Breed</span>
                    <span className="text-sm font-semibold text-slate-700 truncate max-w-[120px]">
                      {selectedBreed || "Any Breed"}
                    </span>
                  </div>
                </div>

                <AnimatePresence>
                  {activeDropdown === "breed" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-3 w-64 bg-white rounded-2xl shadow-premium border border-slate-100 p-3 space-y-2 z-30"
                    >
                      <input
                        type="text"
                        placeholder="Search breed..."
                        value={breedSearch}
                        onChange={(e) => setBreedSearch(e.target.value)}
                        className="w-full text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-coral"
                      />
                      <div className="max-h-40 overflow-y-auto space-y-1 scrollbar-hide">
                        <button
                          onClick={() => {
                            setSelectedBreed("");
                            setActiveDropdown(null);
                          }}
                          className="w-full text-left text-xs px-2.5 py-1.5 hover:bg-slate-50 rounded-lg text-slate-500 font-medium"
                        >
                          Any Breed
                        </button>
                        {filteredBreeds.map((breed) => (
                          <button
                            key={breed}
                            onClick={() => {
                              setSelectedBreed(breed);
                              setActiveDropdown(null);
                            }}
                            className="w-full text-left text-xs px-2.5 py-1.5 hover:bg-coral-light hover:text-coral rounded-lg font-semibold text-slate-700"
                          >
                            {breed}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Search button */}
              <button
                onClick={handleSearch}
                className="w-full md:w-auto bg-gradient-to-r from-coral to-emerald text-white font-semibold px-8 py-3.5 rounded-2xl md:rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Search <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex gap-8 mt-8"
            >
              <div>
                <p className="text-2xl font-bold text-slate-900">10k+</p>
                <p className="text-sm text-slate-500">Happy pets</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">500+</p>
                <p className="text-sm text-slate-500">Breeders</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">98%</p>
                <p className="text-sm text-slate-500">Satisfaction</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column (Cute Dog Image Container) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            {/* Round container with overflow-hidden and scaled-up image to crop thin black borders */}
            <div className="relative w-full max-w-[380px] aspect-square rounded-[3rem] overflow-hidden shadow-premium-lg border-8 border-white bg-[#FBE7A1] group">
              <motion.img
                src="/images/cute_dog.png"
                alt="Cute Cartoon Dog"
                className="w-full h-full object-cover scale-[1.08] group-hover:scale-[1.12] transition-transform duration-500"
                animate={{
                  y: [0, -8, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut"
                }}
              />
              
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-sm text-xs font-bold text-slate-800 border border-slate-100">
                🐾 Mascot: DoFo Puppy
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
