"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  CartesianAxis,
} from "recharts";

function Chart({
  data,
  xAxis,
  yAxis,
  interval,
  reversed,
  color,
  avgValue,
  minValue,
  maxValue,
}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        width={500}
        height={200}
        data={data}
        margin={{
          top: 25,
          right: 0,
          left: -25,
          bottom: 0,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          strokeWidth={1}
          strokeOpacity={0.3}
          vertical={false}
          stroke="#bcbcbc"
        />
        <CartesianAxis y={avgValue} strokeWidth={2} stroke="#bcbcbc" />
        <XAxis
          dataKey={xAxis}
          fontSize={13}
          tickLine={false}
          axisLine={false}
          interval={interval}
          tickFormatter={(value) => {
            return `${Math.round(value)} km`;
          }}
        />
        <YAxis
          dataKey={yAxis}
          fontSize={13}
          tickLine={false}
          axisLine={false}
          reversed={reversed}
          type="number"
          domain={[minValue, maxValue]}
          tickFormatter={(value) => {
            return Math.round(value);
          }}
        />
        <Tooltip stroke="#8884d8" fill="#c5c3f5" />
        <Area
          type="monotone"
          dataKey={yAxis}
          stroke={color}
          fill={color}
          baseValue={reversed && maxValue}
        />
        <Legend />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default Chart;
