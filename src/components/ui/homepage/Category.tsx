"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useGetAllCategories } from "@/src/hooks/category.hook";
import { ICategory } from "@/src/types";

const DynamicLoading = dynamic(
  () => import("@/src/components/ui/shared/Loading"),
  {
    ssr: false,
  },
);

export default function Category() {
  const router = useRouter();
  const { data, isPending } = useGetAllCategories();

  if (isPending) return <DynamicLoading />;
  const handleNaviagte = (id: number) => {
    router.push(`/all-products/?categoryId=${id}`);
  };

  return (
    <div className="py-10">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {data?.data && data?.data.length
            ? data?.data.map((category: ICategory) => (
                <Card
                  key={category.id}
                  isPressable
                  className=" hover:scale-105 transition-transform rounded-none p-3"
                  onClick={() => handleNaviagte(category.id)}
                >
                  <CardHeader className="p-0 flex justify-center items-center">
                    <Image
                      alt={category.name}
                      className="w-20 h-20 object-cover  border-gray-300"
                      height={80}
                      src={category.image}
                      width={80}
                    />
                  </CardHeader>
                  <CardBody className="flex flex-col items-center">
                    <h3 className="text-md font-semibold text-center">
                      {category.name}
                    </h3>
                  </CardBody>
                </Card>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}
