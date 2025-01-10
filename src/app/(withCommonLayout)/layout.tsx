import { Navbar } from "@/src/components/navbar";
import Footer from "@/src/components/ui/shared/Footer";
import { Toaster } from "sonner";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <Toaster />
    </>
  );
}
