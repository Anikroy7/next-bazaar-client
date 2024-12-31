"use client";

import React, { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";

import ProductCard from "@/src/components/products/ProductCard";
import { TProduct } from "@/src/types";

export default function Page() {
  const [products, setProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    const recentProducts = JSON.parse(
      localStorage.getItem("recentProducts") || "[]",
    );

    setProducts(recentProducts);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("recentProducts");
    setProducts([]);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center pb-6">
        <h2 className="text-2xl font-semibold">Recently Viewed Products</h2>
        <button
          className="flex items-center gap-2 text-red-600 hover:text-red-800 transition duration-200"
          onClick={clearHistory}
        >
          <FiTrash2 className="w-5 h-5" />
          <span className="text-sm font-medium">Clear All View History</span>
        </button>
      </div>

      {products && products.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-600">No products found!!</p>
      )}
    </div>
  );
}
