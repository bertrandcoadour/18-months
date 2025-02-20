import { getActivities } from "../(actions)/activitiesActions";
import GeneralInfoBlock from "../(components)/ActivitiesMap/GeneralInfoBlock";
import MapBlock from "../(components)/ActivitiesMap/MapBlock";
import { fillCityDB, fillCountryDB } from "../Utilities/map/db";
import {
  getNearestCity,
  updateActivitiesCountryAndCity,
  updateActivitiesTitle,
} from "../Utilities/map/mapUtilities";

export default async function WorldMap({ searchParams }) {
  const params = await searchParams;
  //const activities = await getActivities({});

  //const rslt = await updateActivitiesCountryAndCity(activities, cities);
  //const rslt = await updateActivitiesTitle(activities);

  return (
    <div className="flex flex-row gap-2">
      <div className="flex-1">
        <MapBlock />
      </div>
      <div className="flex-1">
        <GeneralInfoBlock selectedCountry={params.country} />
      </div>
    </div>
  );
}
