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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  activitiesCount,
  cyclingActivitiesMaximumSpeed,
  cyclingActivitiesTotalDistance,
  getActivitiesCountries,
  getTotalTimeOfTraining,
  runningActivitiesAvgPace,
  runningActivitiesCount,
  runningActivitiesTotalDistance,
  walkingActivitiesCount,
  walkingActivitiesTotalAscent,
  walkingActivitiesTotalDistance,
} from "@/app/(actions)/activitiesActions";
import IconCard from "../IconCard";

function GeneralInfoBlock({ countries, cities, types }) {
  const [walkingDistance, setWalkingDistance] = useState(0);
  const [runningDistance, setRunningDistance] = useState(0);
  const [cyclingDistance, setCyclingDistance] = useState(0);
  const [avgRunningPace, setAvgRunningPace] = useState(0);
  const [walkingTotalAscent, setWalkingTotalAscent] = useState(0);
  const [cyclingMaxSpeed, setCyclingMaxSpeed] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const mostFrequentCountry = countries.reduce((max, current) => {
    return current.entryOccurences > max.entryOccurences ? current : max;
  }, countries[0]); // Start with the first country as the initial max

  const mostFrequentCity = cities.reduce((max, current) => {
    return current.entryOccurences > max.entryOccurences ? current : max;
  }, cities[0]); // Start with the first city as the initial max

  const totalOccurrences = countries.reduce((sum, country) => {
    return sum + country.entryOccurences;
  }, 0); // Start with an initial sum of 0

  const mostFrequentType = types.reduce((max, current) => {
    return current.entryOccurences > max.entryOccurences ? current : max;
  }, types[0]); // Start with the first country as the initial max

  const getTypeOccurences = (activityType) => {
    const foundType = types.find((type) => type.entryName === activityType);
    if (foundType) {
      return foundType.entryOccurences;
    } else {
      return undefined;
    }
  };

  useEffect(() => {
    const fetchRunningDistance = async () => {
      try {
        const res = await fetch("/api/activities/running/totalDistance", {
          method: "GET",
          cache: "force-cache",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch running total distance");
        }
        setRunningDistance(await res.json());
      } catch (error) {
        throw new Error("Failed to fetch running total distance");
      }
    };

    const fetchWalkingDistance = async () => {
      try {
        const res = await fetch("/api/activities/walking/totalDistance", {
          method: "GET",
          cache: "force-cache",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch walking total distance");
        }
        setWalkingDistance(await res.json());
      } catch (error) {
        throw new Error("Failed to fetch walking total distance");
      }
    };
    const fetchCyclingDistance = async () => {
      try {
        const res = await fetch("/api/activities/cycling/totalDistance", {
          method: "GET",
          cache: "force-cache",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch cycling total distance");
        }
        setCyclingDistance(await res.json());
      } catch (error) {
        throw new Error("Failed to fetch cycling total distance");
      }
    };

    const fetchAvgRunningPace = async () => {
      try {
        const res = await fetch("/api/activities/running/averagePace", {
          method: "GET",
          cache: "force-cache",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch average running pace");
        }
        setAvgRunningPace(await res.json());
      } catch (error) {
        throw new Error("Failed to fetch average running pace");
      }
    };

    const fetchWalkingTotalAscent = async () => {
      try {
        const res = await fetch("/api/activities/walking/totalAscent", {
          method: "GET",
          cache: "force-cache",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch walking total ascent");
        }
        setWalkingTotalAscent(await res.json());
      } catch (error) {
        throw new Error("Failed to fetch average running pace");
      }
    };

    const fetchCyclingMaxSpeed = async () => {
      try {
        const res = await fetch("/api/activities/cycling/maximumSpeed", {
          method: "GET",
          cache: "force-cache",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch cycling maximum speed");
        }
        setCyclingMaxSpeed(await res.json());
      } catch (error) {
        throw new Error("Failed to fetch cycling maximum speed");
      }
    };

    const fetchTotalTime = async () => {
      const total = await getTotalTimeOfTraining();
      setTotalTime(total);
    };

    fetchRunningDistance();
    fetchWalkingDistance();
    fetchCyclingDistance();
    fetchAvgRunningPace();
    fetchWalkingTotalAscent();
    fetchCyclingMaxSpeed();
    fetchTotalTime();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <hr className="h-px border-1 bg-activityList mb-2 mr-2 mt-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 p-1 pb-5">
        <IconCard
          icon={faCloudArrowUp}
          title={totalOccurrences}
          subTitle={"Activities"}
        />
        <IconCard
          icon={faPassport}
          title={countries.length}
          subTitle={"Countries"}
        />
        <IconCard
          icon={faFlagUsa}
          title={mostFrequentCountry.entryName}
          subTitle={"most visitied country"}
        />
        <IconCard
          icon={faTreeCity}
          title={mostFrequentCity.entryName}
          subTitle={"most visitied city"}
        />
        <IconCard
          icon={faRankingStar}
          title={mostFrequentType.entryName}
          subTitle={"favourite activity"}
        />
        <IconCard
          icon={faCalendarCheck}
          title={totalTime}
          subTitle={"hours of training"}
        />
      </div>

      <hr className="h-px border-1 bg-activityList mb-2 mr-2" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 p-1 pb-5">
        <IconCard
          className=""
          icon={faPersonRunning}
          title={getTypeOccurences("running")}
          subTitle={"activities"}
        />
        <IconCard
          icon={faRoad}
          title={runningDistance}
          subTitle={"total distance (km)"}
        />
        <IconCard
          icon={faGaugeHigh}
          title={avgRunningPace}
          subTitle={"avg pace (min/km)"}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 p-1 pb-5">
        <IconCard
          icon={faPersonHiking}
          title={getTypeOccurences("walking")}
          subTitle={"activities"}
        />
        <IconCard
          icon={faRoad}
          title={walkingDistance}
          subTitle={"total distance (km)"}
        />
        <IconCard
          icon={faMountain}
          title={walkingTotalAscent}
          subTitle={"total ascent (m)"}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 p-1 pb-5">
        <IconCard
          icon={faPersonBiking}
          title={getTypeOccurences("cycling")}
          subTitle={"activities"}
        />
        <IconCard
          icon={faRoad}
          title={cyclingDistance}
          subTitle={"total distance (km)"}
        />
        <IconCard
          icon={faTruckFast}
          title={cyclingMaxSpeed}
          subTitle={"max speed (km/h)"}
        />
      </div>
      <hr className="h-px border-1 bg-activityList mb-2 mr-2" />
    </div>
  );
}

export default GeneralInfoBlock;
