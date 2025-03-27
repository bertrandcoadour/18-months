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
            <span className="text-xs uppercase text-cyan-500">ALTITUDE</span>
            <span className="font-bold text-xs text-cyan-500">
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
          left: -5,
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
          // domain={[
          //   Math.min(...data.map((item) => item.distance)),
          //   Math.max(...data.map((item) => item.distance)),
          // ]} // Set the domain based on min/max distances
          //interval={3} // Or specify a numeric interval
          //tickFormatter={(value) => `${value} km`}
        />
        <YAxis
          axisLine={true}
          type="number"
          domain={[altitudeMin, altitudeMax]}
          tickFormatter={(value) => {
            return Math.round(value);
          }}
        >
          <Label angle={-90} dx={-21} value="altitude (m)" />
        </YAxis>
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#384454" }} />
        <Area
          type="monotone"
          dataKey="altitude"
          stroke="#21618c"
          fill="#2e86c1"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default AltitudeChart;
