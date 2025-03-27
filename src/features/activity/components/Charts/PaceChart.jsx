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
import { convertMetersPerSecondsToPace } from "../../../../utils/Global/convertData";
import { useState } from "react";

function PaceChart({ data, onKmSelected, onKmHovered }) {
  const [selectedKm, setselectedKm] = useState(-1);

  //console.log(data);

  const maxSpeedValue = Math.max(...data.map((item) => item.speed));
  const speedMax = maxSpeedValue + 0.1 * maxSpeedValue;
  const minSpeedValue = Math.min(...data.map((item) => item.speed));
  const speedMin = minSpeedValue - 0.2 * minSpeedValue;

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

  const CustomizedLabel = ({ x, y, width, height, value }) => {
    const radius = 10;

    return (
      width > 17 && (
        <text
          x={x + width / 2}
          y={y - radius}
          fontSize={width >= 27 ? 13 : Math.ceil(width / 2.2)}
          fill="#7e8896"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {convertMetersPerSecondsToPace(value)}
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
            <span className="text-xs uppercase text-slate-500">PACE</span>
            <span className="font-bold text-xs text-slate-300">
              {`${payload[0].payload.pace} min/km`}
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
          dataKey="speed"
          tick={false}
          axisLine={false}
          type="number"
          domain={[speedMin, speedMax]}
        >
          <Label angle={-90} value="pace (min/km)" />
        </YAxis>

        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#384454" }} />

        <Bar
          dataKey="speed"
          label={<CustomizedLabel />}
          onClick={handleClick}
          onMouseOver={handleHover}
          onMouseLeave={handleLeave}
        >
          {data.map((entry, index) => (
            <Cell
              cursor="pointer"
              fill={index === selectedKm ? "#7e8896" : "#47566a"}
              key={`cell-${index}`}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default PaceChart;
