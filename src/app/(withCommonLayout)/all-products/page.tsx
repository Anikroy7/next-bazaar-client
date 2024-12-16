"use client"

import { SearchIcon } from "@/src/components/icons";
import ProductCard from "@/src/components/products/ProductCard";
import { useGetAllProducts } from "@/src/hooks/product.hook";
import { TCategory, TProduct } from "@/src/types";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Slider } from "@nextui-org/slider";
import dynamic from "next/dynamic";
import { useState } from "react";
const DynamicLoading = dynamic(
  () => import("@/src/components/ui/shared/Loading"),
  {
    ssr: false,
  },
);




export default function FilterPage() {
  const { data, isPending } = useGetAllProducts();
  const [priceRange, setPriceRange] = useState<number | number[]>(0)
  const categories: TCategory[] = []

  if (isPending) return <DynamicLoading />;
  const products = data?.data?.data || [];

  // const categories = products?.map((product: TProduct) => ({
  //   id: product.category.id,
  //   name: product.category.name
  // }))

  products?.forEach((pd: TProduct) => {
    if (categories.length > 0) {
      categories.forEach((cg: TCategory) => {
        if (cg.id === pd.category.id) {
          categories.push({
            id: pd.category.id,
            name: pd.category.name
          })
        }
      })
    } else {
      categories.push({
        id: pd.category.id,
        name: pd.category.name
      })
    }
  });


  console.log(products, categories)
  return (
    <div className="min-h-screen  flex flex-col">
      <header className=" py-6">
        <div className="container mx-auto flex justify-center px-10">
          <Input
            className="w-[50%]"
            placeholder="Type to search..."
            size="md"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
        </div>
      </header>

      <div className="container mx-auto flex flex-col lg:flex-row gap-8 py-10 ">

        <div className="lg:w-1/3 shadow-md px-6 rounded-lg sticky top-6">


          <div className="">
            <Select /* onChange={(e)=>} */ fullWidth placeholder="Select Category">

             {/*  {
                categories.map((cg: TCategory) => <SelectItem key={cg.id} value={cg.id}>{cg.name}</SelectItem >)
              } */}

              <SelectItem value="clothing">Clothing</SelectItem >
              <SelectItem value="home">Home</SelectItem >
            </Select>
          </div>

          <div className="mt-6">

            <Slider
              className="max-w-md"
              defaultValue={100}
              label="Price Range"
              maxValue={100000}
              minValue={100}
              step={200}
              color="foreground"
              onChange={(e) => setPriceRange(e)}
            />
            <div className="flex justify-between text-sm my-3">
              <span>$100</span>
              <span>$100000</span>
            </div>
          </div>

          <div className="mt-6">
            <Button className="my-3 w-full rounded-md bg-default-900 text-default"
            >Apply Filters</Button>
          </div>
        </div>
        {data?.data && products.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {products.map((product: TProduct) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-xl text-gray-600">No products found!!</p>
        )}

      </div>
    </div>

  );
}
