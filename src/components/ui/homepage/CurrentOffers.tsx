import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function CurrentOffers() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-8">Current Offers</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
        <Image
          alt="Banner 3"
          className="object-cover w-full h-auto cursor-pointer"
          height={300}
          src="https://demo2.wpthemego.com/themes/sw_topdeal/layout3/wp-content/uploads/2017/06/banner3.jpg"
          width={400}
          onClick={() => router.push(`all-products?categoryId=5`)}
        />
        <Image
          alt="Banner 4"
          className="object-cover w-full h-auto cursor-pointer"
          height={300}
          src="https://demo2.wpthemego.com/themes/sw_topdeal/layout3/wp-content/uploads/2017/06/banner4.jpg"
          width={400}
          onClick={() => router.push(`all-products?categoryId=5`)}
        />
        <Image
          alt="Banner 5"
          className="object-cover w-full h-auto cursor-pointer"
          height={300}
          src="https://demo2.wpthemego.com/themes/sw_topdeal/layout3/wp-content/uploads/2017/06/banner5.jpg"
          width={400}
          onClick={() => router.push(`all-products?categoryId=5`)}
        />
      </div>
    </div>
  );
}
