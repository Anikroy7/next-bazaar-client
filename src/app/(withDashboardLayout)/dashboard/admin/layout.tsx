import AdminHeader from "@/src/components/dashboard/admin/AdminHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminHeader />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </>
  );
}
