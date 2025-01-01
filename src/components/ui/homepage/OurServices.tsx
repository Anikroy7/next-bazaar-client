import Image from "next/image";
import React from "react";

export default function OurServices() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="flex flex-col items-center justify-between border p-6 rounded-lg shadow-lg">
            <Image
              alt="Secure Payments"
              className="h-16 w-16 object-contain"
              height={64}
              src="https://demo2.wpthemego.com/themes/sw_topdeal/layout3/wp-content/themes/topdeal/assets/img/secure.png"
              width={64}
            />
            <h3 className="text-xl font-semibold mt-4 text-center">
              100% Secure Payments
            </h3>
            <p className="text-sm text-gray-500 text-center">
              All major credit & debit cards accepted
            </p>
          </div>

          <div className="flex flex-col items-center justify-between border p-6 rounded-lg shadow-lg">
            <Image
              alt="Help Center"
              className="h-16 w-16 object-contain"
              height={64}
              src="https://demo2.wpthemego.com/themes/sw_topdeal/layout3/wp-content/themes/topdeal/assets/img/help.png"
              width={64}
            />
            <h3 className="text-xl font-semibold mt-4 text-center">
              Help Center
            </h3>
            <p className="text-sm text-gray-500 text-center">
              Got a question? Look no further. Browse our FAQs or submit your
              query here.
            </p>
          </div>

          <div className="flex flex-col items-center justify-between border p-6 rounded-lg shadow-lg">
            <Image
              alt="TrustPay"
              className="h-16 w-16 object-contain"
              height={64}
              src="https://demo2.wpthemego.com/themes/sw_topdeal/layout3/wp-content/themes/topdeal/assets/img/trust.png"
              width={64}
            />
            <h3 className="text-xl font-semibold mt-4 text-center">TrustPay</h3>
            <p className="text-sm text-gray-500 text-center">
              100% Payment Protection. Easy Return Policy.
            </p>
          </div>

          <div className="flex flex-col items-center justify-between border p-6 rounded-lg shadow-lg">
            <Image
              alt="Worldwide Delivery"
              className="h-16 w-16 object-contain"
              height={64}
              src="https://demo2.wpthemego.com/themes/sw_topdeal/layout3/wp-content/themes/topdeal/assets/img/delivery.png"
              width={64}
            />
            <h3 className="text-xl font-semibold mt-4 text-center">
              Worldwide Delivery
            </h3>
            <p className="text-sm text-gray-500 text-center">
              With sites in 5 languages, we ship to over 200 countries &
              regions.
            </p>
          </div>

          <div className="flex flex-col items-center justify-between border p-6 rounded-lg shadow-lg">
            <Image
              alt="Great Value"
              className="h-16 w-16 object-contain"
              height={64}
              src="https://demo2.wpthemego.com/themes/sw_topdeal/layout3/wp-content/themes/topdeal/assets/img/value.png"
              width={64}
            />
            <h3 className="text-xl font-semibold mt-4 text-center">
              Great Value
            </h3>
            <p className="text-sm text-gray-500 text-center">
              We offer competitive prices on our 100 million plus product range.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
