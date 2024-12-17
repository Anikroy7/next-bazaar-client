"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import Image from "next/image";

import { useCart } from "@/src/context/cart.provider";
import { useGetSingleProduct } from "@/src/hooks/product.hook";
import { useUser } from "@/src/context/user.prodvier";

const DynamicLoading = dynamic(
  () => import("@/src/components/ui/shared/Loading"),
  { ssr: false },
);

const CompareProductDetailsThree = ({ id }: { id: string }) => {
  const { user } = useUser();
  const { data, isPending } = useGetSingleProduct(id);
  const [displayImage, setDisplayImage] = useState<null | string>(null);
  const { dispatch, cart } = useCart();

  const addToCartHandler = () => {
    const cartVendorId = cart.length ? cart[0].vendorId : null;

    if (cartVendorId && data?.data?.vendorId !== cartVendorId) {
      const isConfirm = confirm("Replace the cart with the new product(s)?");

      if (isConfirm) {
        dispatch({ type: "CLEAR_CART" });
      } else return;
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: data?.data?.id,
        name: data?.data?.name,
        price: data?.data?.price,
        quantity: 1,
        image: data?.data?.images[0],
        vendorId: data?.data?.vendorId,
      },
    });
  };

  if (isPending) return <DynamicLoading />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      {/* Column View Layout */}
      <div className="flex flex-col gap-8">
        {/* Left: Image Section */}
        <div className="w-full flex flex-col items-center">
          <div className="h-[300px] w-full max-w-[400px] rounded-lg shadow-lg flex items-center justify-center overflow-hidden">
            <Image
              alt="Product Image"
              className="object-cover w-full h-full"
              height={400}
              src={displayImage || "https://via.placeholder.com/400"}
              width={400}
            />
          </div>

          {/* Image Thumbnails */}
          <div className="flex gap-4 mt-6">
            {data?.data?.images.map((image: string, index: number) => (
              <Avatar
                key={index}
                className="w-16 h-16 cursor-pointer"
                isBordered={image === displayImage}
                radius="sm"
                src={image}
                onClick={() => setDisplayImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col justify-start">
          <h2 className="text-3xl font-bold mb-3">{data?.data?.name}</h2>
          <p className="text-gray-600 text-sm mb-4">
            By{" "}
            <a
              className="text-indigo-600 hover:underline"
              href={`/vendor/${data?.data?.vendor.id}`}
            >
              {data?.data?.vendor.name}
            </a>
          </p>

          <div className="flex items-center mb-4">
            <span className="text-4xl font-bold text-indigo-600 mr-4">
              ৳{data?.data?.price}
            </span>
            {data?.data?.discount > 0 && (
              <span className="text-green-500 text-lg font-semibold">
                {data?.data?.discount}% Off
              </span>
            )}
          </div>

          <p className="text-gray-600 mb-6">{data?.data?.description}</p>

          {user?.role === "CUSTOMER" && (
            <Button
              className="rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
              onClick={addToCartHandler}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompareProductDetailsThree;
