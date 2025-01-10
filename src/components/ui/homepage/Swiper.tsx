import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BannerSwiper() {
  const router = useRouter()
  return (
    <>
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect={"fade"}
        loop={true}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        navigation={false}
        pagination={{
          clickable: true,
        }}
        spaceBetween={30}
        style={{
          width: "100%",
          height: "auto",
        }}
      >
        <SwiperSlide>
          <Image
            priority
            alt="Slide 1"
            className="object-cover cursor-pointer"
            height={1920}
            src="https://demo2.wpthemego.com/themes/sw_topdeal/layout3/wp-content/uploads/2017/07/slider-31.jpg"
            width={1920}
            onClick={() => router.push(`all-products?categoryId=2`)}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt="Slide 2"
            className="w-full h-full object-cover cursor-pointer"
            height={1920}
            src="https://demo2.wpthemego.com/themes/sw_topdeal/layout3/wp-content/uploads/2017/07/slider-32.jpg"
            width={1920}
            onClick={() => router.push(`all-products?categoryId=1`)}

          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt="Slide 3"
            className="w-full h-full object-cover cursor-pointer"
            height={1920}
            src="https://demo2.wpthemego.com/themes/sw_topdeal/layout3/wp-content/uploads/2017/07/slider-33.jpg"
            width={1920}
            onClick={() => router.push(`all-products?categoryId=5`)}
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
