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
  faPersonHiking,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  activitiesCount,
  cyclingActivitiesMaximumSpeed,
  cyclingActivitiesTotalDistance,
  getActivitiesCountries,
  getActivitiesCities,
  getActivitiesTypes,
  getTotalTimeOfTraining,
  runningActivitiesAvgPace,
  runningActivitiesCount,
  runningActivitiesTotalDistance,
  walkingActivitiesCount,
  walkingActivitiesTotalAscent,
  walkingActivitiesTotalDistance,
  cyclingActivitiesCount,
} from "@/src/actions/activitiesActions";
import IconCard from "@/src/components/IconCard";
import { convertStringifiedDBTypeToActivityType } from "@/src/utils/Global/convertData";
import { cache } from "react";

async function GeneralInfoBlock() {
  const activitiesInCountries = await getActivitiesCountries();
  const mostFrequentCountry = activitiesInCountries?.reduce((max, current) => {
    return current.entryOccurences > max.entryOccurences ? current : max;
  }, activitiesInCountries?.at(0)); // Start with the first country as the initial max

  const activitiesInCities = await getActivitiesCities();
  const mostFrequentCity = activitiesInCities?.reduce((max, current) => {
    return current.entryOccurences > max.entryOccurences ? current : max;
  }, activitiesInCities?.at(0)); // Start with the first country as the initial max

  const activitiesTypes = await getActivitiesTypes();
  const mostFrequentType = activitiesTypes?.reduce((max, current) => {
    return current.entryOccurences > max.entryOccurences ? current : max;
  }, activitiesTypes?.at(0)); // Start with the first country as the initial max

  const totalOccurrences = activitiesInCountries.reduce((sum, country) => {
    return sum + country.entryOccurences;
  }, 0); // Start with an initial sum of 0

  const runningCount = await runningActivitiesCount();
  const totalRunningDistance = await runningActivitiesTotalDistance();
  const avgRunningPace = await runningActivitiesAvgPace();

  const walkingCount = await walkingActivitiesCount();
  const walkingTotalDistance = await walkingActivitiesTotalDistance();
  const walkingTotalAscent = await walkingActivitiesTotalAscent();

  const cyclingCount = await cyclingActivitiesCount();
  const cyclingTotalDistance = await cyclingActivitiesTotalDistance();
  const cyclingMaxSpeed = await cyclingActivitiesMaximumSpeed();

  const totalTime = await getTotalTimeOfTraining();

  return (
    <div className="flex flex-col h-full">
      <hr className="h-px border-1 bg-activityList mb-2 mr-2 mt-4" />
      <div className="grid grid-cols-2 xl:grid-cols-3 p-1 pb-5">
        <IconCard
          icon={faCloudArrowUp}
          title={totalOccurrences}
          subTitle={"Activities"}
        />
        <IconCard
          icon={faPassport}
          title={activitiesInCountries.length}
          subTitle={"Countries"}
        />
        <IconCard
          icon={faFlagUsa}
          title={mostFrequentCountry?.entryName}
          subTitle={"most visitied country"}
        />
        <IconCard
          icon={faTreeCity}
          title={mostFrequentCity.entryName}
          subTitle={"most visitied city"}
        />
        <IconCard
          icon={faRankingStar}
          title={convertStringifiedDBTypeToActivityType(
            mostFrequentType.entryName
          )}
          subTitle={"favourite activity"}
        />
        <IconCard
          icon={faCalendarCheck}
          title={totalTime}
          subTitle={"hours of training"}
        />
      </div>

      <hr className="h-px border-1 bg-activityList mb-2 mr-2" />

      <div className="grid grid-cols-2 xl:grid-cols-3 p-1 pb-5">
        <IconCard
          className=""
          icon={faPersonRunning}
          title={runningCount}
          subTitle={"activities"}
        />
        <IconCard
          icon={faRoad}
          title={totalRunningDistance}
          subTitle={"total distance (km)"}
        />
        <IconCard
          icon={faGaugeHigh}
          title={avgRunningPace}
          subTitle={"avg pace (min/km)"}
        />
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-3 p-1 pb-5">
        <IconCard
          icon={faPersonHiking}
          title={walkingCount}
          subTitle={"activities"}
        />
        <IconCard
          icon={faRoad}
          title={walkingTotalDistance}
          subTitle={"total distance (km)"}
        />
        <IconCard
          icon={faMountain}
          title={walkingTotalAscent}
          subTitle={"total ascent (m)"}
        />
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-3 p-1 pb-5">
        <div>
          <IconCard
            icon={faPersonBiking}
            title={cyclingCount}
            subTitle={"activities"}
          />
        </div>
        <div>
          <IconCard
            icon={faRoad}
            title={cyclingTotalDistance}
            subTitle={"total distance (km)"}
          />
        </div>
        <div>
          <IconCard
            icon={faTruckFast}
            title={cyclingMaxSpeed}
            subTitle={"max speed (km/h)"}
          />
        </div>
      </div>
      <hr className="h-px border-1 bg-activityList mb-2 mr-2" />
    </div>
  );
}

export default GeneralInfoBlock;
