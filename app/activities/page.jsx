import ActivityList from "../(components)/ActivityList";
import { getActivitiesTypes } from "../(actions)/activitiesActions";
import ActivityFilterBar from "../(components)/ActivityFilterBar";
import React from "react";

async function ActivitiesPage({ searchParams, searchCount }) {
  const params = await searchParams;
  const fetchedTypes = await getActivitiesTypes();

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 bg-page">
        <ActivityFilterBar sportTypes={fetchedTypes} />
      </div>

      <ActivityList params={params} />
    </div>
  );
}

export default ActivitiesPage;
