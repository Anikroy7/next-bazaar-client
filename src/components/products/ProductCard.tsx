"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { StarFilledIcon } from "../icons";

import { TProduct } from "@/src/types";
import { useUser } from "@/src/context/user.prodvier";
import { useDeleteProduct } from "@/src/hooks/product.hook";
import handleAddProductToLs from "@/src/helpers/handleAddProductToLS";

type ProductCardProps = {
  product: TProduct;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { user } = useUser();
  const router = useRouter();
  let totalPrice = product.price;
  const {
    data,
    mutate: handleDeleteProduct,
    isPending,
    isSuccess,
  } = useDeleteProduct();

  if (product.discount) {
    const discountAmount = (product.price * product.discount) / 100;

    totalPrice = product.price - discountAmount;
  }

  useEffect(() => {
    if (!isPending && data && isSuccess) {
      router.push("/dashboard/vendor");
    }
  }, [isSuccess, data, isPending]);

  const handleDelteProduct = () => {
    const isConfirm = confirm("Are you want to sure delete the product?");

    if (isConfirm) {
      handleDeleteProduct({
        id: product.id,
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      router.push(`/product/${product.id}`);
    }
  };

  const handleActionKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  const handleToNavigateProductDetails = () => {
    if (user?.role !== "VENDOR") {
      handleAddProductToLs(product);
      router.push(`/product/${product.id}`);
    }
  };

  return (
    <>
      <Card
        key={product.id}
        isPressable
        className="shadow-lg hover:shadow-xl transition-shadow rounded-none h-[270px] relative"
        role="button"
        tabIndex={0}
        onClick={() => handleToNavigateProductDetails()}
        onKeyDown={handleKeyPress}
      >
        <CardHeader className="p-0">
          {(user?.role === "VENDOR" || user?.role === "ADMIN") &&
            product.vendor?.email === user.email && (
              <>
                {/* View Details Button */}
                <Link href={`/product/${product.id}`}>
                  <span
                    className="absolute top-2 right-28 bg-white text-black p-1 rounded-full shadow-md hover:bg-gray-200 transition"
                    role="button"
                    tabIndex={0}
                    title="View product details"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.871-.682 1.701-1.208 2.458C18.268 16.057 14.477 19 12 19s-6.268-2.943-7.542-6A10.94 10.94 0 012.458 12z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
                {/* Duplicate Button */}
                <Link
                  href={`/dashboard/vendor/add-product?productLike=${product.id}`}
                >
                  <span
                    className="absolute top-2 right-2 bg-white text-black p-1 rounded-full shadow-md hover:bg-gray-200 transition"
                    role="button"
                    tabIndex={0}
                    title="Duplicate product"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 4v16m8-8H4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
                {/* Edit Button */}
                <Link href={`/dashboard/vendor/update-product/${product.id}`}>
                  <span
                    className="absolute top-2 right-12 bg-white text-black p-1 rounded-full shadow-md hover:bg-gray-200 transition"
                    role="button"
                    tabIndex={0}
                    title="Edit product"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 3l5 5-10 10H6v-5L16 3z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>

                {/* Delete Button */}
                <span
                  className="absolute top-2 right-20 bg-white text-black p-1 rounded-full shadow-md hover:bg-gray-200 transition"
                  role="button"
                  tabIndex={0}
                  title="Delete product"
                  onClick={() => handleDelteProduct()}
                  onKeyDown={(e) => handleActionKeyPress(e, handleDelteProduct)}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 18L18 6M6 6l12 12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </>
            )}

          <Image
            alt={product.name}
            className="w-full h-40 object-cover"
            height={160}
            src={product.images[0]}
            width={100}
          />
        </CardHeader>
        <CardBody className="p-4">
          <h3 className="text-sm font-semibold truncate">{product.name}</h3>
          <div className="mt-2 flex items-center space-x-2">
            <span className="text-xs line-through">{`৳`}</span>
            <span className="text-red-500 font-bold">{totalPrice}</span>
            <span className="text-xs text-green-500">
              - {product.discount}%
            </span>
          </div>
          <div className="mt-1 flex items-center">
            {[...Array(5)].map((_, index) => (
              <StarFilledIcon
                key={index}
                className={`w-3 h-3 text-yellow-400`}
              />
            ))}
            <span className="text-xs">({5})</span>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default ProductCard;
