import { getActivities } from "../(actions)/activitiesActions";
import { getAllCities, getCountryName } from "../(actions)/countriesActions";
import MapBlock from "../(components)/ActivitiesMap/MapBlock";
import { fillCityDB, fillCountryDB } from "../Utilities/map/db";
import {
  getNearestCity,
  updateActivitiesCountryAndCity,
  updateActivitiesTitle,
} from "../Utilities/map/mapUtilities";
import { countryCodeParser, countryShapeParser } from "../Utilities/map/parser";

export default async function WorldMap() {
  const activities = await getActivities({});
  //const cities = await getAllCities();

  //const rslt = await updateActivitiesCountryAndCity(activities, cities);
  //const rslt = await updateActivitiesTitle(activities);

  return (
    <div className="flex flex-col">
      <MapBlock activities={activities} />
    </div>
  );
}
