"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";

import { useGetAllOrderedProducdts } from "@/src/hooks/order.hook";
import { TOPData } from "@/src/types";
/* 
// Data (Replace this with data fetched from your database)
const salesData = [
  { orderId: 1, productId: 9, product: { name: 'Compact Laptop Stand' }, quantity: 3 },
  { orderId: 2, productId: 10, product: { name: 'Wireless Mouse' }, quantity: 2 },
  { orderId: 3, productId: 9, product: { name: 'Compact Laptop Stand' }, quantity: 1 },
  { orderId: 4, productId: 11, product: { name: 'Bluetooth Keyboard' }, quantity: 5 },
  { orderId: 5, productId: 9, product: { name: 'Compact Laptop Stand' }, quantity: 2 },
];

 */

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        <p className="text-sm text-blue-400">
          Quantity Sold:
          <span className="ml-2">{payload[0].value}</span>
        </p>
      </div>
    );
  }

  return null;
};

const LineChartComponent = () => {
  const { data: OPData, isPending: OPPending } = useGetAllOrderedProducdts();
  const [ordedPD, setOrderedPD] = useState([]);

  useEffect(() => {
    if (!OPPending && OPData) {
      const aggregatedSales = OPData?.data?.reduce(
        (acc: any, sale: TOPData) => {
          const productName = sale.product.name;

          if (!acc[productName]) {
            acc[productName] = { name: productName, totalQuantity: 0 };
          }
          acc[productName].totalQuantity += sale.quantity;

          return acc;
        },
        {},
      );

      setOrderedPD(Object.values(aggregatedSales));
    }
  }, [OPData, OPPending]);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ResponsiveContainer>
        <LineChart
          data={ordedPD}
          margin={{
            right: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line dataKey="totalQuantity" stroke="#3b82f6" type="monotone" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
