import { Toaster } from "sonner";

import { Navbar } from "@/src/components/navbar";
import Footer from "@/src/components/ui/shared/Footer";

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
