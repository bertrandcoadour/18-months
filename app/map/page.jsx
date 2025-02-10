import { getActivities } from "../(actions)/activitiesActions";
import MapBlock from "../(components)/ActivitiesMap/MapBlock";
import { fillCityDB, fillCountryDB } from "../Utilities/map/db";
import {
  getNearestCity,
  updateActivitiesCountryAndCity,
  updateActivitiesTitle,
} from "../Utilities/map/mapUtilities";

export default async function WorldMap() {
  //const activities = await getActivities({});

  //const rslt = await updateActivitiesCountryAndCity(activities, cities);
  //const rslt = await updateActivitiesTitle(activities);

  return (
    <div className="flex flex-col">
      <MapBlock />
    </div>
  );
}
