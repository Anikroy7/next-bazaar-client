import { Card, CardBody, CardFooter } from "@nextui-org/card";
import React from "react";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { ThemeSwitch } from "@/src/components/theme-switch";


export default function DashboardPage() {
    return (
        

            <div className="w-full shadow-md border-none mb-4 flex items-center px-6">
                <div className="flex items-center gap-4">
                    <Image
                        alt="Shop Icon"
                        className="object-cover rounded-full"
                        height={60}
                        src="https://www.shutterstock.com/image-vector/shop-icon-store-symbol-flat-600w-293567324.jpg"
                        width={60}
                    />
                    <div className="flex flex-col">
                        <div className="text-lg font-bold flex items-center gap-3">
                            <p>Vendor Name</p>
                            <Button
                                className="my-3 rounded-md bg-default-900 text-default"
                                radius="sm"
                                size="sm"
                                variant="flat"
                            >
                                Edit
                            </Button>
                            <ThemeSwitch />

                        </div>
                        <p className="text-sm text-gray-600">
                            We provide the best products and services to meet your needs.
                        </p>
                    </div>
                </div>

                <div className="ml-auto flex items-center gap-6">
                    <div className="flex flex-col items-center text-center">
                        <p className="text-sm font-bold ">Followers</p>
                        <p className="text-xl font-semibold">12.4k</p>
                    </div>
                    <div className="border-l border-gray-300 h-10"></div>
                    <div className="flex flex-col items-center text-center">
                        <p className="text-sm font-bold">Avg. Reviews</p>
                        <p className="text-xl font-semibold">4.8/5</p>
                    </div>
                </div>
            </div>


    );
}