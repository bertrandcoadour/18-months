import React, { useState, useEffect } from "react";
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

// const data = [
//   { count: 1, 1000: 3 },
//   { count: 2, 1000: 3.1 },
//   { count: 3, 1000: 3.2 },
//   { count: 4, type2: 4 },
//   { count: 5, type3: 2 },
//   { count: 6, type2: 4.5 },
//   { count: 7, type3: 1.5 },
//   { count: 8, 1000: 3 },
//   { count: 9, 1000: 3 },
//   { count: 10, 1000: 3.4 },
// ];

const data = [
  {
    distance: 1,
    data: [
      { count: 1, speed: 3 },
      { count: 2, speed: 4 },
      { count: 3, speed: 3 },
      { count: 10, speed: 3 },
      { count: 11, speed: 4 },
      { count: 12, speed: 3 },
    ],
  },
  {
    distance: 0.3,
    data: [
      { count: 4, speed: 7 },
      { count: 6, speed: 7.2 },
      { count: 8, speed: 7.1 },
    ],
  },
  {
    distance: 0.1,
    data: [
      { count: 5, speed: 2 },
      { count: 7, speed: 2.2 },
      { count: 9, speed: 2.1 },
    ],
  },
];

//console.log(data);

const TestChart = () => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="count"
          type="number"
          //allowDuplicatedCategory={false}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        {data.map((s) => (
          <Bar
            dataKey="speed"
            data={s.data}
            fill="#8884d8"
            //={s.distance * 40}
            width={s.distance * 40}
            key={s.distance}
          />
        ))}
        {/* <Bar dataKey={data.count == 1} fill="#8884d8" barSize={20} />
        <Bar dataKey={data.distance == 0.3} fill="#8884d8" barSize={10} /> */}
        {/* <Bar dataKey="type3" fill="#8884d8" barSize={5} /> */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TestChart;
