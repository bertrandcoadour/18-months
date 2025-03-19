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
  BarChart,
  Bar,
  Rectangle,
  ComposedChart,
  Line,
} from "recharts";
import {
  convertMetersPerSecondsToPace,
  convertMetersToKms,
} from "../../Utilities/Global/convertData";
import { useEffect, useState } from "react";
import Chart from "./Chart";

function VerticalPaceChart({ activity }) {
  const records = activity?.records;

  var rawData = [];
  var data = [];

  records.forEach((record) => {
    const distance = convertMetersToKms(record?.distance);
    const speed = record?.enhancedSpeed;
    const altitude = Math.round(record?.enhancedAltitude);
    rawData.push([distance, speed, altitude]);
  });

  let distanceMax = rawData.at(rawData.length - 1).at(0);

  for (let i = 1; i <= Math.ceil(distanceMax); i++) {
    let currentKilData = rawData.filter((d) => i - 1 < d.at(0) && d.at(0) <= i);

    let totalSpeed = 0;

    currentKilData.forEach((rawData) => {
      totalSpeed += rawData.at(1);
    });
    let avgSpeed = Math.round((totalSpeed / currentKilData.length) * 100) / 100;

    let avgPace = convertMetersPerSecondsToPace(avgSpeed);

    let totalAltitude = 0;
    currentKilData.forEach((rawData) => {
      totalAltitude += rawData.at(2);
    });

    let avgAltitude =
      Math.round((totalAltitude / currentKilData.length) * 100) / 100;

    data.push({
      distance: i,
      speed: avgSpeed,
      pace: avgPace,
      altitude: avgAltitude,
    });
  }

  console.log(data);
  console.log(data.length);
  let verticalSize = 40 * data.length;

  const maxSpeedValue = Math.max(...data.map((item) => item.speed));
  const speedMax = maxSpeedValue + 0.05 * maxSpeedValue;
  const minSpeedValue = Math.min(...data.map((item) => item.speed));
  const speedMin = minSpeedValue - 0.05 * minSpeedValue;
  const maxAltitudeValue = Math.max(...data.map((item) => item.altitude));
  const altitudeMax = maxAltitudeValue + 0.05 * maxAltitudeValue;
  const minAltitudeValue = Math.min(...data.map((item) => item.altitude));
  const altitudeMin = minAltitudeValue - 0.05 * minAltitudeValue;

  const CustomizedLabel = (props) => {
    const { x, y, value } = props;

    return (
      <text
        x={x}
        y={y}
        dy={15}
        dx={200}
        fontSize="13"
        //fontFamily="sans-serif"
        //color="blue"
        fill="#6fa8dc"
        textAnchor="middle"
      >
        {convertMetersPerSecondsToPace(value)}
      </text>
    );
  };

  return (
    <ResponsiveContainer width={300} height={verticalSize}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 25,
          left: 0,
          bottom: 0,
        }}
        layout="vertical"
      >
        {/* <CartesianGrid
          strokeDasharray="3 3"
          strokeWidth={1}
          strokeOpacity={0.3}
          vertical={false}
          stroke="#bcbcbc"
        /> */}
        <XAxis
          dataKey="speed"
          //   tickFormatter={(value) => {
          //     const pace = convertMetersPerSecondsToPace(value);
          //     //return isNaN(pace) ? 0 : Math.round(pace * 10) / 10;
          //     return isNaN(pace) ? 0 : pace;
          //   }}
          tickLine={false}
          axisLine={false}
          stroke="none"
          type="number"
          domain={[speedMin, speedMax]}
        />
        <YAxis
          dataKey="distance"
          tickLine={false}
          axisLine={false}
          interval={1}
          unit="km"
          //   tickFormatter={(value) => {
          //     return `${value} km`;
          //   }}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload || payload.length === 0) {
              return null;
            }

            return payload[0].payload.pace;
          }}
        />
        <Bar
          dataKey="speed"
          fill="#6fa8dc"
          barSize={25}
          label={<CustomizedLabel />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default VerticalPaceChart;
