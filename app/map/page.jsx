import {
  getActivities,
  getActivitiesCities,
  getActivitiesCountries,
  getActivitiesTypes,
} from "../(actions)/activitiesActions";
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

  const fetchedCountries = await getActivitiesCountries();
  const fetchedCities = await getActivitiesCities();
  const fetchedTypes = await getActivitiesTypes();

  // useEffect(() => {
  //   const fetchCountries = async () => {
  //     const fetchedCountries = await getActivitiesCountries();
  //     setCountries([...fetchedCountries]);
  //   };

  //   fetchCountries();
  // }, []);

  return (
    <div className="flex flex-row gap-2">
      <div className="flex-1">
        <MapBlock countries={[...fetchedCountries]} />
      </div>
      <div className="flex-1">
        <GeneralInfoBlock
          countries={[...fetchedCountries]}
          cities={[...fetchedCities]}
          types={[...fetchedTypes]}
          selectedCountry={params.country}
        />
      </div>
    </div>
  );
}
