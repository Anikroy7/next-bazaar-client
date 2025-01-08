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

export default function BannerSwiper() {
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
            className="object-cover"
            height={500}
            src="https://demo2.wpthemego.com/themes/sw_topdeal/layout3/wp-content/uploads/2017/07/slider-31.jpg"
            width={1920}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt="Slide 2"
            className="w-full h-full object-cover"
            height={1920}
            src="https://demo2.wpthemego.com/themes/sw_topdeal/layout3/wp-content/uploads/2017/07/slider-32.jpg"
            width={1920}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt="Slide 3"
            className="w-full h-full object-cover"
            height={1920}
            src="https://demo2.wpthemego.com/themes/sw_topdeal/layout3/wp-content/uploads/2017/07/slider-33.jpg"
            width={1920}
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
