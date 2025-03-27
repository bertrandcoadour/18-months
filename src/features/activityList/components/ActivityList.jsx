import React from "react";

import Loading from "@/src/components/Loading";
import ActivityRow from "@/src/components/ActivityRow";
import { getActivities } from "@/src/actions/activitiesActions";
import { cache } from "react";

async function ActivityList({ params }) {
  // const [activities,  ] = useState([]);
  // const [loading, setLoading] = useState(true); // Add loading state
  // const [error, setError] = useState(null);

  // const fetchActivities = unstable_cache(
  //   async () => {
  //     return await getActivities(params);
  //   },
  //   ["activities"],
  //   { revalidate: 3600, tags: ["activities"] }
  // );

  const activities = await getActivities(params);

  // useEffect(() => {
  //   const fetchActivities = async () => {
  //     setLoading(true); // Set loading to true before fetching
  //     try {
  //       const queryString = new URLSearchParams(params).toString();
  //       const res = await fetch(`/api/activities?${queryString}`, {
  //         method: "GET",
  //       });
  //       if (!res.ok) {
  //         throw new Error("Failed to fetch activities");
  //       }
  //       setActivities(await res.json());
  //       setError(null);
  //     } catch (error) {
  //       setError("Failed to load activities. Please try again.");
  //       throw new Error("Failed to fetch activites");
  //     } finally {
  //       setLoading(false); // Set loading to false after fetching (or error)
  //     }
  //   };

  //   fetchActivities();
  // }, [params]);

  // if (loading) {
  //   return <Loading />;
  // }

  // if (error) {
  //   return <div className="text-red-500">{error}</div>; // Display error message
  // }

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
