"use client";

import { activity_types_icons } from "@/app/Utilities/Icons/Icons";
import React from "react";
import TypeBox from "../TypeBox";
import { useSearchParams } from "next/navigation";

function CountryFilterBlock({ country, sportTypes, activities }) {
  const params = useSearchParams();
  const sport = params?.get("sport");
  const subSport = params?.get("subSport");

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
    <div className="flex flex-row self-center lg:p-4 md:p-2 p-4">
      {activity_types_icons.map(
        (item, index) =>
          item.label != "Not found" &&
          (sportTypes.find((sport) => sport.entryName == item.label) ||
            item.label == "All") && (
            <TypeBox
              key={index}
              icon={item.icon}
              label={item.label}
              subLabel={item.subLabel}
              description={item.description}
              occurrences={getTypeOccurences(item.label)}
              selected={sport === item.label && subSport === item.subLabel}
            />
          )
      )}
    </div>
  );
}

export default CountryFilterBlock;
