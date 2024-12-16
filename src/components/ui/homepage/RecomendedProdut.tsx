"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import ProductCard from "../../products/ProductCard";

import { useGetAllProducts } from "@/src/hooks/product.hook";
import { TProduct } from "@/src/types";

const DynamicLoading = dynamic(
  () => import("@/src/components/ui/shared/Loading"),
  {
    ssr: false,
  },
);


export default function RecomendedProduct() {
  const { data, isPending } = useGetAllProducts();


  if (isPending) return <DynamicLoading />;

  const products = data?.data || [];

  return (
    <div className=" py-10">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-semibold mb-6">Recommend For You</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {products.length &&
            products.map((product: TProduct) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}
