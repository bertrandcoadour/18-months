import {
  country_cycling_icons,
  country_general_icons,
  country_running_icons,
  country_walking_icons,
} from "@/app/Utilities/Icons/Icons";
import React from "react";

import { getMetrics } from "@/app/Utilities/Activity/activityUtilities";
import IconCard from "../IconCard";

function CountryInfoBlock({ country, activities, sport }) {
  const metrics = getMetrics(activities, sport);

  return (
    <div className="flex flex-row justify-between gap-x-5">
      <h1 className=" lg:p-4 md:p-3 p-2 text-2xl lg:text-3xl font-semibold text-start self-center">
        {country}
      </h1>
      <div className="grid grid-cols-2 xl:grid-cols-4 p-1 sm:p-5">
        {!sport &&
          country_general_icons.map((item, index) => (
            <IconCard
              key={index}
              icon={item.icon}
              title={metrics[item.label]}
              subTitle={item.description}
            />
          ))}
        {sport == "running" &&
          country_running_icons.map((item, index) => (
            <IconCard
              key={index}
              icon={item.icon}
              title={metrics[item.label]}
              subTitle={item.description}
            />
          ))}
        {sport == "walking" &&
          country_walking_icons.map((item, index) => (
            <IconCard
              key={index}
              icon={item.icon}
              title={metrics[item.label]}
              subTitle={item.description}
            />
          ))}
        {sport == "cycling" &&
          country_cycling_icons.map((item, index) => (
            <IconCard
              key={index}
              icon={item.icon}
              title={metrics[item.label]}
              subTitle={item.description}
            />
          ))}
      </div>
    </div>
  );
}

export default CountryInfoBlock;
