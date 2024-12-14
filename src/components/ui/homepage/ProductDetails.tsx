"use client"


import React, { useState } from "react";
import { useGetSingleProduct } from "@/src/hooks/product.hook";
import dynamic from "next/dynamic";
import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";
const DynamicLoading = dynamic(() => import('@/src/components/ui/shared/Loading'), {
  ssr: false,
})



const ProductDetails = ({ id }: { id: string }) => {
  const { data, isPending } = useGetSingleProduct(id);
  const [displayImage, setDisplayImage] = useState(data?.data?.images[0])
  if (isPending) return <DynamicLoading />
  console.log(data)
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="flex flex-col md:flex-row -mx-4">
        {/* Image Carousel Section */}
        <div className="md:flex-1 p-6">
          <div className="h-64 md:h-80 rounded-lg mb-4 flex items-center justify-center">
            <img src={displayImage || data?.data?.images[0]} alt="" />
          </div>

          <div className="flex mb-4 gap-3 mt-14">
            {data?.data?.images.map((image: string) => (
              <Avatar
                key={image}
                onClick={() => setDisplayImage(image)}
                className="w-20 h-20 text-large"
                radius="sm"
                isBordered={image===displayImage}
                src={image}
              />
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="md:flex-1 px-4">
          <h2 className="mb-2 leading-tight tracking-tight font-bold text-2xl md:text-3xl">
            {data?.data.name}
          </h2>
          <p className="text-gray-500 text-sm">
            By <Link href={`/vendor/${data?.data?.vendor.id}`} className="text-indigo-600 hover:underline">{data?.data?.vendor.name}</Link>
          </p>

          <div className="flex items-center space-x-4 my-4">
            <div>
              <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                <span className="text-indigo-400 mr-1 mt-1">$</span>
                <span className="font-bold text-indigo-600 text-3xl">{data?.data?.price}</span>
              </div>
            </div>
            {data?.data?.discount > 0 && <div className="flex-1">
              <p className="text-green-500 text-xl font-semibold">Discount {data?.data?.discount}%</p>
              <p className="text-gray-400 text-sm">Inclusive of all features.</p>
            </div>}
          </div>

          <p className="text-gray-500">
            {data?.data?.description}
          </p>

          <div className="flex py-4 space-x-4">
            <div className="relative">
              <div className="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">
                Qty
              </div>
              <select className="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1">
                {[1, 2, 3, 4, 5].map((qty) => (
                  <option key={qty}>{qty}</option>
                ))}
              </select>
              <svg
                className="w-5 h-5 text-gray-400 absolute right-0 bottom-0 mb-2 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>

            <button
              type="button"
              className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
