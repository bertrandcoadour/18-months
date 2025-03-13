"use client";

import { useMemo, useEffect, useState } from "react";

import dynamic from "next/dynamic";
import Loading from "../Loading";
import SelectedActivitiesBlock from "./SelectedActivitiesBlock";

function MapBlock({ shape, activities }) {
  const [selectedActivities, setSelectedActivities] = useState([]);

  const ClientMap = useMemo(
    () =>
      dynamic(() => import("./CountryMap"), {
        loading: () => <Loading />,
        ssr: false,
      }),
    []
  );

  useEffect(() => {
    // let foundActivities = selectedActivities.filter((activity) => {
    //   return activities.some((act) => act.id === activity.id);
    // });

    // console.log(foundActivities);

    setSelectedActivities([]);
  }, [activities]);

  const onSelectedActivity = (selectedId) => {
    let selectedActivity = activities.filter(
      (activity) => activity.id == selectedId
    );

    if (selectedActivity && selectedActivity.length > 0) {
      setSelectedActivities((prevActivities) => {
        const existingIndex = prevActivities.findIndex(
          (prevAct) => prevAct.id === selectedId
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
        />
      </div>

      <SelectedActivitiesBlock selectedActivities={selectedActivities} />
    </div>
  );
}

export default MapBlock;
