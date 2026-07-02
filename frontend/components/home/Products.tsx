"use client";

import { motion } from "framer-motion";
import { products } from "@/lib/data";
import ProductCard from "./ProductCard";

const Products = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-center justify-between mb-12">
        <div>
          <span className="text-sm font-semibold text-coral uppercase tracking-wider">Premium Nutrition</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-1">Featured Products</h2>
        </div>
        <span className="text-sm text-slate-400 hidden md:block">4 Products</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Products;
