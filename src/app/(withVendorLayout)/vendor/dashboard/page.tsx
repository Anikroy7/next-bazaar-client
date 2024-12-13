import { Card, CardBody, CardFooter } from "@nextui-org/card";
import React from "react";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Navigation from "@/src/components/vendor/Navigation";


export default function DashboardPage() {
    return (
        <div
            className="w-full bg-cover bg-center"
        >

            <Card className=" w-full shadow-xl border-none mb-6">
                <CardBody className="p-3 flex flex-col items-center border-none">
                    <div className="flex flex-col items-center mb-6">
                        <Card isFooterBlurred className="border-none" radius="none">
                            <Image
                                alt="Woman listing to music"
                                className="object-cover"
                                height={180}
                                src="https://www.shutterstock.com/image-vector/shop-icon-store-symbol-flat-600w-293567324.jpg"
                                width={180}
                            />
                            <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                                <Button
                                    className="text-tiny text-white bg-black"
                                    color="default"
                                    radius="lg"
                                    size="sm"
                                    variant="flat"
                                >
                                    Edit
                                </Button>
                            </CardFooter>
                        </Card>
                        <h1 className="text-3xl font-bold">Vendor Name</h1>
                        <p className="text-gray-600 text-center">
                            We provide the best products and services to meet your needs. Our
                            mission is to deliver excellence every time.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col items-center">
                            <p className="text-medium font-bold">Followers</p>
                            <p className="text-xl">12.4k</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-medium font-bold">Avg. Reviews</p>
                            <p className="text-xl">4.8/5</p>
                        </div>
                    </div>

                </CardBody>
            </Card>

            <Navigation />
        </div>
    );
}