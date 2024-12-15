"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";

import { useCart } from "@/src/context/cart.provider";
import { useGetSingleProduct } from "@/src/hooks/product.hook";
import Image from "next/image";
const DynamicLoading = dynamic(
  () => import("@/src/components/ui/shared/Loading"),
  {
    ssr: false,
  },
);

const ProductDetails = ({ id }: { id: string }) => {
  const { data, isPending } = useGetSingleProduct(id);
  const [displayImage, setDisplayImage] = useState<null | string>(null);
  const { dispatch, cart } = useCart();

  const addToCartHandler = () => {
    if (cart.length === 0) {
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
    } else {
      const cartVendorId = cart[0].vendorId;

      if (data?.data?.vendorId !== cartVendorId) {
        const isConfirm = confirm(
          "Replace the cart with the new product(s). Retain the current cart and cancel the addition.",
        );

        if (isConfirm) {
          dispatch({
            type: "CLEAR_CART",
          });
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
        }

        return;
      } else {
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
      }
    }
  };

  if (isPending) return <DynamicLoading />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="flex flex-col md:flex-row -mx-4">
        <div className="md:flex-1 p-6">
          <div className="h-64 md:h-80 w-56 rounded-lg mb-4 flex items-center justify-center">
            <Image height={100} width={100} alt="" src={displayImage || data?.data?.images[0]} />
          </div>

          <div className="flex mb-4 gap-3 mt-10">
            {data?.data?.images.map((image: string) => (
              <Avatar
                key={image}
                className="w-20 h-20 text-large cursor-pointer"
                isBordered={image === displayImage}
                radius="sm"
                src={image}
                onClick={() => setDisplayImage(image)}
              />
            ))}
          </div>
        </div>

        <div className="md:flex-1 px-4">
          <h2 className="mb-2 leading-tight tracking-tight font-bold text-2xl md:text-3xl">
            {data?.data.name}
          </h2>
          <p className="text-gray-500 text-sm">
            By{" "}
            <a
              className="text-indigo-600 hover:underline"
              href={`/vendor/${data?.data?.vendor.id}`}
            >
              {data?.data?.vendor.name}
            </a>
          </p>

          <div className="flex items-center space-x-4 my-4">
            <div>
              <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                <span className="text-indigo-400 mr-1 mt-1">$</span>
                <span className="font-bold text-indigo-600 text-3xl">
                  {data?.data?.price}
                </span>
              </div>
            </div>
            {data?.data?.discount > 0 && (
              <div className="flex-1">
                <p className="text-green-500 text-xl font-semibold">
                  Discount {data?.data?.discount}%
                </p>
                <p className="text-gray-400 text-sm">
                  Inclusive of all features.
                </p>
              </div>
            )}
          </div>

          <p className="text-gray-500">{data?.data?.description}</p>

          <div className="flex py-4 space-x-4">
            <Button
              className="my-3 rounded-md bg-default-900 text-default"
              onClick={addToCartHandler}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/*  <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Leave a Review</h2>

        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`h-6 w-6 cursor-pointe`}
            />
          ))}
        </div>

        <Textarea
          placeholder="Write your review here..."
        
          className="mb-4"
        />

        <Button className="rounded-md bg-indigo-600 text-white">
          Submit Review
        </Button>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Customer Reviews</h2>
        <div className="space-y-4">
          {[{
            name: "John Doe",
            rating: 5,
            comment: "Excellent product! Highly recommend.",
            date: "2024-12-15",
          }].map((review, idx) => (
            <div key={idx} className="bg-gray-100 p-4 rounded-lg shadow">
              <div className="flex items-center mb-2">
                <h3 className="font-bold text-gray-800 mr-2">{review.name}</h3>
                <span className="text-gray-500 text-sm">{review.date}</span>
              </div>
              <div className="flex items-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`h-5 w-5 ${star <= review.rating ? "text-yellow-500" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default ProductDetails;
