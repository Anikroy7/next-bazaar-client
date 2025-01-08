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
import { useAllVendorInfo } from "@/src/hooks/user.hook";
import { User as UserType } from "@/src/types";

export default function ShopDropDown() {
  const router = useRouter();
  const { data, isPending } = useAllVendorInfo();

  if (isPending) return <p>Loading...</p>;

  const shops = data?.data || [];

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
                Shops
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            {shops.map((user: UserType) => (
              <DropdownItem
                key={user?.id}
                onClick={() => router.push(`/vendor/${user?.vendor?.id}`)}
              >
                {/*  <User
                  avatarProps={{
                    src: `${user?.vendor?.logo}`,
                  }}
                  name={user?.vendor?.name}
                />
 */}
                {user?.vendor?.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </>
  );
}
