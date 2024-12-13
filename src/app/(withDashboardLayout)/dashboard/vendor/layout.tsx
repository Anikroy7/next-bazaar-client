import Header from "@/src/components/dashboard/vendor/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </>
  );
}
