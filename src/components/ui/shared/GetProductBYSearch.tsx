import { Input } from "@nextui-org/input";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { SearchIcon } from "../../icons";

import { useGetSearchedProduct } from "@/src/hooks/product.hook";
import useDebounce from "@/src/hooks/debounce.hook";

interface Product {
  id: number;
  name: string;
  images: string[];
}

export default function GetProductBYSearch() {
  const router = useRouter();
  const { register, watch } = useForm();
  const searchField = watch("searchField");
  const searchValue = useDebounce(searchField, 500);

  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const {
    mutate: handleGetSearchedProducts,
    isPending,
    isSuccess,
    data,
  } = useGetSearchedProduct();

  useEffect(() => {
    if (!isPending && data && isSuccess) {
      setShowDropdown(true);
      setSuggestions(data?.data?.data);
    }
  }, [isSuccess, data, isPending]);

  useEffect(() => {
    if (searchValue) {
      handleGetSearchedProducts({
        searchTerm: searchValue,
      });
    } else {
      setShowDropdown(false);
    }
  }, [searchValue]);

  return (
    <div className="relative">
      <header className="py-6">
        <div className="container mx-auto flex justify-center px-4">
          <Input
            {...register("searchField")}
            className="w-[70%]"
            placeholder="Search for products..."
            size="md"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
        </div>
      </header>

      {showDropdown && suggestions.length > 0 && (
        <div className="absolute top-[70px] left-1/2 -translate-x-1/2 w-full max-w-lg bg-white shadow-lg rounded-lg z-50 p-4">
          <div className="flex flex-col gap-3">
            {suggestions.map((product) => (
              <div
                key={product.id}
                role="button"
                tabIndex={0}
                className="flex items-center p-3 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100 cursor-pointer"
                onClick={() => router.push(`/product/${product.id}`)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    router.push(`/product/${product.id}`);
                  }
                }}
              >
                <Image
                  alt={product.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  height={48}
                  src={product.images[0]}
                  width={48}
                />
                <span className="text-gray-800 text-sm font-medium">
                  {product.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {showDropdown && suggestions.length === 0 && (
        <div className="absolute top-[90px] left-1/2 -translate-x-1/2 w-full max-w-md bg-white shadow-lg rounded-lg z-50 p-4 text-center">
          <span className="text-gray-600 text-sm">No results found</span>
        </div>
      )}
    </div>
  );
}
