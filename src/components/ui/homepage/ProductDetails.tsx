"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import Image from "next/image";

import ProductReview from "../../products/ProductReview";

import { useCart } from "@/src/context/cart.provider";
import { useGetSingleProduct } from "@/src/hooks/product.hook";
import { useGetMyOrderInfo } from "@/src/hooks/order.hook";
import { useUser } from "@/src/context/user.prodvier";
import { TOrderedProduct } from "@/src/types";
const DynamicLoading = dynamic(
  () => import("@/src/components/ui/shared/Loading"),
  {
    ssr: false,
  },
);

const ProductDetails = ({ id }: { id: string }) => {
  const { user } = useUser();
  const { data, isPending } = useGetSingleProduct(id);
  const {
    data: myOrders,
    isPending: oPPending,
    isSuccess,
  } = useGetMyOrderInfo();
  const [displayImage, setDisplayImage] = useState<null | string>(
    data?.data?.images[0] || null,
  );
  const { dispatch, cart } = useCart();
  const [orderedProduct, setOrderedProduct] = useState<TOrderedProduct[]>([]);

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

  useEffect(() => {
    if (!oPPending && myOrders && isSuccess) {
      myOrders?.data?.forEach((element: any) => {
        setOrderedProduct([...orderedProduct, ...element.products]);
      });
    }
  }, [oPPending, isSuccess, myOrders]);

  useEffect(() => {
    if (data && !isPending) {
      setDisplayImage(data?.data?.images[0])
    }
  }, [data, isPending])

  if (isPending) return <DynamicLoading />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="flex flex-col md:flex-row -mx-4">
        {/* Left Section: Image */}
        <div className="md:w-1/2 p-2">
          <div className="h-64 md:h-80 w-full rounded-lg mb-4 flex items-center justify-center overflow-hidden">
            <Image
              alt=""
              src={
                displayImage ||
                "https://tse3.mm.bing.net/th?id=OIP.AhRqkCZNh-f7x1ZEE3G34QHaFj&pid=Api&P=0&h=220"
              }
              width={800} 
              height={500} 
              className="w-full h-full object-cover"
            />
          </div>


          <div className="flex mb-4 gap-3 mt-10">
            {data?.data?.images.map((image: string, index: number) => (
              <Avatar
                key={index}
                className="w-20 h-20 text-large cursor-pointer"
                isBordered={image === displayImage}
                radius="sm"
                src={image}
                onClick={() => setDisplayImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Right Section: Product Info */}
        <div className="md:w-1/2 px-4">
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

          {user?.role !== "ADMIN" && user?.role !== "VENDOR" && (
            <div className="flex py-4 space-x-4">
              <Button
                className="my-3 rounded-md bg-default-900 text-default"
                onClick={addToCartHandler}
              >
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Conditional Rendering for Reviews */}
      {user?.email &&
        orderedProduct.length > 0 &&
        orderedProduct.find((pd: TOrderedProduct) => pd.id === data?.data?.id) && (
          <ProductReview productId={data?.data?.id} />
        )}
      {user?.role === "VENDOR" && <ProductReview productId={data?.data?.id} />}
    </div>


  );
};

export default ProductDetails;
