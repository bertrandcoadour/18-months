"use client";

import {
  convertMetersPerSecondsToPace,
  convertMetersToKms,
  filterOutliers,
} from "../../Utilities/Global/convertData";
import { useEffect, useState } from "react";
import Chart from "./Chart";
import PaceChart from "./PaceChart";
import IntervalChart from "./ActivityChart";
import VerticalPaceChart from "./VerticalPaceChart";
import ActivityChart from "./ActivityChart";
import TestChart from "./TestChart";

function ChartsBlok({ activity }) {
  const useIsServerSide = () => {
    const [isServerSide, setIsServerSide] = useState(true);

    useEffect(() => {
      setIsServerSide(false);
    }, [setIsServerSide]);

    return isServerSide;
  };

  const isServerSide = useIsServerSide();
  if (isServerSide) return null;

  //const chartId = useId();
  const records = activity?.records;
  const altitudes = [];
  const heartRates = [];

  let minAltitude = activity?.enhancedAltitude;
  let maxAltitude = activity?.enhancedAltitude;
  let minHeartRate = activity?.avgHeartRate;
  let maxHeartRate = activity?.avgHeartRate;

  records.forEach((record) => {
    const distance = convertMetersToKms(record?.distance);
    const altitude = Math.round(record?.enhancedAltitude);
    const heartReat = record?.heartRate;

    altitudes.push({ distance: distance, altitude: altitude });
    heartRates.push({ distance: distance, bpm: heartReat });

    if (altitude < minAltitude) minAltitude = altitude;
    if (altitude > maxAltitude) maxAltitude = altitude;
    if (heartReat < minHeartRate) minHeartRate = heartReat;
    if (heartReat > maxHeartRate) maxHeartRate = heartReat;
  });

  const interval = Math.round(records.length / 5);

  return (
    <div>
      {/* <PaceChart activity={activity} />
      <ActivityChart activity={activity} />
      <TestChart /> */}
      <Chart
        data={altitudes}
        xAxis={Object.keys(altitudes.at(0)).at(0)}
        yAxis={Object.keys(altitudes.at(0)).at(1)}
        interval={interval}
        color={"#999999"}
        minValue={minAltitude}
        maxValue={maxAltitude}
      />
      <Chart
        data={heartRates}
        xAxis={Object.keys(heartRates.at(0)).at(0)}
        yAxis={Object.keys(heartRates.at(0)).at(1)}
        interval={interval}
        color={"#f44336"}
        avgValue={convertMetersPerSecondsToPace(activity.enhancedAvgSpeed)}
        minValue={minHeartRate}
        maxValue={maxHeartRate}
      />
    </div>
  );
}

export default ChartsBlok;
