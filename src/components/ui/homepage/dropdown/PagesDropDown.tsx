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

export default function PagesDropDown() {
  const router = useRouter();

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
                Pages
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className=""
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="recentproducts"
              onClick={() => router.push("/all-products")}
            >
              All Products
            </DropdownItem>
            <DropdownItem
              key="recentproducts"
              onClick={() => router.push("/recent-products")}
            >
              Recenct Products
            </DropdownItem>
            <DropdownItem key="about" onClick={() => router.push("/about")}>
              About
            </DropdownItem>
            <DropdownItem
              key="conatact"
              onClick={() => router.push("/contact")}
            >
              Contact
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </>
  );
}
