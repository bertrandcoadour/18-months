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
  getAllDistancesAndHeartRates,
} from "../../Utilities/charts/chartUtilities";
import ElevationGainLossChart from "../Charts/ElevationGainLossChart";
import AltitudeChart from "../Charts/AltitudeChart";
import Loading from "../Loading";
import HeartRateChart from "../Charts/HeartRateChart";

function MapBlock({ activity }) {
  const [selectedKmCoords, setSelectedKmCoords] = useState(null);
  const [hoveredKmCoords, setHoveredKmCoords] = useState(null);

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

  const distancesAndHeartRates = useMemo(() => {
    return getAllDistancesAndHeartRates(activity.records);
  }, [activity.records]);

  const ClientMap = useMemo(
    () =>
      dynamic(() => import("./Map"), {
        loading: () => <Loading />,
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
      <div className="grid grid-rows-3 gap-3">
        <div className="row-span-2">
          {coordinates && (
            <ClientMap
              fullTrackCoords={coordinates}
              selectedKmCoords={selectedKmCoords}
              hoveredKmCoords={hoveredKmCoords}
              cityCoords={[]}
            />
          )}
        </div>
        <div className="row-span-1">
          <AltitudeChart data={altitudeData} />
        </div>
      </div>

      <div className="grid grid-rows-3 gap-1">
        <div className="row-span-1">
          <PaceChart
            data={averagePaceData}
            onKmSelected={handleDistanceSelected}
            onKmHovered={handleDistanceHovered}
          />
        </div>
        <div className="row-span-1">
          <ElevationGainLossChart
            data={ascentDescentData}
            onKmSelected={handleDistanceSelected}
            onKmHovered={handleDistanceHovered}
          />
        </div>
        <div className="row-span-1">
          <HeartRateChart data={distancesAndHeartRates} />
        </div>
      </div>
    </div>
  );
}

export default MapBlock;
