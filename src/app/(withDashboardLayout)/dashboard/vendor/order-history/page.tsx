"use client";

import { useGetOrdersForVendor } from "@/src/hooks/order.hook";
import { useGetLoogedUserInfo } from "@/src/hooks/user.hook";
import { TVendorOrder } from "@/src/types";
import { Badge } from "@nextui-org/badge";
import dynamic from "next/dynamic";
import React from "react";

const DynamicLoading = dynamic(() => import("@/src/components/ui/shared/Loading"), {
  ssr: false,
});

export default function OrderHistoryPage() {
  const { data, isPending } = useGetLoogedUserInfo();
  const { data: orders, isPending: ordersPending } = useGetOrdersForVendor(data?.data?.id);

  if (isPending || ordersPending) return <DynamicLoading />;
console.log(orders)
  if (!orders?.data?.length) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-lg text-gray-500">No orders found!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold  mb-6">Order History</h1>
      <div className="grid gap-6 lg:grid-cols-2">
        {orders.data.map((order:TVendorOrder) => (
          <div
            key={order.id}
            className="p-6  rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold ">
                Order #{order.id}
              </h2>
              <Badge
                color={order.paymentStatus === "SUCCESS" ? "success" : "danger"}
                variant="flat"
              >
                {order.paymentStatus}
              </Badge>
            </div>
            <div className="text-sm mb-4">
              <p>
                <span className="font-medium">Customer Name:</span>{" "}
                {order.order.customerName}
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {order.order.customerEmail}
              </p>
              <p>
                <span className="font-medium">Address:</span>{" "}
                {order.order.customerAddress}
              </p>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm ">Total Quantity:</p>
                <p className="font-medium ">{order.order.totalQunatity}</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm ">Total Price:</p>
                <p className="font-medium ">${order.order.totalPrice}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm">Transaction ID:</p>
                <p className="text-sm">{order.transactionId}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
