"use client"
import { useGetAllCategories } from "@/src/hooks/category.hook";
import { ICategory } from "@/src/types";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import dynamic from "next/dynamic";

const DynamicLoading = dynamic(() => import('@/src/components/ui/shared/Loading'), {
    ssr: false,
})

const categories = [
    { id: 1, name: "Electronics", image: "https://img.drz.lazcdn.com/static/bd/p/f4d41b2adf02766c2042b1cd6d476e73.png_170x170q80.png" },
    { id: 2, name: "Fashion", image: "https://img.drz.lazcdn.com/static/bd/p/6492e773a7ab9006ffff8fb076bce885.jpg_170x170q80.jpg" },
    { id: 3, name: "Home Appliances", image: "https://img.drz.lazcdn.com/static/bd/p/f767676addab269e9f508f6ce8cedc91.jpg_170x170q80.jpg" },
    { id: 4, name: "Beauty", image: "https://img.drz.lazcdn.com/static/bd/p/85b978e52489d46bda36545e4b11f411.jpg_170x170q80.jpg" },
    { id: 5, name: "Toys", image: "https://img.drz.lazcdn.com/static/bd/p/bb1ac16d158408b17b6c246636aeffd1.jpg_170x170q80.jpg" },
];

export default function Category() {
    const { data, isPending } = useGetAllCategories();
    if (isPending) return <DynamicLoading />
    console.log(data)
    return (
        <div className="py-10">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                    {(data?.data && data?.data.length) ? data?.data.map((category:ICategory) => (
                        <Card
                            key={category.id}
                            isPressable
                            className=" hover:scale-105 transition-transform rounded-none p-3"
                        >
                            <CardHeader className="p-0 flex justify-center items-center">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-20 h-20 object-cover  border-gray-300"
                                />
                            </CardHeader>
                            <CardBody className="flex flex-col items-center">
                                <h3 className="text-md font-semibold text-center">
                                    {category.name}
                                </h3>
                                {/*  <p className="text-sm text-gray-500 text-center mt-1">
                                    Explore our best collection
                                </p> */}
                            </CardBody>
                        </Card>

                    )) : ""}
                </div>
            </div>
        </div>
    );
}
