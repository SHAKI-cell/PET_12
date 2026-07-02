"use client";

import { useEffect, useState, useMemo } from "react";
import { ArrowLeft, Heart, Star, ShoppingBag, Plus, Minus, ShieldCheck, Truck, RotateCcw, Package } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getProductById, getProducts } from "@/lib/api/products";
import type { Product } from "@/lib/data";
import { useCartStore, useFavoritesStore } from "@/lib/store";
import ProductCard from "@/components/home/ProductCard";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatPrice } from "@/lib/utils";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [mounted, setMounted] = useState(false);

  // Variant/Purchase State
  const [selectedWeight, setSelectedWeight] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  // Cart & Wishlist hooks
  const { items: cartItems, addItem, updateQuantity, removeItem } = useCartStore();
  const { toggle: toggleFavorite, isFavorite } = useFavoritesStore();

  useEffect(() => {
    setMounted(true);
  }, []);


  // Fetch product data and related products
  useEffect(() => {
    async function fetchProductData() {
      setLoading(true);
      const data = await getProductById(id);
      if (data) {
        setProduct(data);
        // Default weight selection
        if (data.weightVariants && data.weightVariants.length > 0) {
          setSelectedWeight(data.weightVariants[0].weight);
        } else {
          setSelectedWeight("1kg"); // Fallback
        }

        // Fetch related products
        const allProducts = await getProducts();
        const related = allProducts
          .filter((p) => p.id !== data.id && (p.category === data.category || p.brand === data.brand))
          .slice(0, 3);
        setRelatedProducts(related);
      } else {
        setProduct(null);
      }
      setLoading(false);
    }
    fetchProductData();
  }, [id]);

  // Compute selected variant price, discount, and stock
  const selectedVariant = useMemo(() => {
    if (!product || !product.weightVariants) return null;
    return product.weightVariants.find((v) => v.weight === selectedWeight) || product.weightVariants[0];
  }, [product, selectedWeight]);

  const priceInfo = useMemo(() => {
    if (!product) return { originalPrice: 0, finalPrice: 0, hasDiscount: false };
    
    const basePrice = selectedVariant ? selectedVariant.price : product.price;
    const discountPercent = product.discount || 0;
    
    if (discountPercent > 0) {
      return {
        originalPrice: basePrice,
        finalPrice: basePrice * (1 - discountPercent / 100),
        hasDiscount: true,
        discountPercent
      };
    }
    
    return {
      originalPrice: basePrice,
      finalPrice: basePrice,
      hasDiscount: false
    };
  }, [product, selectedVariant]);

  // Check if this specific weight variant is in the cart
  const cartItemKey = useMemo(() => {
    return product ? `${product.id}-${selectedWeight}` : "";
  }, [product, selectedWeight]);

  const existingCartItem = useMemo(() => {
    if (!cartItemKey) return null;
    return cartItems.find((i) => i.product.id === cartItemKey);
  }, [cartItems, cartItemKey]);

  // Handle Add to Cart / Quantity adjustments
  const handleAddToCart = () => {
    if (!product) return;
    
    // Create cloned product with updated ID, name, price, and selected weight
    const cartProduct: Product = {
      ...product,
      id: cartItemKey,
      name: `${product.name} (${selectedWeight})`,
      price: priceInfo.finalPrice,
      selectedWeight: selectedWeight
    };
    
    addItem(cartProduct);
    // Sync the quantity selector with the newly added cart item quantity
    setQuantity(1);
  };

  const handleUpdateQuantity = (newQty: number) => {
    if (existingCartItem) {
      if (newQty <= 0) {
        removeItem(cartItemKey);
      } else {
        updateQuantity(cartItemKey, newQty);
      }
    } else {
      setQuantity(Math.max(1, newQty));
    }
  };

  // Wishlist / Favorite Status
  const isWishlisted = mounted && product ? isFavorite(product.id) : false;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-28 pb-16 px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="max-w-7xl mx-auto space-y-8">
          <Skeleton className="h-6 w-24 rounded-full" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              <Skeleton className="aspect-[4/3] rounded-3xl" />
              <Skeleton className="h-48 rounded-3xl" />
            </div>
            <div className="lg:col-span-5 space-y-6">
              <Skeleton className="h-64 rounded-3xl" />
              <Skeleton className="h-32 rounded-3xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-4">
        <h2 className="text-4xl font-serif font-bold text-slate-900 mb-2">Product Not Found</h2>
        <p className="text-slate-500 mb-6 max-w-sm">
          The product you are looking for is currently unavailable or doesn't exist.
        </p>
        <Link
          href="/shop"
          className="bg-gradient-to-r from-coral to-emerald text-white px-8 py-3 rounded-full font-bold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Back Link & Quick Cart Action */}
        <div className="flex items-center justify-between">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-coral transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
          
          <button
            onClick={() => toggleFavorite(product.id)}
            className="p-2.5 rounded-full bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? "fill-coral text-coral" : "text-slate-500"}`} />
          </button>
        </div>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Images, Detailed Sections) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Image Gallery Container */}
            <div className="bg-white rounded-3xl overflow-hidden card-shadow p-4 md:p-8 flex items-center justify-center border border-slate-100">
              <div className="relative aspect-square w-full max-w-[400px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain rounded-2xl"
                />
              </div>
            </div>

            {/* Description & Guide Info */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/60 shadow-sm space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">Product Description</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {product.description}
                </p>
              </div>

              {/* Key Ingredients */}
              <div className="pt-6 border-t border-slate-100">
                <h4 className="font-semibold text-slate-700 text-sm mb-3">Key Ingredients</h4>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold bg-emerald-light text-emerald px-3 py-1 rounded-full capitalize"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Nutritional Info */}
              <div className="pt-6 border-t border-slate-100">
                <h4 className="font-semibold text-slate-700 text-sm mb-2">Nutritional Information</h4>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-150">
                  <p className="text-xs text-slate-600 font-semibold">{product.nutritionalInfo}</p>
                </div>
              </div>

              {/* Feeding Guide */}
              {product.feedingGuide && (
                <div className="pt-6 border-t border-slate-100">
                  <h4 className="font-semibold text-slate-700 text-sm mb-2">Feeding Guide</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {product.feedingGuide}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (Brand, Price, Options, Add to Cart) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Essential Purchase Card */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/60 shadow-sm space-y-6">
              
              {/* Product Identifiers */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald uppercase tracking-wider bg-emerald-light px-2.5 py-1 rounded-full">
                    {product.brand || "DoFo"}
                  </span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
                
                <h1 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mt-2.5 leading-tight">
                  {product.name}
                </h1>
                
                {/* Rating & Reviews */}
                <div className="flex items-center gap-1.5 mt-3">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${
                          idx < Math.floor(product.rating || 4.5) ? "fill-amber-500" : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-700">
                    {product.rating || 4.5}
                  </span>
                  <span className="text-xs font-medium text-slate-400">
                    ({product.reviewsCount || 25} Reviews)
                  </span>
                </div>
              </div>

              {/* Price Display */}
              <div className="pt-6 border-t border-slate-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900">
                    ₹{priceInfo.finalPrice.toFixed(2)}
                  </span>
                  {priceInfo.hasDiscount && (
                    <>
                      <span className="text-sm font-semibold text-slate-400 line-through">
                        ₹{priceInfo.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-xs font-bold text-coral bg-coral-light px-2 py-0.5 rounded-full">
                        {priceInfo.discountPercent}% OFF
                      </span>
                    </>
                  )}
                </div>
                
                {/* Stock Status Badge */}
                <div className="mt-2 flex items-center gap-1.5">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      (selectedVariant?.stock || 5) > 5 ? "bg-emerald" : "bg-amber-500"
                    }`}
                  />
                  <span className="text-xs font-bold text-slate-500">
                    {selectedVariant ? `${selectedVariant.stock} units available` : "In Stock"}
                  </span>
                </div>
              </div>

              {/* Weight Variants Selector */}
              {product.weightVariants && product.weightVariants.length > 0 && (
                <div className="space-y-3 pt-6 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Select Size / Weight
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {product.weightVariants.map((v) => (
                      <button
                        key={v.weight}
                        onClick={() => {
                          setSelectedWeight(v.weight);
                          setQuantity(1);
                        }}
                        className={`px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all ${
                          selectedWeight === v.weight
                            ? "bg-coral border-coral text-white shadow-sm"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {v.weight}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector & Action Button */}
              <div className="pt-6 border-t border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Quantity</span>
                  
                  {/* Quantity adjustment buttons */}
                  <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-1.5 shadow-inner">
                    <button
                      onClick={() => handleUpdateQuantity((existingCartItem?.quantity || quantity) - 1)}
                      className="p-1 rounded-full hover:bg-white text-slate-600 transition-colors"
                      title="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-bold text-slate-800 w-6 text-center">
                      {existingCartItem ? existingCartItem.quantity : quantity}
                    </span>
                    <button
                      onClick={() => handleUpdateQuantity((existingCartItem?.quantity || quantity) + 1)}
                      className="p-1 rounded-full hover:bg-white text-slate-600 transition-colors"
                      title="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {existingCartItem ? (
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold text-emerald text-center flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Item added to cart
                    </div>
                    <Button
                      onClick={() => removeItem(cartItemKey)}
                      className="w-full bg-slate-100 border border-slate-200 text-red-500 font-semibold py-3.5 rounded-full hover:bg-red-50 hover:border-red-100 hover:text-red-600 transition-all text-sm h-12 flex items-center justify-center"
                    >
                      Remove from Cart
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-coral to-emerald text-white font-semibold py-3.5 rounded-full shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 text-sm h-12 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </Button>
                )}
              </div>

            </div>

            {/* Premium Trust Badges */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-light rounded-xl text-emerald">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Free Delivery on ₹500+</h4>
                  <p className="text-[10px] text-slate-400 font-medium">Delivered in 2-3 business days</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-coral-light rounded-xl text-coral">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Easy Returns & Replacement</h4>
                  <p className="text-[10px] text-slate-400 font-medium">Hassle-free 7 days request window</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="pt-10 border-t border-slate-200 space-y-6">
            <div className="text-center md:text-left">
              <span className="text-xs font-bold text-coral uppercase tracking-wider">Recommendations</span>
              <h3 className="font-serif text-3xl font-bold text-slate-900 mt-1">Related Nutrition</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
