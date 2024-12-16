import { Navbar } from "@/src/components/navbar";
import Cart from "@/src/components/ui/cart/Cart";
import Footer from "@/src/components/ui/shared/Footer";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <Cart />
      {children}
      <Footer/>
    </>
  );
}
