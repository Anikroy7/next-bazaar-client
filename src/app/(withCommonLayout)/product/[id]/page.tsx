import ProductDetails from "@/src/components/ui/homepage/ProductDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return (
    <>
      <ProductDetails key={id} id={id} />
    </>
  );
}
