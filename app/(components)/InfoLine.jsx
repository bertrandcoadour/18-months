import React from "react";
import {
  convertMetersPerSecondsToKmPerSeconds,
  convertMetersPerSecondsToPace,
  convertMetersToKms,
  convertSecondsToHoursMinutesSeconds,
  convertTimestampToDate,
} from "../Utilities/Global/convertData";

export default function InfoLine({ activity, title, subTitle, unit }) {
  function getValue() {
    switch (title) {
      case "timestamp":
        return convertTimestampToDate(activity[title]);
      case "totalDistance":
        return convertMetersToKms(activity[title]);
      case "totalElapsedTime":
        return convertSecondsToHoursMinutesSeconds(activity[title]);
      case "enhancedAvgSpeed": {
        if (activity.sport === "cycling")
          return convertMetersPerSecondsToKmPerSeconds(activity[title]);
        else return convertMetersPerSecondsToPace(activity[title]);
      }
      default:
        return activity[title];
    }
  }

  return (
    <div className=" w-full max-w-60 min-w-44 self-start p-1">
      <div className="text-start">{`${getValue()} ${unit ? unit : ""}`}</div>
      <div className="font-medium text-xs text-start">
        {subTitle ? subTitle : ""}
      </div>
    </div>
  );
}
