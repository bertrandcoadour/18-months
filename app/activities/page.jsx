import ActivityList from "../(components)/ActivityList";
import { activitiesCount, getActivities } from "../(actions)/activitiesActions";
import ActivityFilterBar from "../(components)/ActivityFilterBar";
import React from "react";

async function ActivitiesPage({ searchParams, searchCount }) {
  //const activities = await getActivities(searchParams);
  //const plainObjectActivities = JSON.parse(JSON.stringify(activities));
  const params = await searchParams;

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 bg-page">
        <ActivityFilterBar />
      </div>

      <ActivityList params={params} />
    </div>
  );
}

export default ActivitiesPage;
