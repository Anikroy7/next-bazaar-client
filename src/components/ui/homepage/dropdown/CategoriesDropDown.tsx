"use client";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { NavbarContent, NavbarItem } from "@nextui-org/navbar";
import React from "react";
import { useRouter } from "next/navigation";

import { ChevronDown } from "@/src/components/icons";
import { useGetAllCategories } from "@/src/hooks/categories.hook";
import { TCategory } from "@/src/types";

export default function CategoriesDropDown() {
  const { data, isPending: categoriesPending } = useGetAllCategories();
  const router = useRouter();
  const handleNaviagte = (id: number) => {
    router.push(`/all-products/?categoryId=${id}`);
  };

  if (categoriesPending) return <p>Loading...</p>;
  const categories = data?.data || [];

  return (
    <>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-[16px]"
                endContent={<ChevronDown fill="currentColor" size={16} />}
                radius="sm"
                variant="light"
              >
                Categories
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            itemClasses={{
              base: "gap-4",
            }}
          >
            {categories.map((category: TCategory) => (
              <DropdownItem
                key={category.id}
                onClick={() => handleNaviagte(category.id)}
              >
                {category.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </>
  );
}
