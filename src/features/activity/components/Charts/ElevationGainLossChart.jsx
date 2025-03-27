"use client";

import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Label,
  Cell,
} from "recharts";

import { useState } from "react";

function ElevationGainLossChart({ data, onKmSelected, onKmHovered }) {
  const [selectedKm, setselectedKm] = useState(-1);

  const maxGainValue = Math.max(
    ...data.map((item) => item.ascent),
    ...data.map((item) => item.descent)
  );
  const gainMax = maxGainValue + 0.1 * maxGainValue;
  const minGainValue = Math.min(
    ...data.map((item) => item.ascent),
    ...data.map((item) => item.descent)
  );
  const gainMin = minGainValue - 0.2 * minGainValue;

  const handleClick = (data, index) => {
    if (selectedKm == index) {
      setselectedKm(-1);
      onKmSelected(0);
    } else {
      setselectedKm(index);
      onKmSelected(data.distance);
    }
  };

  const handleHover = (data, index) => {
    onKmHovered(data.distance);
  };

  const handleLeave = (data, index) => {
    onKmHovered(0);
  };

  const CustomizedLabel = ({ x, y, width, height, value, type }) => {
    const radius = 10;

    return (
      width > 13 &&
      value > 0 && (
        <text
          x={x + width / 2}
          y={y - radius}
          fontSize={width >= 27 ? 13 : Math.ceil(width / 2.2)}
          fill={type == "ascent" ? "#84ff81" : "#ff676c"}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {`${type == "ascent" ? "+" : "-"} ${value}`}
        </text>
      )
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-slate-800 border-slate-500 p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <span className="text-xs uppercase text-slate-500">DISTANCE</span>
            <span className="font-bold text-xs text-slate-300">
              {`${payload[0].payload.distance} km`}
            </span>
            <span className="text-xs uppercase text-green-300">D+</span>
            <span className="font-bold text-xs text-green-300">
              {`${payload[0].payload.ascent} m`}
            </span>
            <span className="text-xs uppercase text-red-300">D-</span>
            <span className="font-bold text-xs text-red-300">
              {`${payload[0].payload.descent} m`}
            </span>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={data}
        margin={{
          top: 0,
          right: 25,
          left: -15,
          bottom: 0,
        }}
      >
        <XAxis
          dataKey="distance"
          tickLine={false}
          axisLine={true}
          tickFormatter={(value) => {
            return `${value} km`;
          }}
        />
        <YAxis
          tick={false}
          axisLine={false}
          type="number"
          domain={[gainMin, gainMax]}
        >
          <Label angle={-90} value="elevation gain or loss (m)" />
        </YAxis>
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#384454" }} />

        <Bar
          dataKey="ascent"
          label={<CustomizedLabel type={"ascent"} />}
          onClick={handleClick}
          onMouseOver={handleHover}
          onMouseLeave={handleLeave}
        >
          {data.map((entry, index) => (
            <Cell
              cursor="pointer"
              fill={index === selectedKm ? "#39ff35" : "#84ff81"}
              key={`cell-${index}`}
            />
          ))}
        </Bar>
        <Bar
          dataKey="descent"
          label={<CustomizedLabel type={"descent"} />}
          onClick={handleClick}
          onMouseOver={handleHover}
          onMouseLeave={handleLeave}
        >
          {data.map((entry, index) => (
            <Cell
              cursor="pointer"
              fill={index === selectedKm ? "#ff1b22" : "#ff676c"}
              key={`cell-${index}`}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ElevationGainLossChart;
