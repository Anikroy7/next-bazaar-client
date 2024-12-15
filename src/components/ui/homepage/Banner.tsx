"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Parallax, Pagination, Navigation } from "swiper/modules";

export default function Banner() {
  return (
    <>
      <Swiper
        /*  style={{
                   '--swiper-navigation-color': '#fff',
                   '--swiper-pagination-color': '#fff',
                 }} */
        className="mySwiper"
        modules={[Parallax, Pagination, Navigation]}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        parallax={true}
        speed={600}
      >
        <div
          className="parallax-bg"
          data-swiper-parallax="-23%"
          slot="container-start"
          style={{
            backgroundImage:
              "url(https://m.media-amazon.com/images/I/71k7R47IAIL._SX3000_.jpg)",
          }}
        />

        <SwiperSlide>
          <div
            className="relative text-white bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/path-to-your-black-background-image.jpg')",
              height: "100%",
              marginTop: "180px",
            }}
          >
            <div className="bg-black/50 h-full flex flex-col justify-center items-center p-6">
              <div
                className="title text-4xl font-bold mb-4"
                data-swiper-parallax="-300"
              >
                Exclusive Deals
              </div>
              <div
                className="subtitle text-xl text-gray-300 mb-6"
                data-swiper-parallax="-200"
              >
                Up to 50% Off on Top Brands
              </div>
              <div
                className="text text-gray-400 leading-relaxed text-center max-w-2xl"
                data-swiper-parallax="-100"
              >
                <p>
                  Discover the latest trends in fashion, electronics, and home
                  essentials at unbeatable prices. Don’t miss this opportunity
                  to save big!
                </p>
              </div>
              <div className="mt-6">
                <button className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200">
                  Explore Deals
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="relative text-white bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/path-to-your-black-background-image.jpg')",
              height: "100%",
              marginTop: "150px",
            }}
          >
            <div className="bg-black/50 h-full flex flex-col justify-center items-center p-6">
              <div
                className="title text-4xl font-bold mb-4"
                data-swiper-parallax="-300"
              >
                New Arrivals
              </div>
              <div
                className="subtitle text-xl text-gray-300 mb-6"
                data-swiper-parallax="-200"
              >
                Fresh Styles for the Season
              </div>
              <div
                className="text text-gray-400 leading-relaxed text-center max-w-2xl"
                data-swiper-parallax="-100"
              >
                <p>
                  Explore our handpicked collection of the latest styles and
                  must-have products. Upgrade your wardrobe and gadgets today!
                </p>
              </div>
              <div className="mt-6">
                <button className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="relative text-white bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/path-to-your-black-background-image.jpg')",
              height: "100%",
              marginTop: "150px",
            }}
          >
            <div className="bg-black/50 h-full flex flex-col justify-center items-center p-6">
              <div
                className="title text-4xl font-bold mb-4"
                data-swiper-parallax="-300"
              >
                Flash Sale
              </div>
              <div
                className="subtitle text-xl text-gray-300 mb-6"
                data-swiper-parallax="-200"
              >
                Deals You Can’t Miss
              </div>
              <div
                className="text text-gray-400 leading-relaxed text-center max-w-2xl"
                data-swiper-parallax="-100"
              >
                <p>
                  Don’t wait! Grab our best deals at jaw-dropping prices.
                  Limited stock available, so act fast before it’s too late.
                </p>
              </div>
              <div className="mt-6">
                <button className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200">
                  Shop Flash Sale
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
