"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { getActivityIcon } from "../Utilities/Icons/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { info_to_display } from "../Utilities/InfoToDisplay/InfoToDisplay";
import InfoLine from "./InfoLine";
import DeleteBlock from "./DeleteBlock";
import Loading from "./Loading";

function ActivityList({ params }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const queryString = new URLSearchParams(params).toString();
        console.log(queryString);
        const res = await fetch(`/api/activities?${queryString}`, {
          method: "GET",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch activities");
        }
        setActivities(await res.json());
        setError(null);
      } catch (error) {
        setError("Failed to load activities. Please try again.");
        throw new Error("Failed to fetch activites");
      } finally {
        setLoading(false); // Set loading to false after fetching (or error)
      }
    };

    fetchActivities();
  }, [params]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>; // Display error message
  }

  return (
    <ul className="leading-8">
      {activities.map((activity) => (
        <li
          key={activity.id}
          className=" group/item bg-activityList hover:bg-activityList-hover rounded-md  p-1 m-1"
        >
          <div className="flex flex-row">
            <div className="flex flex-col lg:flex-row flex-grow lg:border-0 border-r">
              <div className="flex flex-grow w-full max-w-xl xl:shrink-0 pb-1">
                <div className=" w-full max-w-20 self-center pl-2">
                  <FontAwesomeIcon
                    icon={getActivityIcon(activity.sport, activity.subSport)}
                    className="icon"
                  />
                </div>

                <Link
                  className="hover:cursor-pointer hover:text-slate-900"
                  href={`/activities/${activity.id}`}
                >
                  <div className="text-start ">{activity.title}</div>

                  <div className="font-medium text-xs text-start">
                    {activity.city + ", " + activity.country}
                  </div>
                </Link>
              </div>

              <hr className="h-px border-1 bg-white mb-2 mr-2 lg:hidden" />

              <div className="grid grid-cols-3 sm:grid-cols-6 flex-grow gap-x-12 pr-6">
                {info_to_display.map(
                  (info) =>
                    activity.sport === info.sport &&
                    activity.subSport === info.subSport &&
                    info.items.map((item, index) => (
                      <InfoLine
                        key={index}
                        activity={activity}
                        title={item.title}
                        subTitle={item.subTitle}
                        unit={item.unit}
                      />
                    ))
                )}
              </div>
            </div>
            <div className="p-2 visible lg:invisible lg:group-hover/item:visible self-center">
              <DeleteBlock id={activity.id} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ActivityList;
