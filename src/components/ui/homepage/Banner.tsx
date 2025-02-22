"use client";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";

import BannerSwiper from "./Swiper";

export default function Banner() {
  const router = useRouter();

  return (
    <>
      <div className="grid grid-cols-12 lg:gap-2 gap-4 mt-5">
        {/* Left Section */}
        <div className="lg:col-span-7 col-span-12">
          <BannerSwiper />
        </div>

        {/* Right Section */}
        <div className="lg:col-span-5 col-span-12 grid lg:grid-rows-2 gap-4 lg:px-2 px-0">
          {/* Row 1 */}
          <div className="flex lg:gap-2 gap-4 lg:flex-row">
            <div className="relative lg:w-1/2 w-full">
              <div className="pt-[65%] relative w-full h-0">
                {" "}
                {/* Aspect Ratio 16:9 */}
                <Image
                  priority
                  alt="Banner 31"
                  className="absolute inset-0 w-full h-full object-fill cursor-pointer"
                  height={170}
                  src="https://www.banglashoppers.com/pub/media/wysiwyg/banner/home-right/abny-300X170.jpg"
                  width={300}
                  onClick={() => router.push(`all-products?categoryId=5`)}
                />
              </div>
            </div>
            <div className="relative lg:w-1/2 w-full">
              <div className="pt-[65%] relative w-full h-0">
                <Image
                  priority
                  alt="Banner 32"
                  className="absolute inset-0 w-full h-full object-fill cursor-pointer"
                  height={170}
                  src="https://www.banglashoppers.com/pub/media/wysiwyg/banner/home-right/simple-300-X-170.jpg"
                  width={300}
                  onClick={() => router.push(`all-products?categoryId=5`)}
                />
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex lg:gap-2 gap-4 lg:flex-row">
            <div className="relative lg:w-1/2 w-full">
              <div className="pt-[65%] relative w-full h-0">
                <Image
                  priority
                  alt="Banner 33"
                  className="absolute inset-0 w-full h-full object-fill cursor-pointer"
                  height={170}
                  src="https://www.banglashoppers.com/pub/media/wysiwyg/banner/home-right/boots-300-x-170.jpg"
                  width={300}
                  onClick={() => router.push(`all-products?categoryId=5`)}
                />
              </div>
            </div>
            <div className="relative lg:w-1/2 w-full">
              <div className="pt-[65%] relative w-full h-0">
                <Image
                  priority
                  alt="Banner 34"
                  className="absolute inset-0 w-full h-full object-fill cursor-pointer"
                  height={170}
                  src="https://dropshop.com.bd/wp-content/uploads/2024/12/WGP-Banner-Design_BDSHOP.jpg"
                  width={300}
                  onClick={() => router.push(`all-products?categoryId=1`)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
