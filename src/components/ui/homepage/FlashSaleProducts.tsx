import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import Image from "next/image";

const FlashSaleProducts = () => {
    const flashSaleProducts = [
        { id: 1, name: "Wireless Headphones", price: "৳2499", discount: "30%", image: "https://img.drz.lazcdn.com/g/kf/S845f70adde8c42d2b30742023a242411s.jpg_400x400q80.jpg_.webp" },
        { id: 2, name: "Smart Watch", price: "৳1599", discount: "25%", image: "https://img.drz.lazcdn.com/static/bd/p/567a885ee126e80c14fc81ece53c5990.jpg_400x400q80.jpg_.webp" },
        { id: 3, name: "Portable Speaker", price: "৳1299", discount: "40%", image: "https://img.drz.lazcdn.com/g/kf/S0e10e7ba0ea243558debc785b925d53cT.jpg_400x400q80.jpg_.webp" },
        // Add more products as needed
    ];

    return (
        <div className="py-16 ">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-8">Flash Sale</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {flashSaleProducts.map(({ name, price, discount }) => (
                        <Card key={name} className="py-4">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <p className="text-tiny uppercase font-bold">{name}</p>
                                <small className="text-default-500">$ {price}</small>
                                <h4 className="font-bold text-large">{discount}%</h4>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                <img
                                    alt="Card background"
                                    className="object-cover rounded-xl"
                                    src={"https://nextui.org/images/hero-card-complete.jpeg"}
                                    width={270}
                                    height={170}
                                />
                            </CardBody>
                        </Card>
                    ))}
                </div>
                <div className="text-center">
                    <Button color="primary" variant="flat" size="sm" className="my-10">

                        <Link isExternal showAnchorIcon href="https://github.com/nextui-org/nextui">
                            Visit All
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FlashSaleProducts;
