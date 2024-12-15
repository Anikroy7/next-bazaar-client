import { Navbar } from "@/src/components/navbar";
import Cart from "@/src/components/ui/cart/Cart";

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
    </>
  );
}
