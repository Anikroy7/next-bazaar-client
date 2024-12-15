import { Card, CardBody, CardHeader } from '@nextui-org/card'
import React, { useEffect } from 'react'
import { StarFilledIcon } from '../icons'
import { TProduct } from '@/src/types'
import { useUser } from '@/src/context/user.prodvier'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useDeleteProduct } from '@/src/hooks/product.hook'

type ProductCardProps = {
    product: TProduct
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { user } = useUser();
    const router = useRouter()
    let totalPrice = product.price;
    const { data, mutate: handleDeleteProduct, isPending, isSuccess } = useDeleteProduct()

    if (product.discount) {
        const discountAmount = (product.price * product.discount) / 100;
        totalPrice = product.price - discountAmount
    }

    useEffect(() => {
        if (!isPending && data && isSuccess) {
            router.push('/dashboard/vendor');
        }
    }, [isSuccess, data, isPending])

    const handleDelteProduct = () => {
        const isConfirm = confirm("Are you want to sure delete the product?")

        if (isConfirm) {
            handleDeleteProduct({
                id: product.id
            })
        }
    }

    console.log(product, user)

    return (
        <Card
            key={product.id}
            isPressable
            className="shadow-lg hover:shadow-xl transition-shadow rounded-none h-[270px] relative"
            onClick={() => router.push(`/product/${product.id}`)}
        >
            <CardHeader className="p-0">
                {/* Add the plus button and action buttons here */}
                {
                    (user?.role === 'VENDOR' || user?.role === "ADMIN") && (product.vendor?.email === user.email) && (
                        <>
                            {/* Duplicate Button */}
                            <span
                                className="absolute top-2 right-2 bg-white text-black p-1 rounded-full shadow-md hover:bg-gray-200 transition"
                                title="Duplicate product"
                                onClick={() => router.push(`/dashboard/vendor/add-product?productLike=${product.id}`)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                            </span>

                            {/* Edit Button */}
                            <Link href={`/dashboard/update-product/${product.id}`}>
                                <span
                                    className="absolute top-2 right-12 bg-white text-black p-1 rounded-full shadow-md hover:bg-gray-200 transition"
                                    title="Edit product"
                                // onClick={() => router.push(`/dashboard/vendor/update-product/${product.id}`)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 3l5 5-10 10H6v-5L16 3z" />
                                    </svg>
                                </span>

                            </Link>
                            {/* Delete Button */}
                            <span
                                className="absolute top-2 right-20 bg-white text-black p-1 rounded-full shadow-md hover:bg-gray-200 transition"
                                title="Delete product"
                                onClick={() => handleDelteProduct()}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </span>
                        </>
                    )
                }

                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                />
            </CardHeader>
            <CardBody className="p-4">
                <h3 className="text-sm font-semibold truncate">{product.name}</h3>
                <div className="mt-2 flex items-center space-x-2">
                    <span className="text-xs line-through">{`৳`}</span>
                    <span className="text-red-500 font-bold">{totalPrice}</span>
                    <span className="text-xs text-green-500">- {product.discount}%</span>
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


    )
}


export default ProductCard