"use client";

import React from "react";
import TypeBox from "./TypeBox";
import { useSearchParams } from "next/navigation";
import { activity_types_icons } from "../Utilities/Icons/Icons";
import { info_to_display } from "../Utilities/InfoToDisplay/InfoToDisplay";
import UpAndDownBox from "./UpAndDownBox";
import SearchBar from "./SearchBar";

function ActivityFilterBar() {
  const params = useSearchParams();
  const sport = params?.get("sport");
  const subSport = params?.get("subSport");
  const sort_by = params?.get("sort_by");
  const sort_order = params?.get("sort_order");
  const search = params?.get("search");

  return (
    <div className="flex flex-col">
      <div className="flex flex-row m-4">
        {/* <h1 className="flex-grow text-3xl font-semibold self-center text-start">{`${
          params.size > 0 && search == null ? sport : "all "
        } activities`}</h1> */}
        <h1 className="flex-grow text-3xl font-semibold self-center text-start">
          Activities
        </h1>
        <div className="flex pr-6">
          <SearchBar isActive={search} />
        </div>

        <div className=" flex flex-row">
          {activity_types_icons.map(
            (item, index) =>
              item.label != "Not found" && (
                <TypeBox
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  subLabel={item.subLabel}
                  description={item.description}
                  selected={sport === item.label && subSport === item.subLabel}
                />
              )
          )}
        </div>
      </div>

      {sport && subSport && (
        <div className="flex flex-row">
          <div className="w-full max-w-20" />
          <div className="w-full max-w-xl" />
          <div className="flex flex-grow">
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
          </div>
        </div>
      )}
    </div>
  );
}

export default ActivityFilterBar;
