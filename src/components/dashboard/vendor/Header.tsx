"use client";
import { Button } from "@nextui-org/button";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ThemeSwitch } from "@/src/components/theme-switch";
import { useGetLoogedUserInfo } from "@/src/hooks/user.hook";

const DynamicLoading = dynamic(
  () => import("@/src/components/ui/shared/Loading"),
  {
    ssr: false,
  },
);

export default function Header() {
  const router = useRouter();
  const { data, isPending } = useGetLoogedUserInfo();

  if (isPending) return <DynamicLoading />;

  return (
    <div className="w-full shadow-md border-none mb-4 flex items-center px-4">
      <div className="flex items-center gap-4">
        <Link href={"/dashboard/vendor"}>
          <Image
            alt="Shop Icon"
            className="object-cover rounded-full"
            height={50}
            src={
              data?.data?.logo ||
              "https://www.shutterstock.com/image-vector/shop-icon-store-symbol-flat-600w-293567324.jpg"
            }
            width={50}
          />
        </Link>
        <div className="flex flex-col">
          <div className="text-lg font-bold flex items-center gap-3">
            <p>{data?.data?.name}</p>
            <Button
              className="my-3 rounded-md bg-default-900 text-default"
              radius="sm"
              size="sm"
              variant="flat"
              onClick={() => router.push("/dashboard/vendor/edit")}
            >
              Edit
            </Button>
            <ThemeSwitch />
          </div>
          <p className="text-sm text-gray-600">
            {data?.data?.description.length > 20
              ? `${data?.data?.description.slice(0, 20)}...`
              : data?.data?.description}
          </p>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-6">
        <div className="flex flex-col items-center text-center">
          <p className="text-md font-bold">Phone</p>
          <p className="text-sm font-semibold">{data?.data?.phone}</p>
        </div>
        <div className="border-l border-gray-300 h-10" />
        <div className="flex flex-col items-center text-center">
          <p className="text-md font-bold ">Address</p>
          <p className="text-sm font-semibold">{data?.data?.location}</p>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-6">
        <div className="flex flex-col items-center text-center">
          <p className="text-sm font-bold">Followers</p>
          <p className="text-xl font-semibold">12.4k</p>
        </div>
        <div className="border-l border-gray-300 h-10" />
        <div className="flex flex-col items-center text-center">
          <p className="text-sm font-bold ">Avg. Reviews</p>
          <p className="text-xl font-semibold">4.8/5</p>
        </div>
      </div>
    </div>
  );
}
