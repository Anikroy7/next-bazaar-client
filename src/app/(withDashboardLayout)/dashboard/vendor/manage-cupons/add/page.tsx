"use client";
import dynamic from "next/dynamic";

const DynamicLoading = dynamic(
  () => import("@/src/components/ui/shared/Loading"),
  {
    ssr: false,
  },
);

import React, { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { TProduct } from "@/src/types";
import NBForm from "@/src/components/ui/form/NBForm";
import NBInput from "@/src/components/ui/form/NBInput";
import { cuponValidationSchema } from "@/src/validation/cupon.validation";
import { useCreateCupon } from "@/src/hooks/cupon.hook";
import {
  useGetLoogedUserInfo,
  useGetSingleVendor,
} from "@/src/hooks/user.hook";

type SelecteProduct = {
  id: number;
  name: string;
  image: string;
};

export default function AddCupon() {
  const router = useRouter();
  const { data: loogedData, isPending: loogedPending } = useGetLoogedUserInfo();
  const { data, isPending } = useGetSingleVendor(loogedData?.data?.id);
  const {
    mutate: createCupon,
    isPending: createCuponPending,
    data: createdData,
  } = useCreateCupon();
  const productsDropdownLists: SelecteProduct[] = [];
  const [productIds, setProductIds] = useState("");

  data?.data?.products?.forEach((element: TProduct) => {
    productsDropdownLists.push({
      id: element.id,
      name: element.name,
      image: element.images[0],
    });
  });

  useEffect(() => {
    if (!createCuponPending && createdData) {
      router.push("/dashboard/vendor/manage-cupons");
    }
  }, [createdData, createCuponPending]);

  const onSubmit = (data: FieldValues) => {
    const ids = productIds.split(",");
    const cuponData = {
      ...data,
      isActive: true,
      discountAmount: parseInt(data?.discountAmount),
      productIds: ids.map((id: string) => parseInt(id)),
    };

    createCupon(cuponData);
  };
  const handleSelectionChange = (e: any) => {
    setProductIds(e.target.value);
  };

  if (loogedPending || isPending) return <DynamicLoading />;

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6 text-center">Add Cupon</h1>

      <div className="flex w-full flex-col items-center justify-center">
        <div className="w-[70%]">
          <Select
            items={productsDropdownLists}
            label="Cupon Assigned to"
            labelPlacement="outside"
            placeholder="Select products"
            selectionMode="multiple"
            onChange={handleSelectionChange}
          >
            {(user) => (
              <SelectItem key={user.id} className="flex" textValue={user.name}>
                <div className="flex gap-2 items-center">
                  <Avatar
                    alt={user.name}
                    className="flex-shrink-0"
                    size="sm"
                    src={user.image}
                  />
                  <div className="flex flex-col">
                    <span className="text-small">{user.name}</span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
          <NBForm
            resolver={zodResolver(cuponValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <NBInput label="Code" name="code" size="sm" />
            </div>
            <div className="py-3">
              <NBInput
                label="Discount Amount"
                name="discountAmount"
                size="sm"
              />
            </div>
            {createCuponPending ? (
              <Button
                isLoading
                className="my-3 w-full rounded-md bg-default-900 text-default"
                size="lg"
                type="submit"
              >
                Adding...
              </Button>
            ) : (
              <Button
                className="my-3 w-full rounded-md bg-default-900 text-default"
                size="lg"
                type="submit"
              >
                Add
              </Button>
            )}
          </NBForm>
        </div>
      </div>
    </>
  );
}
