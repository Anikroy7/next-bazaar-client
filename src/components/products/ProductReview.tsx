"use client";

import React from "react";
import { Button } from "@nextui-org/button";
import { FieldValues } from "react-hook-form";
import dynamic from "next/dynamic";

import NBForm from "../ui/form/NBForm";
import NBInput from "../ui/form/NBInput";
import NBTextArea from "../ui/form/NBTextArea";
import { StarIcon } from "../icons";

import {
  useCreateProductReview,
  useGetProductReviews,
} from "@/src/hooks/productReview.hook";
import { useGetLoogedUserInfo } from "@/src/hooks/user.hook";
import { TReview } from "@/src/types";
import { useUser } from "@/src/context/user.prodvier";

const DynamicLoading = dynamic(
  () => import("@/src/components/ui/shared/Loading"),
  { ssr: false },
);

export default function ProductReview({ productId }: { productId: number }) {
  const { user } = useUser();
  const { data: loogedUserData, isPending: loogedUserPending } =
    useGetLoogedUserInfo();
  const { mutate: handleCreatePr, isPending } = useCreateProductReview();
  const { data: productReviews, isPending: productReviewsPending } =
    useGetProductReviews(`${productId}`);
  const onSubmit = (data: FieldValues) => {
    const prData = {
      ...data,
      productId,
      customerId: loogedUserData?.data?.id,
      ratings: parseInt(data.ratings),
    };

    handleCreatePr(prData);
  };

  if (isPending || loogedUserPending || productReviewsPending)
    return <DynamicLoading />;

  return (
    <>
      <div className="mt-12  p-6 rounded-lg shadow-lg">
        {(user?.role === "ADMIN" || user?.role === "CUSTOMER") && (
          <>
            <h2 className="text-xl font-bold mb-4">Leave a Review</h2>
            <NBForm onSubmit={onSubmit}>
              <div className="w-1/2 my-3">
                <NBInput required label="Ratings (out of 5)" name="ratings" />
              </div>
              <div className="w-1/2 my-3">
                <NBTextArea
                  required
                  label="Customer review"
                  name="description"
                  placeholder="Enter your review"
                  variant="faded"
                />
              </div>
              <Button
                className="my-3 rounded-md bg-default-900 text-default"
                size="sm"
                type="submit"
              >
                Send
              </Button>
            </NBForm>
          </>
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 ">Customer Reviews</h2>
        {productReviews?.data?.length ? (
          <div className="space-y-6">
            {productReviews?.data?.map((data: TReview) => (
              <div
                key={data?.review.id}
                className="p-6  rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold ">
                    {data?.review?.customer?.name}
                  </h3>
                  <span className="text-sm ">
                    {new Date(data?.review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className={`h-5 w-5 ${
                        star <= data?.review.ratings
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">{data?.review.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            No reviews yet. Be the first to review this product!
          </p>
        )}
      </div>
    </>
  );
}
