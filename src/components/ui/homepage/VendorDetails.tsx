"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

import ProductCard from "../../products/ProductCard";

import { TProduct } from "@/src/types";
import { useGetLoogedUserInfo, useGetSingleVendor } from "@/src/hooks/user.hook";
import { Button } from "@nextui-org/button";
import { useCreateVendorFollow, useIsVendorFollow, useRemoveVendorFollow } from "@/src/hooks/vendorFollow.hook";
import { useUser } from "@/src/context/user.prodvier";

const DynamicLoading = dynamic(
  () => import("@/src/components/ui/shared/Loading"),
  {
    ssr: false,
  },
);

const VendorDetails = ({ id }: { id: string }) => {
  const { user } = useUser();
  const { data: loogedUser, isPending: loogedUserPending } = useGetLoogedUserInfo()
  const { data, isPending } = useGetSingleVendor(id);
  const [isFollowed, setIsFollowed] = React.useState(false);
  const { mutate: handleCreateVFHandler, isError: isErrorCVF } = useCreateVendorFollow()
  const { mutate: handleRemoveVFHandler, isError: isErrorRVF } = useRemoveVendorFollow()

  const { mutate: handleIsFollwed, data: isFollowedData, isPending: isFollwedPending } = useIsVendorFollow();


  useEffect(() => {
    if (data?.data?.id && loogedUser?.data?.id) {
      handleIsFollwed({
        vendorId: data?.data?.id,
        customerId: loogedUser?.data?.id,
      });
    }
    if (isErrorCVF || isErrorRVF) {
      setIsFollowed(!isFollowed)
    }
  }, [data, loogedUser, handleIsFollwed]);

  useEffect(() => {
    if (isFollowedData?.data) {
      setIsFollowed(true)
    }
  }, [isFollwedPending, isFollowedData])

  const handleCreateVF = () => {
    if (isFollowed) {
      handleRemoveVFHandler({
        vendorId: data?.data?.id,
        customerId: loogedUser?.data?.id
      })
    } else {
      handleCreateVFHandler({
        vendorId: data?.data?.id,
        customerId: loogedUser?.data?.id
      })
    }
    setIsFollowed(!isFollowed)

  }



  if (isPending || loogedUserPending) return <DynamicLoading />;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className=" shadow rounded-lg p-6">
        {/* Vendor Header Section */}
        <div className="flex items-center mb-6">
          <Image
            alt="Vendor Logo"
            className="w-20 h-20 rounded-full border border-gray-200"
            height={80}
            src={data?.data?.logo}
            width={80}
          />
          <div className="ml-4">
            <h1 className="text-2xl font-bold">{data?.data?.name}</h1>
            <p className="text-gray-400">{data?.data?.location}</p>
          </div>
          {user?.role === "CUSTOMER" && <div className="ml-4">
            {
              isFollowed ? <Button
                className={"bg-transparent text-foreground border-default-200"}
                color="primary"
                radius="full"
                size="lg"
                variant={"faded"}
                onClick={() => handleCreateVF()}
              // onPress={() => setIsFollowed(!isFollowed)}
              >
                Unfollow
              </Button> : <Button
                className={""}
                color="primary"
                radius="full"
                size="lg"
                variant={"solid"}
                onClick={() => handleCreateVF()}
              // onPress={() => setIsFollowed(!isFollowed)}
              >
                Follow
              </Button>
            }


          </div>}
        </div>

        {/* Vendor Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold">Description</h2>
            <p className=" mt-2">{data?.data?.description}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Contact Information</h2>
            <ul className="mt-2 space-y-1">
              <li>
                <strong>Email:</strong> {data?.data?.email}
              </li>
              <li>
                <strong>Phone:</strong> {data?.data?.phone}
              </li>
            </ul>
          </div>
        </div>


        {/* Vendor Products Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Products</h2>
          <div className="">
            {data?.data.products && data?.data.products?.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data?.data.products.map((product: TProduct) => (
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
      </div>
    </div>
  );
};

export default VendorDetails;
