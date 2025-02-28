import {
  getActivitiesCities,
  getActivitiesCountries,
  getActivitiesTypes,
} from "../(actions)/activitiesActions";
import GeneralInfoBlock from "../(components)/ActivitiesMap/GeneralInfoBlock";
import MapBlock from "../(components)/ActivitiesMap/MapBlock";

export default async function WorldMapPage({ searchParams }) {
  const params = await searchParams;

  const fetchedCountries = await getActivitiesCountries();
  const fetchedCities = await getActivitiesCities();
  const fetchedTypes = await getActivitiesTypes();

  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 gap-2">
      <div>
        <MapBlock countries={[...fetchedCountries]} />
      </div>
      <div>
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
