"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";

import { TProduct } from "@/src/types";
import { useGetAllProducts } from "@/src/hooks/product.hook";

const DynamicLoading = dynamic(
  () => import("@/src/components/ui/shared/Loading"),
  { ssr: false },
);

const FlashSaleProducts = () => {
  const { data, isPending } = useGetAllProducts();

  if (isPending) <DynamicLoading />;

  const prouducts: TProduct[] = data?.data?.data || [];

  return (
    <div className="py-16 ">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          All Flash Sale Products
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {prouducts?.map(({ id, name, price, discount, images }) => (
            <Link key={id} href={`/product/${id}`}>
              <Card key={name} className="py-4 cursor-pointer">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <p className="text-tiny uppercase font-bold">
                    {name.length > 40 ? `${name.slice(0, 40)}...` : name}
                  </p>
                  <small className="text-default-500">$ {price}</small>
                  <h4 className="font-bold text-large">{discount}%</h4>
                </CardHeader>
                <CardBody className="py-2 flex justify-center items-center">
                  <Image
                    alt="Card background"
                    className="rounded-xl object-cover"
                    height={150}
                    src={
                      images[0] ||
                      "https://nextui.org/images/hero-card-complete.jpeg"
                    }
                    width={150}
                  />
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashSaleProducts;
