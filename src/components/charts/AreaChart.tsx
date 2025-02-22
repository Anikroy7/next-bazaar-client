"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type TOrderSummaryChart = {
  data: any;
  dataKeys: TDataKey[];
};

type TDataKey = {
  name: string;
  label: string;
};

// Chart Component
const OrderSummaryChart: React.FC<TOrderSummaryChart> = ({
  data,
  dataKeys,
}) => {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {dataKeys.map((key: TDataKey) => (
            <Bar
              key={key.name}
              dataKey={key.label}
              fill="#2563eb"
              name={key.name}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderSummaryChart;
