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
  Label,
} from "recharts";

function AltitudeChart({ data }) {
  const maxAltitudeValue = Math.max(...data.map((item) => item.altitude));
  const altitudeMax = maxAltitudeValue + 0.05 * maxAltitudeValue;
  const minAltitudeValue = Math.min(...data.map((item) => item.altitude));
  const altitudeMin = minAltitudeValue - 0.05 * minAltitudeValue;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-slate-800 border-slate-500 p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <span className="text-xs uppercase text-slate-500">DISTANCE</span>
            <span className="font-bold text-xs text-slate-300">
              {`${payload[0].payload.distance} km`}
            </span>
            <span className="text-xs uppercase text-green-300">ALTITUDE</span>
            <span className="font-bold text-xs text-green-300">
              {`${payload[0].payload.altitude} m`}
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
          left: -15,
          bottom: 0,
        }}
      >
        {/* <CartesianGrid
          strokeDasharray="3 3"
          strokeWidth={1}
          strokeOpacity={0.3}
          vertical={false}
          stroke="#bcbcbc"
        /> */}
        {/* <CartesianAxis y={avgValue} strokeWidth={2} stroke="#bcbcbc" /> */}
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
          domain={[altitudeMin, altitudeMax]}
          tickFormatter={(value) => {
            return Math.round(value);
          }}
        >
          <Label angle={-90} dx={-10} value="altitude (m)" />
        </YAxis>
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#384454" }} />
        <Area
          type="monotone"
          dataKey="altitude"
          stroke="#384454"
          fill="#384454"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default AltitudeChart;
