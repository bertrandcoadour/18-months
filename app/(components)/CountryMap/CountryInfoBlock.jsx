"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  faCloudArrowUp,
  faPassport,
  faPersonRunning,
  faRankingStar,
  faFlagUsa,
  faCalendarCheck,
  faTreeCity,
  faRoad,
  faGaugeHigh,
  faPersonBiking,
  faMountain,
  faPersonSwimming,
  faDumbbell,
  faNotdef,
  faPerson,
  faPersonWalking,
  faPersonHiking,
  faBan,
  faArrowRight,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import ActivityRow from "../ActivityRow";

function CountryInfoBlock({ activities, selectedActivities }) {
  return (
    <ul className="leading-8">
      {selectedActivities.map((activity, index) => (
        <li
          key={activity.id}
          className=" group/item bg-activityList hover:bg-activityList-hover rounded-md  p-1 m-1"
        >
          <ActivityRow activity={activity} size={"half"} />
        </li>
      ))}
    </ul>
  );
}

export default CountryInfoBlock;
