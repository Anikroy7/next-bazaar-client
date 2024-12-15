"use client"

import Banner from "@/src/components/ui/homepage/Banner";
import Category from "@/src/components/ui/homepage/Category";
import FlashSaleProducts from "@/src/components/ui/homepage/FlashSaleProducts";
import RecomendedProduct from "@/src/components/ui/homepage/RecomendedProdut";
import ScrollToTop from "@/src/components/ui/homepage/ScrollToTop";


export default function Home() {
  
  return (
    <>
      <Banner></Banner>
      <Category />
      <RecomendedProduct />
      <FlashSaleProducts />
      <ScrollToTop />
    </>
  );
}
