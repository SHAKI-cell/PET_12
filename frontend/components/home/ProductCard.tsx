"use client";

import { useState } from "react";
import { Product } from "@/lib/data";
import { Eye, Package } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="relative h-[420px] w-full cursor-pointer perspective-1000"
      onClick={handleFlip}
      onMouseLeave={() => setIsFlipped(false)} // Hover hatao toh front aa jaye
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? "rotateY-180" : ""
        }`}
      >
        {/* FRONT SIDE */}
        <div className="absolute inset-0 backface-hidden bg-white rounded-3xl overflow-hidden card-shadow group">
          <div className="h-3/5 overflow-hidden bg-slate-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-5 flex flex-col justify-between h-2/5">
            <div>
              <span className="text-xs font-semibold text-emerald uppercase tracking-wider">
                {product.category}
              </span>
              <h3 className="font-serif text-lg font-bold leading-tight mt-0.5">
                {product.name}
              </h3>
              <p className="text-sm text-slate-500">{product.type}</p>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xl font-bold text-slate-900">
                From Rs. {product.price.toFixed(2)}
              </span>
              <span className="text-xs font-medium text-coral bg-coral-light px-3 py-1.5 rounded-full flex items-center gap-1">
                <Eye className="w-3 h-3" /> Click to flip
              </span>
            </div>
          </div>
        </div>

        {/* BACK SIDE (Ingredients & Nutrition) */}
        <div className="absolute inset-0 backface-hidden rotateY-180 bg-gradient-to-br from-white to-slate-50 rounded-3xl overflow-hidden card-shadow p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-5 h-5 text-coral" />
              <h4 className="font-serif font-bold text-xl">Nutritional Profile</h4>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {product.description}
            </p>
            <div className="bg-white/80 rounded-xl p-3 border border-slate-100">
              <p className="text-xs font-semibold text-slate-700 mb-1">Key Ingredients:</p>
              <ul className="flex flex-wrap gap-1">
                {product.ingredients.map((item, idx) => (
                  <li key={idx} className="text-xs bg-emerald-light text-emerald-800 px-2 py-0.5 rounded-full">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-500 mt-2 border-t border-slate-100 pt-2">
                {product.nutritionalInfo}
              </p>
            </div>
          </div>
          <Link
            href={`/shop/${product.id}`}
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-gradient-to-r from-coral to-emerald text-white font-semibold py-3 rounded-full shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 text-sm text-center block"
          >
            Choose options →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
