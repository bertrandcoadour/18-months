"use client";

import React from "react";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { getActivityIcon } from "../Utilities/Icons/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { info_to_display } from "../Utilities/InfoToDisplay/InfoToDisplay";
import InfoLine from "./InfoLine";
import DeleteBlock from "./DeleteBlock";
import { getGPXById } from "../(actions)/GPX/GPXActions";

function ActivityList({ allActivitiesCount, activities, searchCount }) {
  function handleNext() {
    searchCount = Object.keys(activities).length + 100;
  }

  return (
    <ul className="flex flex-col leading-8">
      {activities.map((activity) => (
        <li
          key={activity.id}
          className=" group/item bg-activityList hover:bg-activityList-hover rounded-md  p-1 m-1"
        >
          <div className="flex flex-row">
            <div className=" w-full max-w-20 self-center pl-2">
              <FontAwesomeIcon
                icon={getActivityIcon(activity.sport, activity.subSport)}
                className="icon"
              />
            </div>

            <div className="w-full max-w-xl self-center">
              <Link
                className="hover:cursor-pointer hover:text-slate-900"
                href={`/activities/${activity.id}`}
              >
                <div className="text-start ">{activity.title}</div>

                <div className="flex flex-row gap-5">
                  <div className="font-medium text-xs text-start">
                    {activity.city + ", " + activity.country}
                  </div>
                </div>
              </Link>
            </div>

            <div className="flex flex-grow">
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
              <div className="flex flex-col self-center pr-2  invisible group-hover/item:visible">
                <DeleteBlock id={activity.id} />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ActivityList;
