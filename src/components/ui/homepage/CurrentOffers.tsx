import Image from "next/image";
import React from "react";

export default function CurrentOffers() {
  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-8">Current Offers</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
        <Image
          alt="Banner 3"
          src="https://demo2.wpthemego.com/themes/sw_topdeal/layout3/wp-content/uploads/2017/06/banner3.jpg"
          width={400} 
          height={300}
          className="object-cover w-full h-auto"
        />
        <Image
          alt="Banner 4"
          src="https://demo2.wpthemego.com/themes/sw_topdeal/layout3/wp-content/uploads/2017/06/banner4.jpg"
          width={400}
          height={300}
          className="object-cover w-full h-auto"
        />
        <Image
          alt="Banner 5"
          src="https://demo2.wpthemego.com/themes/sw_topdeal/layout3/wp-content/uploads/2017/06/banner5.jpg"
          width={400}
          height={300}
          className="object-cover w-full h-auto"
        />
      </div>

    </div>
  );
}
