"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  activitiesCount,
  getActivitiesCountries,
  runningActivitiesCount,
  runningActivitiesTotalDistance,
  walkingActivitiesCount,
  walkingActivitiesTotalDistance,
} from "@/app/(actions)/activitiesActions";

function GeneralInfoBlock({ selectedCountry }) {
  const [countries, setCountries] = useState([]);
  const [activityCount, setActivityCount] = useState(0);
  const [walkingCount, setWalkingCount] = useState(0);
  const [walkingDistance, setWalkingDistance] = useState(0);
  const [runningCount, setRunningCount] = useState(0);
  const [runningDistance, setRunningDistance] = useState(0);

  useEffect(() => {
    const fetchCountries = async () => {
      const fetchedCountries = await getActivitiesCountries();
      setCountries([...fetchedCountries]);
    };

    const fetchActivitesCount = async () => {
      const count = await activitiesCount();
      setActivityCount(count);
    };

    const fetchWalkingCount = async () => {
      const count = await walkingActivitiesCount();
      setWalkingCount(count);
    };

    const fetchWalkingDistance = async () => {
      const distance = await walkingActivitiesTotalDistance();
      setWalkingDistance(distance);
    };

    const fetchRunningCount = async () => {
      const count = await runningActivitiesCount();
      setRunningCount(count);
    };

    const fetchRunningDistance = async () => {
      const distance = await runningActivitiesTotalDistance();
      setRunningDistance(distance);
    };

    fetchCountries();
    fetchActivitesCount();
    fetchWalkingCount();
    fetchWalkingDistance();
    fetchRunningCount();
    fetchRunningDistance();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center  h-full w-full gap-2">
      {!selectedCountry && (
        <div className="flex flex-col items-center">
          <h2>{`${activityCount} activities recorded in ${countries.length} countries`}</h2>
          <h6>{`You walked a total of ${walkingDistance} kms in ${walkingCount} activities`}</h6>
          <h6>{`You run a total of ${runningDistance} kms in ${runningCount} activities`}</h6>
        </div>
      )}

      {selectedCountry && (
        <Link
          className="hover:cursor-pointer hover:text-slate-900"
          href={`/map/${selectedCountry}`}
        >
          <h6>{`In ${selectedCountry} you clicked`}</h6>
        </Link>
      )}
    </div>
  );
}

export default GeneralInfoBlock;
