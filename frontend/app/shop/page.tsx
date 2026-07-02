"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ArrowUpDown, X, Star, Check } from "lucide-react";
import { getProducts, getAllBrands, getAllCategories, getAllWeights, type ProductFilters } from "@/lib/api/products";
import type { Product } from "@/lib/data";
import ProductCard from "@/components/home/ProductCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const PetTypes = [
  { value: "All", label: "All Pets" },
  { value: "Dog", label: "🐕 Dogs" },
  { value: "Cat", label: "🐱 Cats" }
];

const SortOptions = [
  { value: "newest", label: "Newest Arrivals" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "best-selling", label: "Best Selling" },
  { value: "highest-rated", label: "Highest Rated" }
];

export default function ShopPage() {
  // Filters State
  const [search, setSearch] = useState("");
  const [petType, setPetType] = useState<"Dog" | "Cat" | "All">("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [priceRange, setPriceRange] = useState<number>(8000);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [selectedWeight, setSelectedWeight] = useState("All");
  const [availability, setAvailability] = useState<"in-stock" | "out-of-stock" | "all">("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  // UI State
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Dynamic filter values from API/Data
  const brandsList = useMemo(() => ["All", ...getAllBrands()], []);
  const categoriesList = useMemo(() => ["All", ...getAllCategories()], []);
  const weightsList = useMemo(() => ["All", ...getAllWeights()], []);

  // Fetch products based on filters
  useEffect(() => {
    async function fetchFilteredProducts() {
      setLoading(true);
      const filters: ProductFilters = {
        petType,
        category: selectedCategory === "All" ? undefined : selectedCategory,
        brand: selectedBrand === "All" ? undefined : selectedBrand,
        maxPrice: priceRange,
        rating: selectedRating === 0 ? undefined : selectedRating,
        weight: selectedWeight === "All" ? undefined : selectedWeight,
        availability,
        search: search || undefined,
        sortBy: sortBy as any
      };
      const data = await getProducts(filters);
      setProducts(data);
      setLoading(false);
    }

    const timer = setTimeout(() => {
      fetchFilteredProducts();
    }, 250);

    return () => clearTimeout(timer);
  }, [search, petType, selectedCategory, selectedBrand, priceRange, selectedRating, selectedWeight, availability, sortBy]);

  // Clear all filters
  const handleClearFilters = () => {
    setSearch("");
    setPetType("All");
    setSelectedCategory("All");
    setSelectedBrand("All");
    setPriceRange(8000);
    setSelectedRating(0);
    setSelectedWeight("All");
    setAvailability("all");
    setSortBy("newest");
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (search) count++;
    if (petType !== "All") count++;
    if (selectedCategory !== "All") count++;
    if (selectedBrand !== "All") count++;
    if (priceRange < 8000) count++;
    if (selectedRating > 0) count++;
    if (selectedWeight !== "All") count++;
    if (availability !== "all") count++;
    return count;
  }, [search, petType, selectedCategory, selectedBrand, priceRange, selectedRating, selectedWeight, availability]);

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center md:text-left mb-10">
          <span className="text-sm font-semibold text-coral uppercase tracking-wider">Premium Nutrition</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-1">Pet Food Marketplace</h1>
          <p className="text-slate-500 mt-2 max-w-xl">
            Explore our curated selection of premium nutrition, dry food, wet food, treats, and supplements for your pets.
          </p>
        </div>

        {/* Top Controls: Search and Mobile Filter Toggle */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search brand, product name, category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11 bg-white rounded-2xl border-slate-200/80 shadow-sm focus:border-coral focus:ring-coral"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <Button
              variant="outline"
              onClick={() => setIsMobileFiltersOpen(true)}
              className="md:hidden flex items-center gap-2 rounded-2xl border-slate-200/80 h-11 shadow-sm px-4 bg-white"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </Button>

            <div className="relative flex items-center gap-2 bg-white px-3 py-2 rounded-2xl border border-slate-200/80 shadow-sm h-11">
              <ArrowUpDown className="w-4 h-4 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-sm font-semibold text-slate-700 focus:outline-none pr-6 cursor-pointer"
              >
                {SortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Core Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filters (Sticky Sidebar) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm space-y-6 max-h-[80vh] overflow-y-auto scrollbar-hide">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="font-serif text-lg font-bold text-slate-900">Filters</h2>
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs font-semibold text-coral hover:underline"
                >
                  Clear All ({activeFiltersCount})
                </button>
              )}
            </div>

            {/* Pet Type Filters (Pills) */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Pet Type</h3>
              <div className="flex flex-wrap gap-2">
                {PetTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setPetType(type.value as any)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                      petType === type.value
                        ? "bg-coral border-coral text-white shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Category</h3>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-coral"
              >
                {categoriesList.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand Filter */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Brand</h3>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-coral"
              >
                {brandsList.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Weight Variant Filter */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Weight Variant</h3>
              <select
                value={selectedWeight}
                onChange={(e) => setSelectedWeight(e.target.value)}
                className="w-full text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-coral"
              >
                {weightsList.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold uppercase tracking-wider text-slate-400">Max Price</span>
                <span className="font-bold text-coral">₹{priceRange}</span>
              </div>
              <input
                type="range"
                min="50"
                max="8000"
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-coral"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                <span>₹50</span>
                <span>₹8000</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Minimum Rating</h3>
              <div className="flex gap-1.5">
                {[0, 3, 4, 4.5].map((stars) => (
                  <button
                    key={stars}
                    onClick={() => setSelectedRating(stars)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                      selectedRating === stars
                        ? "bg-amber-500 border-amber-500 text-white shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${selectedRating === stars ? "fill-white" : "text-amber-500 fill-amber-500"}`} />
                    {stars === 0 ? "Any" : `${stars}+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability Filter */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Availability</h3>
              <div className="flex gap-2">
                {["all", "in-stock", "out-of-stock"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setAvailability(status as any)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide border transition-all ${
                      availability === status
                        ? "bg-emerald border-emerald text-white shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    {status === "all" ? "All" : status === "in-stock" ? "In Stock" : "Out of Stock"}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid / Listings */}
          <main className="lg:col-span-9">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, idx) => (
                  <div key={idx} className="bg-white rounded-3xl h-[420px] shadow-sm animate-pulse border border-slate-100">
                    <div className="bg-slate-200 h-3/5 rounded-t-3xl" />
                    <div className="p-5 h-2/5 space-y-3">
                      <div className="h-4 bg-slate-200 rounded w-1/3" />
                      <div className="h-6 bg-slate-200 rounded w-3/4" />
                      <div className="h-4 bg-slate-200 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200/60 p-12 text-center shadow-sm">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-1">No products found</h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
                  We couldn't find any products matching your active filters. Try refining your search.
                </p>
                <Button onClick={handleClearFilters} className="bg-coral text-white rounded-full px-6">
                  Reset All Filters
                </Button>
              </div>
            ) : (
              <div>
                <p className="text-xs text-slate-400 mb-4 font-semibold">
                  Showing {products.length} Products
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((prod) => (
                    <ProductCard key={prod.id} product={prod} />
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>

      </div>

      {/* Mobile Drawer (Filter Drawer) */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black z-50 md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] z-50 max-h-[85vh] overflow-y-auto p-6 space-y-6 shadow-2xl border-t border-slate-100 md:hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="font-serif text-xl font-bold text-slate-900">Filters</h2>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-1 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Pet Type Filters */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Pet Type</h3>
                <div className="flex flex-wrap gap-2">
                  {PetTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setPetType(type.value as any)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                        petType === type.value
                          ? "bg-coral border-coral text-white shadow-sm"
                          : "bg-slate-50 border-slate-200 text-slate-600"
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Category</h3>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none"
                >
                  {categoriesList.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Brand</h3>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none"
                >
                  {brandsList.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* Weight Variant */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Weight Variant</h3>
                <select
                  value={selectedWeight}
                  onChange={(e) => setSelectedWeight(e.target.value)}
                  className="w-full text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none"
                >
                  {weightsList.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold uppercase tracking-wider text-slate-400">Max Price</span>
                  <span className="font-bold text-coral">₹{priceRange}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="8000"
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-coral"
                />
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Minimum Rating</h3>
                <div className="flex gap-1.5">
                  {[0, 3, 4, 4.5].map((stars) => (
                    <button
                      key={stars}
                      onClick={() => setSelectedRating(stars)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        selectedRating === stars
                          ? "bg-amber-500 border-amber-500 text-white"
                          : "bg-slate-50 border-slate-200 text-slate-600"
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${selectedRating === stars ? "fill-white" : "text-amber-500 fill-amber-500"}`} />
                      {stars === 0 ? "Any" : `${stars}+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Availability</h3>
                <div className="flex gap-2">
                  {["all", "in-stock", "out-of-stock"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setAvailability(status as any)}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide border transition-all ${
                        availability === status
                          ? "bg-emerald border-emerald text-white"
                          : "bg-slate-50 border-slate-200 text-slate-500"
                      }`}
                    >
                      {status === "all" ? "All" : status === "in-stock" ? "In Stock" : "Out of Stock"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-4">
                {activeFiltersCount > 0 && (
                  <Button variant="outline" onClick={handleClearFilters} className="w-1/3 rounded-full h-11 border-slate-200">
                    Reset
                  </Button>
                )}
                <Button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className={`bg-coral text-white rounded-full h-11 ${activeFiltersCount > 0 ? "w-2/3" : "w-full"}`}
                >
                  Apply Filters
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
