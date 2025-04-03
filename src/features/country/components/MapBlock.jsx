"use client";

import { useMemo, useEffect, useState } from "react";

import dynamic from "next/dynamic";
import Loading from "../../../components/Loading";
import SelectedActivitiesBlock from "./SelectedActivitiesBlock";
import { useQueryClient } from "@tanstack/react-query";
import { getActivitiyCoords } from "@/src/actions/activitiesActions";
import { getActivityDescription } from "@/src/utils/Icons/Icons";

function MapBlock({ shape, activities }) {
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const queryClient = useQueryClient();

  const ClientMap = useMemo(
    () =>
      dynamic(() => import("./CountryMap"), {
        loading: () => <Loading />,
        ssr: false,
      }),
    []
  );

  useEffect(() => {
    setSelectedActivities([]);
    setSelectedTracks([]);
  }, [activities]);

  const onSelectedActivity = async (marker) => {
    const needFetch = !selectedTracks.some(
      (track) => track.properties.id === marker?.options.id
    );
    let fullTrackGeojsonFeature;

    if (needFetch) {
      setIsFetching(true);

      const data = await queryClient.fetchQuery({
        queryKey: ["activityCoordinates", marker?.options.id],
        queryFn: async () => {
          return await getActivitiyCoords(marker?.options.id);
        },
        staleTime: 1000 * 60 * 5, //for 5min, the data is considered valid to be retrieve from cache
      });

      setIsFetching(false);

      if (data) {
        fullTrackGeojsonFeature = {
          type: "Feature",
          properties: {
            id: marker.options.id,
            title: marker.options.title,
            type: getActivityDescription(
              marker.options.sport,
              marker.options.subSport
            ),
          },
          geometry: {
            type: "LineString",
            coordinates: data,
          },
        };
      }
    }

    setSelectedTracks((prevFeatures) => {
      //check if the track associated to this id is already in the list of geojson features
      //if so, remove the feature, it not, add a new feature with its coords

      const existingIndex = prevFeatures.findIndex(
        (f) => f.properties.id === marker.options.id
      );

      if (existingIndex > -1) {
        // Feature already exists, remove it
        const newFeatures = [...prevFeatures]; // Create a copy
        newFeatures.splice(existingIndex, 1);

        return newFeatures;
      } else {
        // Feature doesn't exist, add it
        const newFeatures = [...prevFeatures, fullTrackGeojsonFeature];
        return newFeatures;
      }
    });

    let selectedActivity = activities.filter(
      (activity) => activity.id == marker.options.id
    );

    if (selectedActivity && selectedActivity.length > 0) {
      setSelectedActivities((prevActivities) => {
        const existingIndex = prevActivities.findIndex(
          (prevAct) => prevAct.id === marker.options.id
        );

        if (existingIndex > -1) {
          // activity already exists, remove it
          const newActivities = [...prevActivities]; // Create a copy
          newActivities.splice(existingIndex, 1);

          return newActivities;
        } else {
          // Activity doesn't exist, add it
          const newActivities = [...prevActivities, selectedActivity[0]];
          return newActivities;
        }
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-2">
      <div>
        <ClientMap
          countryShape={shape}
          activities={activities}
          onSelectedMarker={onSelectedActivity}
          selectedActivities={selectedTracks}
        />
      </div>
      <div className="flex max-h-[650px] overflow-auto">
        <SelectedActivitiesBlock
          selectedActivities={selectedActivities}
          fetching={isFetching}
        />
      </div>
    </div>
  );
}

export default MapBlock;
