"use client";

import { useMemo, useState } from "react";

import dynamic from "next/dynamic";
import PaceChart from "../Charts/PaceChart";

import {
  getAllDistancesAndCoordinates,
  getAllDistancesAndAltitudes,
  getAscentDescentForEachKm,
  getAveragePaceForEachKm,
  getRelevantElevationData,
  getCoordinatesBetween,
} from "../../Utilities/charts/chartUtilities";
import ElevationGainLossChart from "../Charts/ElevationGainLossChart";
import AltitudeChart from "../Charts/AltitudeChart";

function MapBlock({ activity }) {
  const [selectedKmCoords, setSelectedKmCoords] = useState([]);
  const [hoveredKmCoords, setHoveredKmCoords] = useState([]);

  //with useMemo, the coordinates are cached so that this expensive calculation is not performed every time the component re-render
  //(which is every time the user hover over a km in the paceChart, ie a lot of time)

  const distancesAndCoord = useMemo(() => {
    return getAllDistancesAndCoordinates(activity.records);
  }, [activity.records]);

  const distancesAndAltitude = useMemo(() => {
    return getAllDistancesAndAltitudes(activity.records);
  }, [activity.records]);

  const coordinates = useMemo(() => {
    return distancesAndCoord.map((item) => [item.longitude, item.latitude]);
  }, [distancesAndCoord]);

  const averagePaceData = useMemo(() => {
    return getAveragePaceForEachKm(activity);
  }, [activity]);

  const ascentDescentData = useMemo(() => {
    return getAscentDescentForEachKm(activity);
  }, [activity]);

  const altitudeData = useMemo(() => {
    return getRelevantElevationData(distancesAndAltitude, 3);
  }, [distancesAndAltitude]);

  const ClientMap = useMemo(
    () =>
      dynamic(() => import("./Map"), {
        loading: () => (
          <div className="flex items-center justify-center gap-2 mx-auto h-full">
            <h3 className="font-semibold  py-2 px-4 ">Loading...</h3>
          </div>
        ),
        ssr: false,
      }),
    []
  );

  const handleDistanceSelected = (km) => {
    if (km == 0) setSelectedKmCoords([]);
    else {
      let start = (km - 1) * 1000;
      let end = km * 1000;
      let coordinates = getCoordinatesBetween(distancesAndCoord, start, end);
      setSelectedKmCoords(coordinates);
    }
  };

  const handleDistanceHovered = (km) => {
    if (km == 0) setHoveredKmCoords([]);
    else {
      let start = (km - 1) * 1000;
      let end = km * 1000;
      let coordinates = getCoordinatesBetween(distancesAndCoord, start, end);
      setHoveredKmCoords(coordinates);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <div className="flex-1">
          {coordinates && (
            <ClientMap
              fullTrackCoords={coordinates}
              selectedKmCoords={selectedKmCoords}
              hoveredKmCoords={hoveredKmCoords}
              locationCoords={[]}
            />
          )}
        </div>
        <div className="flex-1">
          <PaceChart
            data={averagePaceData}
            onKmSelected={handleDistanceSelected}
            onKmHovered={handleDistanceHovered}
          />
          <ElevationGainLossChart
            data={ascentDescentData}
            onKmSelected={handleDistanceSelected}
            onKmHovered={handleDistanceHovered}
          />
        </div>
      </div>

      <div className="flex flex-row">
        <div className="flex-1">
          <AltitudeChart data={altitudeData} />
        </div>
        <div className="flex-1" />
      </div>
    </div>
  );
}

export default MapBlock;
