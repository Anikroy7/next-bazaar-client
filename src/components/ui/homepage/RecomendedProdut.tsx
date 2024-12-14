"use client"

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { StarFilledIcon } from "../../icons";
import { useGetAllProducts } from "@/src/hooks/product.hook";
import dynamic from "next/dynamic";
import { TProduct } from "@/src/types";
import { useRouter } from "next/navigation";
import ProductCard from "../../products/ProductCard";

const DynamicLoading = dynamic(() => import('@/src/components/ui/shared/Loading'), {
    ssr: false,
})
/* 
const products = [
    {
        id: 1,
        name: "New sports shorts",
        price: "৳130",
        discount: "-35%",
        rating: 4.5,
        reviews: 12,
        image: "https://img.drz.lazcdn.com/static/bd/p/66162646534afce47cca3a81f106432d.jpg_400x400q80.jpg_.webp"
    },
    {
        id: 2,
        name: "6-50Kg Adjustable Hand Gripper",
        price: "৳173",
        discount: "-42%",
        rating: 4.3,
        reviews: 121,
        image: "https://img.drz.lazcdn.com/static/bd/p/66162646534afce47cca3a81f106432d.jpg_400x400q80.jpg_.webp"
    },
    {
        id: 3,
        name: "Parachute SkinPure Lotion",
        price: "৳161",
        discount: "-38%",
        rating: 4.6,
        reviews: 549,
        image: "https://img.drz.lazcdn.com/static/bd/p/66162646534afce47cca3a81f106432d.jpg_400x400q80.jpg_.webp"
    },
    {
        id: 4,
        name: "P47 Wireless Headphone",
        price: "৳349",
        discount: "-37%",
        rating: 4.2,
        reviews: 72,
        image: "https://img.drz.lazcdn.com/static/bd/p/66162646534afce47cca3a81f106432d.jpg_400x400q80.jpg_.webp"
    },
    {
        id: 5,
        name: "Lotto Slide Sandal for Men",
        price: "৳952",
        discount: "-20%",
        rating: 4.7,
        reviews: 484,
        image: "https://img.drz.lazcdn.com/static/bd/p/66162646534afce47cca3a81f106432d.jpg_400x400q80.jpg_.webp"
    },
    {
        id: 6,
        name: "TI Universal Desktop Stand",
        price: "৳105",
        discount: "-60%",
        rating: 4.8,
        reviews: 923,
        image: "https://img.drz.lazcdn.com/static/bd/p/66162646534afce47cca3a81f106432d.jpg_400x400q80.jpg_.webp"
    },
    {
        id: 7,
        name: "TI Universal Desktop Stand",
        price: "৳105",
        discount: "-60%",
        rating: 4.8,
        reviews: 923,
        image: "https://img.drz.lazcdn.com/static/bd/p/66162646534afce47cca3a81f106432d.jpg_400x400q80.jpg_.webp"
    },
    {
        id: 8,
        name: "TI Universal Desktop Stand",
        price: "৳105",
        discount: "-60%",
        rating: 4.8,
        reviews: 923,
        image: "https://img.drz.lazcdn.com/static/bd/p/66162646534afce47cca3a81f106432d.jpg_400x400q80.jpg_.webp"
    },
]; */

export default function RecomendedProduct() {
    const { data, isPending } = useGetAllProducts();
    const router = useRouter()
    if (isPending) return <DynamicLoading />

    const products = data?.data || [];

    return (
        <div className=" py-10">
            <div className="container mx-auto px-6">
                <h2 className="text-2xl font-semibold mb-6">Recommend For You</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                    {products.length && products.map((product: TProduct) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

// <Card
//                             key={product.id}
//                             isPressable
//                             className="shadow-lg hover:shadow-xl transition-shadow rounded-none h-[270px]"
//                             onClick={()=>router.push(`/product/${product.id}`)}
//                         >
//                             <CardHeader className="p-0">
//                                 <img
//                                     src={product.images[0]}
//                                     alt={product.name}
//                                     className="w-full h-40 object-cover"
//                                 />
//                             </CardHeader>
//                             <CardBody className="p-4">
//                                 <h3 className="text-sm font-semibold truncate">
//                                     {product.name}
//                                 </h3>
//                                 <div className="mt-2 flex items-center space-x-2">
//                                     <span className="text-red-500 font-bold">{product.price}</span>
//                                     <span className="text-xs line-through">{`৳${product.price}`}</span>
//                                     <span className="text-xs text-green-500">{product.discount}</span>
//                                 </div>
//                                 <div className="mt-1 flex items-center ">

//                                     {/* {[...Array(5)].map((_, index) => (
//                                         <StarFilledIcon
//                                             key={index}
//                                             className={`w-3 h-3 ${product.rating > index ? "text-yellow-400" : "text-gray-300"
//                                                 }`}
//                                         />
//                                     ))} */}
//                                     {[...Array(5)].map((_, index) => (
//                                         <StarFilledIcon
//                                             key={index}
//                                             className={`w-3 h-3  "text-yellow-400"`}
//                                         />
//                                     ))}

//                                     <span className="text-xs">(5)</span>
//                                 </div>
//                             </CardBody>
//                         </Card>