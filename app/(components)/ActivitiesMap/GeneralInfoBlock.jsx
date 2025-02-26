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
import InfoCard from "../InfoCard";
import { Icon } from "leaflet";

function GeneralInfoBlock({ countries, cities, types, selectedCountry }) {
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

  const getCountryOccurences = (countryName) => {
    const foundCountry = countries.find(
      (country) => country.entryName === countryName
    );
    if (foundCountry) {
      return foundCountry.entryOccurences;
    } else {
      return undefined;
    }
  };

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
      const distance = await runningActivitiesTotalDistance();
      setRunningDistance(distance);
    };
    const fetchWalkingDistance = async () => {
      const distance = await walkingActivitiesTotalDistance();
      setWalkingDistance(distance);
    };
    const fetchCyclingDistance = async () => {
      const distance = await cyclingActivitiesTotalDistance();
      setCyclingDistance(distance);
    };

    const fetchAvgRunningPace = async () => {
      const avg = await runningActivitiesAvgPace();
      setAvgRunningPace(avg);
    };

    const fetchWalkingTotalAscent = async () => {
      const total = await walkingActivitiesTotalAscent();
      setWalkingTotalAscent(total);
    };

    const fetchCyclingMaxSpeed = async () => {
      const max = await cyclingActivitiesMaximumSpeed();
      setCyclingMaxSpeed(max);
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
      <h2 className="flex items-center justify-center font-medium p-4">
        World Map
      </h2>

      <hr className="h-px border-1 bg-activityList mb-2 mr-2" />
      <div className="lg:grid grid-cols-2 xl:grid-cols-3 p-1 pb-5">
        <InfoCard
          icon={faCloudArrowUp}
          title={totalOccurrences}
          subTitle={"Activities"}
        />
        <InfoCard
          icon={faPassport}
          title={countries.length}
          subTitle={"Countries"}
        />
        <InfoCard
          icon={faFlagUsa}
          title={mostFrequentCountry.entryName}
          subTitle={"most visitied country"}
        />
        <InfoCard
          icon={faTreeCity}
          title={mostFrequentCity.entryName}
          subTitle={"most visitied city"}
        />
        <InfoCard
          icon={faRankingStar}
          title={mostFrequentType.entryName}
          subTitle={"favourite activity"}
        />
        <InfoCard
          icon={faCalendarCheck}
          title={totalTime}
          subTitle={"hours of training"}
        />
      </div>

      <hr className="h-px border-1 bg-activityList mb-2 mr-2" />

      <div className="lg:grid grid-cols-2 xl:grid-cols-3 p-2 pb-5">
        <InfoCard
          icon={faPersonRunning}
          title={getTypeOccurences("running")}
          subTitle={"activities"}
        />
        <InfoCard
          icon={faRoad}
          title={runningDistance}
          subTitle={"total distance (km)"}
        />
        <InfoCard
          icon={faGaugeHigh}
          title={avgRunningPace}
          subTitle={"avg pace (min/km)"}
        />
      </div>

      <div className="lg:grid grid-cols-2 xl:grid-cols-3 p-2 pb-5">
        <InfoCard
          icon={faPersonHiking}
          title={getTypeOccurences("walking")}
          subTitle={"activities"}
        />
        <InfoCard
          icon={faRoad}
          title={walkingDistance}
          subTitle={"total distance (km)"}
        />
        <InfoCard
          icon={faMountain}
          title={walkingTotalAscent}
          subTitle={"total ascent (m)"}
        />
      </div>
      <div className="lg:grid grid-cols-2 xl:grid-cols-3 p-2 pb-5">
        <InfoCard
          icon={faPersonBiking}
          title={getTypeOccurences("cycling")}
          subTitle={"activities"}
        />
        <InfoCard
          icon={faRoad}
          title={cyclingDistance}
          subTitle={"total distance (km)"}
        />
        <InfoCard
          icon={faTruckFast}
          title={cyclingMaxSpeed}
          subTitle={"max speed (km/h)"}
        />
      </div>
      <hr className="h-px border-1 bg-activityList mb-2 mr-2" />
      <div className="flex items-center justify-center gap-2 mx-auto h-full">
        {!selectedCountry && (
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-row gap-4">
              <FontAwesomeIcon icon={faBan} size="2xl" className="icon " />
              <h3>No country selected !</h3>
            </div>
            <h6 className="font-light text-sm self-center">
              Select a country on the map for more info
            </h6>
          </div>
        )}
        {selectedCountry && (
          <Link
            className="hover:cursor-pointer hover:text-slate-900"
            href={`/map/${selectedCountry}`}
          >
            <div className="relative w-full border rounded-md shadow-lg">
              <button className="bg-gray-800 hover:bg-gray-500 text-white py-2 px-4 rounded-md flex items-center justify-center hover:text-black transition cursor-pointer">
                <span className="mr-2">{`Explore ${getCountryOccurences(
                  selectedCountry
                )} activities in ${selectedCountry} `}</span>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default GeneralInfoBlock;
