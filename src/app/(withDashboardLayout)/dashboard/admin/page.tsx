"use client";

import { Card } from "@nextui-org/card";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaDollarSign, FaBoxOpen } from "react-icons/fa";

import AreaChartComponent from "@/src/components/charts/AreaChart";
import BarChartComponent from "@/src/components/charts/BarChart";
import LineChartComponent from "@/src/components/charts/LineChart";
import { useGetAllOrderedProducdts } from "@/src/hooks/order.hook";
import { useGetAllPaymentInfo } from "@/src/hooks/payment.hook";
import { TOPData, TPayment } from "@/src/types";

const AdminDashboard = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const { data: paymentData, isPending: paymentLoading } =
    useGetAllPaymentInfo();
  const { data: OPData, isPending: OPPending } = useGetAllOrderedProducdts();
  const [totalOrdedProduct, setTotalOrderedProduct] = useState(0);
  const [transformedOSData, setTransformedOSData] = useState([]);
  const [transformedSRData, setTransformedSRData] = useState([]);

  useEffect(() => {
    if (paymentData && paymentData?.data?.length > 0) {
      paymentData?.data?.forEach((element: TPayment) => {
        setTotalPrice((prev) => (prev += element.order.totalPrice));
      });

      const orderSummaryData = paymentData?.data?.map((order: TPayment) => ({
        name: `Order ${order.id}`,
        totalPrice: order.order.totalPrice,
        totalQuantity: order.order.totalQunatity,
        paymentStatus: order.paymentStatus,
        createdAt: order.order.createdAt,
      }));

      const aggregatedSales = orderSummaryData?.reduce(
        (acc: any, order: any) => {
          const date = new Date(order.createdAt).toISOString().split("T")[0];

          if (!acc[date]) {
            acc[date] = { name: date, sale: 0 };
          }
          acc[date].sale += order.totalPrice;

          return acc;
        },
        {},
      );

      setTransformedSRData(Object.values(aggregatedSales));
      setTransformedOSData(orderSummaryData);
    }
  }, [paymentData, paymentLoading]);

  useEffect(() => {
    if (OPData && !OPPending) {
      const totalOP = OPData?.data?.reduce((acc: number, curr: TOPData) => {
        acc += curr.quantity;

        return acc;
      }, 0);

      setTotalOrderedProduct(totalOP);
    }
  }, [OPPending, OPData]);

  const dataKeys = [
    {
      label: "totalPrice",
      name: "Total Price",
    },
    {
      label: "totalQuantity",
      name: "Total Quantity",
    },
  ];

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Business Analytics</h1>

      {/* Top section with analytics summary */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <Card className="p-4 flex-1">
          <div className="flex items-center">
            <FaShoppingCart className="text-3xl mr-3" />
            <div>
              <h4 className="text-2xl font-bold">
                {paymentLoading ? (
                  <>
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
                    </svg>
                  </>
                ) : (
                  paymentData?.data?.length
                )}
              </h4>
              <h4 className="text-sm">Total Orders</h4>
            </div>
          </div>
        </Card>

        <Card className="p-4 flex-1">
          <div className="flex items-center">
            <FaDollarSign className="text-3xl mr-3" />
            <div>
              <h3 className="text-2xl font-bold">
                {paymentLoading ? (
                  <>
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
                    </svg>
                  </>
                ) : (
                  totalPrice
                )}
              </h3>
              <h3 className="text-sm">Sales</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4 flex-1">
          <div className="flex items-center">
            <FaBoxOpen className="text-3xl mr-3" />
            <div>
              <h3 className="text-2xl font-bold">
                {paymentLoading ? (
                  <>
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
                    </svg>
                  </>
                ) : (
                  totalOrdedProduct
                )}
              </h3>
              <h3 className="text-sm">Products Sold</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Graph sections */}
      <div className="flex flex-col gap-4">
        {/* Orders Summary */}
        <Card className="p-4">
          <h3 className="text-lg font-bold mb-4">Orders Summary</h3>
          <AreaChartComponent data={transformedOSData} dataKeys={dataKeys} />
        </Card>

        {/* Revenue Summary */}
        <Card className="p-4">
          <h3 className="text-lg font-bold mb-4">Sales Summary</h3>
          <BarChartComponent data={transformedSRData} />
        </Card>

        {/* Products Sold Summary */}
        <Card className="p-4">
          <h3 className="text-lg font-bold mb-4">Products Sold Summary</h3>
          <LineChartComponent />
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
