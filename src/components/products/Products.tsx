"use client"
import dynamic from "next/dynamic";

const DynamicLoading = dynamic(() => import('@/src/components/ui/shared/Loading'), {
    ssr: false,
})
import { useGetAllProducts } from '@/src/hooks/product.hook'
import React from 'react'
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { StarFilledIcon } from '../icons';

function Products() {
    const { data, isPending } = useGetAllProducts();
    if (isPending) return <DynamicLoading />
    console.log(data?.data)
    return (
        <div>
            {
                (data?.data && data?.data.length ? data?.data?.map(product => <Card
                    key={product.id}
                    isPressable
                    className="shadow-lg hover:shadow-xl transition-shadow rounded-none h-[270px]"
                >
                    <CardHeader className="p-0">
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-40 object-cover"
                        />
                    </CardHeader>
                    <CardBody className="p-4">
                        <h3 className="text-sm font-semibold truncate">
                            {product.name}
                        </h3>
                        <div className="mt-2 flex items-center space-x-2">
                            <span className="text-red-500 font-bold">{product.price}</span>
                            <span className="text-xs line-through">{`৳$     `}</span>
                            <span className="text-xs text-green-500">{product.discount}</span>
                        </div>
                        <div className="mt-1 flex items-center ">

                            {[...Array(5)].map((_, index) => (
                                <StarFilledIcon
                                    key={index}
                                    className={`w-3 h-3 ${product.rating > index ? "text-yellow-400" : "text-gray-300"
                                        }`}
                                />
                            ))}
                            <span className="text-xs">({product.reviews})</span>
                        </div>
                    </CardBody>
                </Card>) : <p className='text-center text-xl text-gray-600'>No produts found!!</p>)
            }
        </div>
    )
}

export default Products