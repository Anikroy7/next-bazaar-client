"use client";
import dynamic from "next/dynamic";

const DynamicLoading = dynamic(
  () => import("@/src/components/ui/shared/Loading"),
  {
    ssr: false,
  },
);

import React from "react";

import ProductCard from "./ProductCard";

import { TProduct } from "@/src/types";
import {
  useGetLoogedUserInfo,
  useGetSingleVendor,
} from "@/src/hooks/user.hook";

function Products() {
  const { data: loogedData, isPending: loogedPending } = useGetLoogedUserInfo();
  // console.log(data)
  const { data, isPending } = useGetSingleVendor(loogedData?.data?.id);

  if (loogedPending || isPending) return <DynamicLoading />;

  return (
    <div>
      <h2 className="text-2xl text-center font-semibold py-6">My Products</h2>
      {data?.data && data?.data.products.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.data.products.map((product: TProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-600">No products found!!</p>
      )}
    </div>
  );
}

export default Products;
