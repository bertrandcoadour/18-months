import ActivityList from "@/src/features/activityList/components/ActivityList";
import {
  getActivities,
  getActivitiesTypes,
} from "@/src/actions/activitiesActions";
import ActivityFilterBar from "@/src/features/activityList/components/ActivityFilterBar";
import React, { Suspense } from "react";
import Loading from "@/src/components/Loading";

async function ActivitiesPage({ searchParams, searchCount }) {
  const params = await searchParams;
  const fetchedTypes = await getActivitiesTypes();

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 bg-page">
        <ActivityFilterBar sportTypes={fetchedTypes} />
      </div>

      <div className="p-3">
        <Suspense key={params} fallback={<Loading />}>
          <ActivityList params={params} />
        </Suspense>
      </div>
    </div>
  );
}

export default ActivitiesPage;
