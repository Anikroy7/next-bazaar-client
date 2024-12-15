"use client"

import React from 'react'
import NBForm from '../ui/form/NBForm'
import NBInput from '../ui/form/NBInput'
import NBTextArea from '../ui/form/NBTextArea'
import { Button } from '@nextui-org/button'
import { StarIcon } from '../icons'
import { FieldValues } from 'react-hook-form'
import { useCreateProductReview } from '@/src/hooks/productReview.hook'
import dynamic from 'next/dynamic'
import { useGetLoogedUserInfo } from '@/src/hooks/user.hook'

const DynamicLoading = dynamic(
    () => import("@/src/components/ui/shared/Loading"),
    { ssr: false },
);

export default function ProductReview({ productId }: { productId: number }) {

    const { data: loogedUserData, isPending: loogedUserPending } = useGetLoogedUserInfo()
    const { mutate: handleCreatePr, data, isPending } = useCreateProductReview();
// console.log(first)
    const onSubmit = (data: FieldValues) => {
        console.log(data)
        const prData = {
            ...data,
            productId,
            customerId: loogedUserData?.data?.id,
            ratings: parseInt(data.ratings)
            
        }

        console.log(prData)
        handleCreatePr(prData)
    }
    if (isPending || loogedUserPending) return <DynamicLoading />
    console.log(data, isPending )
    return (
        <>
            <div className="mt-12  p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Leave a Review</h2>
                <NBForm
                    onSubmit={onSubmit}
                >
                    <div className="w-1/2 my-3">
                        <NBInput
                            name="ratings"
                            required
                            label="Ratings (out of 5)"
                        />
                    </div>
                    <div className="w-1/2 my-3">
                        <NBTextArea
                            label="Customer review"
                            name="description"
                            placeholder="Enter your review"
                            required
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
            </div>

            <div className="mt-12">
                <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
                <div className="space-y-4">
                    {[{
                        name: "John Doe",
                        rating: 5,
                        comment: "Excellent product! Highly recommend.",
                        date: "2024-12-15",
                    }].map((review, idx) => (
                        <div key={idx} className="p-4 rounded-lg shadow">
                            <div className="flex items-center mb-2">
                                <h3 className="font-bold mr-2">{review.name}</h3>
                                <span className="text-sm">{review.date}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <StarIcon
                                        key={star}
                                        className={`h-5 w-5 ${star <= review.rating ? "text-yellow-500" : "text-gray-300"}`}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-500">{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
