"use client";

import Banner from "@/src/components/ui/homepage/Banner";
import Category from "@/src/components/ui/homepage/Category";
import CurrentOffers from "@/src/components/ui/homepage/CurrentOffers";
import FlashSaleProducts from "@/src/components/ui/homepage/FlashSaleProducts";
import FollowUs from "@/src/components/ui/homepage/FollowUs";
import NewsLetter from "@/src/components/ui/homepage/NewsLetter";
import OurServices from "@/src/components/ui/homepage/OurServices";
import RecomendedProduct from "@/src/components/ui/homepage/RecomendedProdut";
import ScrollToTop from "@/src/components/ui/homepage/ScrollToTop";

export default function Home() {
  return (
    <>
      <Banner />
      <Category />
      <RecomendedProduct />
      <FlashSaleProducts />
      <OurServices />
      <CurrentOffers />
      <FollowUs />
      <NewsLetter />
      <ScrollToTop />
    </>
  );
}
