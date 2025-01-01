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
    <div className="py-10">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mb-8">Flash Sale</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {prouducts
            ?.slice(0, 4)
            .map(({ id, name, price, discount, images }) => (
              <Link key={id} href={`/product/${id}`}>
                <Card
                  key={name}
                  className="py-4 cursor-pointer w-full h-72" // Fixed height and width
                >
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">{name}</p>
                    <small className="text-default-500">$ {price}</small>
                    <h4 className="font-bold text-large">{discount}%</h4>
                  </CardHeader>
                  <CardBody className="py-2 flex justify-center items-center">
                    <Image
                      alt="Card background"
                      className="rounded-xl object-cover"
                      height={120} // Consistent height for the image
                      width={120}  // Consistent width for the image
                      src={images[0] || "https://nextui.org/images/hero-card-complete.jpeg"}
                    />
                  </CardBody>
                </Card>
              </Link>
            ))}
        </div>
        <div className="text-center py-6 mt-5">
          <Link
            className="my-10 p-3 bg-default-900 text-default rounded-md"
            color="primary"
            href={"/all-flash-products"}
          >
            Visit All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FlashSaleProducts;
