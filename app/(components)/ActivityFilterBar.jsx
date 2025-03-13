"use client";

import React from "react";
import TypeBox from "./TypeBox";
import { useSearchParams } from "next/navigation";
import { activity_types_icons } from "../Utilities/Icons/Icons";
import { info_to_display } from "../Utilities/InfoToDisplay/InfoToDisplay";
import UpAndDownBox from "./UpAndDownBox";
import SearchBar from "./SearchBar";

function ActivityFilterBar({ sportTypes }) {
  const params = useSearchParams();
  const sport = params?.get("sport");
  const subSport = params?.get("subSport");
  const sort_by = params?.get("sort_by");
  const sort_order = params?.get("sort_order");
  const search = params?.get("search");

  const getTypeOccurences = (activityType) => {
    if (activityType == "All")
      return sportTypes.reduce((sum, item) => sum + item.entryOccurences, 0);

    const foundType = sportTypes.find(
      (type) => type.entryName === activityType
    );
    if (foundType) {
      return foundType.entryOccurences;
    } else {
      return undefined;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row justify-between">
        <h1 className=" lg:p-4 md:p-3 p-1 text-lg md:text-2xl lg:text-3xl font-semibold text-start self-center">
          Activities
        </h1>

        <div className=" flex flex-col lg:flex-row">
          <div className="flex lg:p-4 md:p-2 p-1 lg:self-center md:self-start self-center">
            <SearchBar isActive={search} />
          </div>
          <div className="flex flex-row self-center lg:p-4 md:p-2 p-1">
            {activity_types_icons.map(
              (item, index) =>
                item.label != "Not found" && (
                  <TypeBox
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    subLabel={item.subLabel}
                    description={item.description}
                    occurrences={getTypeOccurences(item.label)}
                    selected={
                      sport === item.label && subSport === item.subLabel
                    }
                  />
                )
            )}
          </div>
        </div>
      </div>

      {sport && subSport && (
        <div className="flex flex-row flex-grow max-lg:hidden">
          <div className="w-full max-w-20 pl-2" />
          <div className="w-full max-w-lg xl:shrink-0" />
          <div className="grid grid-cols-6 flex-grow gap-x-12 pr-20">
            {info_to_display.map(
              (info) =>
                sport === info.sport &&
                subSport === info.subSport &&
                info.items.map((item, index) => (
                  <UpAndDownBox
                    key={index}
                    label={item.title}
                    subLabel={item.subTitle}
                    selected={sort_by == item.title}
                    isAscending={sort_by == item.title && sort_order === "asc"}
                  />
                ))
            )}
            <div className="w-full max-w-60 min-w-44"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ActivityFilterBar;
