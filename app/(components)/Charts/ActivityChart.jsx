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
  Label,
} from "recharts";
import {
  convertMetersPerSecondsToPace,
  convertMetersToKms,
} from "../../Utilities/Global/convertData";
import { useEffect, useState } from "react";
import Chart from "./Chart";
import { getLapsData } from "@/app/Utilities/charts/chartUtilities";

function ActivityChart({ activity }) {
  let data = getLapsData(activity);

  //console.log(data);

  const maxSpeedValue = Math.max(...data.map((item) => item.speed));
  const speedMax = maxSpeedValue + 0.05 * maxSpeedValue;
  const minSpeedValue = Math.min(...data.map((item) => item.speed));
  const speedMin = minSpeedValue - 0.05 * minSpeedValue;

  //console.log(speedMax, speedMin);

  return (
    <ResponsiveContainer width="100%" height={300}>
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
          dataKey="count"
          //type="number"
          tickLine={false}
          axisLine={false}
          tick={false}
        />
        <YAxis
          dataKey="speed"
          tickFormatter={(value) => {
            const pace = convertMetersPerSecondsToPace(value);
            //return isNaN(pace) ? 0 : Math.round(pace * 10) / 10;
            //return isNaN(pace) ? 0 : pace;
            return pace;
          }}
          tick={true}
          axisLine={false}
          //type="number"
          domain={[speedMin, speedMax]}
        >
          <Label angle={-90} value="pace min/km" />
        </YAxis>

        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload || payload.length === 0) {
              return null;
            }

            return (
              <div className="rounded-lg border bg-slate-800 border-slate-500 p-2 shadow-sm">
                <div className="grid grid-cols-2 gap-2">
                  {/* <div className="flex flex-col">
                    </div> */}
                  <span className="text-xs uppercase text-slate-500">
                    DISTANCE
                  </span>
                  <span className="font-bold text-sm text-slate-300">
                    {`${payload[0].payload.distance} km`}
                  </span>
                  <span className="text-xs uppercase text-slate-500">PACE</span>
                  <span className="font-bold text-sm text-slate-300">
                    {`${payload[0].payload.pace} min/km`}
                  </span>
                </div>
              </div>
            );
          }}
        />
        <Bar
          dataKey="speed"
          data={data}
          fill="#6fa8dc"
          barSize={data.distance}
        />
        {/* {data.map((s) => (
          <Bar dataKey="speed" fill="#6fa8dc" barSize={1} key={s.count} />
        ))} */}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ActivityChart;
