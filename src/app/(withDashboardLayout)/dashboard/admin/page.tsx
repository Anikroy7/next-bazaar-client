"use client"

import { useGetAllPaymentInfo } from "@/src/hooks/payment.hook";
import { TPayment } from "@/src/types";
import { Card } from "@nextui-org/card";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaDollarSign, FaBoxOpen } from "react-icons/fa";

const AdminDashboard = () => {

  const { data: paymentData, isPending: paymentLoading } = useGetAllPaymentInfo();
  const [totalPrice, setTotalPrice] = useState(0)
  console.log(paymentData)

  useEffect(() => {
    if (paymentData && paymentData?.data?.length > 0) {
      paymentData?.data?.forEach((element: TPayment) => {
        setTotalPrice((prev) => prev += element.order.totalPrice)
      });

    }
  }, [paymentData, paymentLoading])


  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Business Analytics</h1>

      {/* Top section with analytics summary */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <Card className="p-4 flex-1">
          <div className="flex items-center">
            <FaShoppingCart className="text-3xl mr-3" />
            <div>
              <h4 className="text-2xl font-bold">{paymentLoading ? <>
                <svg
                  className="animate-spin h-5 w-5 text-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"
                  />
                </svg></> : paymentData?.data?.length}</h4>
              <h4 className="text-sm">Total Orders</h4>
            </div>
          </div>
        </Card>

        <Card className="p-4 flex-1">
          <div className="flex items-center">
            <FaDollarSign className="text-3xl mr-3" />
            <div>
              <h3 className="text-2xl font-bold">
                {paymentLoading ? <>
                  <svg
                    className="animate-spin h-5 w-5 text-current"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      fill="currentColor"
                    />
                  </svg></> : totalPrice}
              </h3>
              <h3 className="text-sm">Revenue</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4 flex-1">
          <div className="flex items-center">
            <FaBoxOpen className="text-3xl mr-3" />
            <div>
              <h3 className="text-2xl font-bold">847</h3>
              <h3 className="text-sm">Products Sold</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Graph sections */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Orders Summary */}
        <Card className="p-4 flex-1">
          <h3 className="text-lg font-bold mb-4">Orders Summary</h3>
          <div className="bg-purple-500 h-48 rounded-md" />
        </Card>

        {/* Revenue Summary */}
        <Card className="p-4 flex-1">
          <h3 className="text-lg font-bold mb-4">Revenue Summary</h3>
          <div className="bg-cyan-500 h-48 rounded-md" />
        </Card>

        {/* Products Sold Summary */}
        <Card className="p-4 flex-1">
          <h3 className="text-lg font-bold mb-4">Products Sold Summary</h3>
          <div className="bg-teal-500 h-48 rounded-md" />
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
