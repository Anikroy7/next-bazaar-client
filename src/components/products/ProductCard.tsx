import { Card, CardBody, CardHeader } from '@nextui-org/card'
import React from 'react'
import { StarFilledIcon } from '../icons'
import { TProduct } from '@/src/types'

type ProductCardProps = {
    product: TProduct
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

    let totalPrice = product.price;

    if (product.discount) {
        const discountAmount = (product.price * product.discount) / 100;
        totalPrice = product.price - discountAmount
    }

    return (
        <Card
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
                    <span className="text-xs line-through">{`৳`}</span>
                    <span className="text-red-500 font-bold">{totalPrice}</span>
                    <span className="text-xs text-green-500">- {product.discount}%</span>
                </div>
                <div className="mt-1 flex items-center ">

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