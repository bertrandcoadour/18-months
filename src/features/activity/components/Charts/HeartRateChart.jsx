"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

function HeartRateChart({ data }) {
  const maxHRValue = Math.max(...data.map((item) => item.heartRate));
  const heartRateMax = maxHRValue + 0.05 * maxHRValue;
  const minHRValue = Math.min(...data.map((item) => item.heartRate));
  const heartRateMin = minHRValue - 0.05 * minHRValue;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-slate-800 border-slate-500 p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <span className="text-xs uppercase text-slate-500">DISTANCE</span>
            <span className="font-bold text-xs text-slate-300">
              {`${payload[0].payload.distance} km`}
            </span>
            <span className="text-xs uppercase text-red-600">HEART RATE</span>
            <span className="font-bold text-xs text-red-600">
              {`${payload[0].payload.heartRate} m`}
            </span>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart
        data={data}
        margin={{
          top: 0,
          right: 25,
          left: -10,
          bottom: 0,
        }}
      >
        <XAxis
          dataKey="distance"
          tickLine={false}
          axisLine={true}
          tickFormatter={(value) => {
            return `${Math.round(value)} km`;
          }}
        />
        <YAxis
          axisLine={true}
          type="number"
          domain={[heartRateMin, heartRateMax]}
          tickFormatter={(value) => {
            return Math.round(value);
          }}
        >
          <Label angle={-90} dx={-15} value="heart rate" />
        </YAxis>
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#384454" }} />
        <Area
          type="monotone"
          dataKey="heartRate"
          stroke="#b03a2e"
          fill="#cb4335"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default HeartRateChart;
