"use client";

import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

import ProductCard from "../../products/ProductCard";

import { TProduct } from "@/src/types";
import { useGetSingleVendor } from "@/src/hooks/user.hook";

const DynamicLoading = dynamic(
  () => import("@/src/components/ui/shared/Loading"),
  {
    ssr: false,
  },
);

const VendorDetails = ({ id }: { id: string }) => {
  const { data, isPending } = useGetSingleVendor(id);

  if (isPending) return <DynamicLoading />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className=" shadow rounded-lg p-6">
        {/* Vendor Header Section */}
        <div className="flex items-center mb-6">
          <Image
            alt="Vendor Logo"
            className="w-20 h-20 rounded-full border border-gray-200"
            height={80}
            src={data?.data?.logo}
            width={80}
          />
          <div className="ml-4">
            <h1 className="text-2xl font-bold">{data?.data?.name}</h1>
            <p className="text-gray-400">{data?.data?.location}</p>
          </div>
        </div>

        {/* Vendor Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold">Description</h2>
            <p className=" mt-2">{data?.data?.description}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Contact Information</h2>
            <ul className="mt-2 space-y-1">
              <li>
                <strong>Email:</strong> {data?.data?.email}
              </li>
              <li>
                <strong>Phone:</strong> {data?.data?.phone}
              </li>
            </ul>
          </div>
        </div>

        {/* Action Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Actions</h2>
          <div className="flex space-x-4">
            <button className="px-6 py-2 font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-500">
              Follow Vendor
            </button>
            <button className="px-6 py-2 font-semibold rounded-lg bg-red-600 text-white hover:bg-red-500">
              Report Vendor
            </button>
          </div>
        </div>

        {/* Vendor Products Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Products</h2>
          <div className="">
            {data?.data.products && data?.data.products?.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data?.data.products.map((product: TProduct) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center text-xl text-gray-600">
                No products found!!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDetails;
