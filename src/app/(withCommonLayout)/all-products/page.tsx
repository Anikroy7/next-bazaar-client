"use client";

import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { Slider } from "@nextui-org/slider";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { useGetSearchedProduct } from "@/src/hooks/product.hook";
import { TCategory, TProduct } from "@/src/types";
import { useGetAllCategories } from "@/src/hooks/categories.hook";
import ProductCard from "@/src/components/products/ProductCard";
import GetProductBYSearch from "@/src/components/ui/shared/GetProductBYSearch";

const DynamicLoading = dynamic(
  () => import("@/src/components/ui/shared/Loading"),
  {
    ssr: false,
  },
);

function FilterPage() {
  const searchParams = useSearchParams();

  const search = searchParams.get("categoryId");
  const [priceRange, setPriceRange] = useState<number | number[]>(0);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState<string>(search || "");
  const { data: categories, isPending: categoriesPending } =
    useGetAllCategories();

  const {
    mutate: handleGetS,
    data: sData,
    isPending: spending,
    isSuccess,
  } = useGetSearchedProduct();

  useEffect(() => {
    if (!spending && sData && isSuccess) {
      setProducts(sData?.data?.data || []);
    }
  }, [isSuccess, sData, spending]);

  useEffect(() => {
    handleGetS({
      categoryId: category,
    });
  }, []);

  const handleApplyFilters = () => {
    handleGetS({
      categoryId: category || "",
      priceRange: priceRange || "",
    });
  };

  if (categoriesPending) return <DynamicLoading />;

  return (
    <div className="min-h-screen  flex flex-col">
      <GetProductBYSearch />
      <div className="container mx-auto flex flex-col lg:flex-row gap-8 py-10 ">
        <div className="lg:w-1/3 shadow-md px-6 rounded-lg sticky top-6">
          <div className="">
            <Select
              fullWidth
              label="Select an Category"
              placeholder="Select Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories?.data?.length > 0 ? (
                categories?.data?.map((cg: TCategory) => (
                  <SelectItem
                    key={cg.id}
                    aria-label={`Category: ${cg.name}`}
                    value={cg.id}
                  >
                    {cg.name}
                  </SelectItem>
                ))
              ) : (
                <p>No categories available</p>
              )}
            </Select>
          </div>

          <div className="mt-6">
            <Slider
              className="max-w-md"
              color="foreground"
              defaultValue={200}
              label="Price Range"
              maxValue={10000}
              minValue={200}
              step={200}
              onChange={(e) => setPriceRange(e)}
            />
            <div className="flex justify-between text-sm my-3">
              <span>$200</span>
              <span>$1000</span>
            </div>
          </div>

          <div className="mt-6">
            <Button
              className="my-3 w-full rounded-md bg-default-900 text-default"
              onClick={() => handleApplyFilters()}
            >
              Apply Filters
            </Button>
          </div>
        </div>
        {sData?.data && products.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {products.map((product: TProduct) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-xl text-gray-600">
            No products found!!
          </p>
        )}
      </div>
    </div>
  );
}


const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FilterPage />
    </Suspense>
  );
};

export default Page;
