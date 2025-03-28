import React from "react";

import Loading from "@/src/components/Loading";
import ActivityRow from "@/src/components/ActivityRow";
import { getActivities } from "@/src/actions/activitiesActions";
import { cache } from "react";

async function ActivityList({ params }) {
  const activities = await getActivities(params);

  return (
    <ul className="leading-8">
      {activities.map((activity) => (
        <li
          key={activity.id}
          className=" group/item bg-activityList hover:bg-activityList-hover rounded-md  p-1 m-1"
        >
          <ActivityRow activity={activity} size={"full"} />
        </li>
      ))}
    </ul>
  );
}

export default ActivityList;
