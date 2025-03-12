import { activity_types_icons } from "@/app/Utilities/Icons/Icons";
import React from "react";
import TypeBox from "../TypeBox";
import { useSearchParams } from "next/navigation";

function CountryFilterBlock({ activities }) {
  const params = useSearchParams();
  const sport = params?.get("sport");
  const subSport = params?.get("subSport");

  return (
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
              selected={sport === item.label && subSport === item.subLabel}
            />
          )
      )}
    </div>
  );
}

export default CountryFilterBlock;
