"use client";

import React from "react";
import dynamic from "next/dynamic";

import { useGetMyOrderInfo } from "@/src/hooks/order.hook";
import { TOrder, TOrderedProduct } from "@/src/types";

const DynamicLoading = dynamic(
  () => import("@/src/components/ui/shared/Loading"),
  {
    ssr: false,
  },
);

const OrderHistoryPage = () => {
  const { data, isPending } = useGetMyOrderInfo();

  if (isPending) return <DynamicLoading />;

  return (
    <div className="min-h-screen   p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Order History</h1>

        {data?.data?.length > 0 ? (
          data?.data?.map((order: TOrder) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-lg shadow-lg mb-6"
            >
              {/* Order Details */}
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Order #{order.id}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-800">
                      Customer Name:
                    </span>{" "}
                    {order.customerName}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-800">Email:</span>{" "}
                    {order.customerEmail}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-800">
                      Address:
                    </span>{" "}
                    {order.customerAddress}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-800">
                      Total Quantity:
                    </span>{" "}
                    {order.totalQunatity}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-800">
                      Total Price:
                    </span>{" "}
                    ${order.totalPrice}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-800">
                      Payment Status:
                    </span>{" "}
                    <span
                      className={`${
                        order?.payment?.paymentStatus === "SUCCESS"
                          ? "text-green-500"
                          : "text-red-500"
                      } font-semibold`}
                    >
                      {order?.payment?.paymentStatus}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-800">
                      Transaction ID:
                    </span>{" "}
                    {order?.payment?.transactionId}
                  </p>
                </div>
              </div>

              {/* Products Ordered */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Products Ordered
                </h3>
                <table className="w-full border-collapse border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-200 px-4 py-2 text-left text-gray-700 font-medium">
                        Product Name
                      </th>
                      <th className="border border-gray-200 px-4 py-2 text-left text-gray-700 font-medium">
                        Quantity
                      </th>
                      <th className="border border-gray-200 px-4 py-2 text-left text-gray-700 font-medium">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.products.map((product: TOrderedProduct) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-2 text-gray-700">
                          {product.name}
                        </td>
                        <td className="border border-gray-200 px-4 py-2 text-gray-700">
                          {product.quantity}
                        </td>
                        <td className="border border-gray-200 px-4 py-2 text-gray-700">
                          ${product.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-600 text-center">No orders found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
