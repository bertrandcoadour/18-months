import React from "react";
import Link from "next/link";
import { info_to_display } from "../Utilities/InfoToDisplay/InfoToDisplay";
import { getActivityIcon } from "../Utilities/Icons/Icons";
import SimpleCard from "./SimpleCard";
import DeleteBlock from "./DeleteBlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

function ActivityRow({ activity, size }) {
  const displayEdition = info_to_display.find(
    (info) => info.sport == activity.sport && info.subSport == activity.subSport
  )?.enable_edition;

  return (
    <div className="flex flex-row">
      <div
        className={`flex flex-col ${
          size == "full" && "lg:flex-row lg:border-0"
        } flex-grow  border-r`}
      >
        <div className="flex flex-grow w-full max-w-4xl lg:max-w-2xl xl:shrink-0 pb-1">
          <div className=" w-full max-w-20 self-center pl-2">
            <FontAwesomeIcon
              icon={getActivityIcon(activity.sport, activity.subSport)}
              className="icon"
            />
          </div>

          <Link
            className="hover:cursor-pointer hover:text-slate-900 self-center"
            href={`/activities/${activity.id}`}
          >
            <div className="text-start text-sm overflow-hidden">
              {activity.title}
            </div>

            {activity.city && activity.country && (
              <div className="font-medium text-xs text-start">
                {activity.city + ", " + activity.country}
              </div>
            )}
          </Link>
        </div>

        <hr
          className={`h-px border-1 bg-white mb-2 mr-2 ${
            size == "full" && "lg:hidden"
          }`}
        />

        <div className="grid grid-cols-3 sm:grid-cols-6 flex-grow gap-x-12 pr-6 self-center">
          {info_to_display.map(
            (info) =>
              activity.sport === info.sport &&
              activity.subSport === info.subSport &&
              info.items.map((item, index) => (
                <SimpleCard
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
      <div
        className={`flex flex-col ${
          size == "full" &&
          "lg:flex-row lg:invisible lg:group-hover/item:visible lg:border-l"
        } gap-3 p-2 visible  self-center `}
      >
        {displayEdition && (
          <Link
            className="hover:cursor-pointer hover:text-slate-900"
            href={`/activities/${activity.id}/edit`}
          >
            <FontAwesomeIcon icon={faPen} />
          </Link>
        )}

        <DeleteBlock id={activity.id} />
      </div>
    </div>
  );
}

export default ActivityRow;
