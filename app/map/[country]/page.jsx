import {
  getActivitiesInCountry,
  getActivitiesTypesInCountry,
} from "@/app/(actions)/activitiesActions";
import { getCountryShape } from "@/app/(actions)/countriesActions";
import CountryFilterBlock from "@/app/(components)/CountryMap/CountryFilterBlock";
import CountryInfoBlock from "@/app/(components)/CountryMap/CountryInfoBlock";
import MapBlock from "@/app/(components)/CountryMap/MapBlock";

export default async function CountryMap({ params, searchParams }) {
  const { country } = await params;
  const filters = await searchParams;

  const shape = await getCountryShape(decodeURIComponent(country));
  const activities = await getActivitiesInCountry(decodeURIComponent(country));
  const fetchedTypes = await getActivitiesTypesInCountry(
    decodeURIComponent(country)
  );

  const filteredActivities = activities.filter(
    (activity) =>
      activity.sport === filters.sport && activity.subSport === filters.subSport
  );

  return (
    <div className="flex-flex-col gap-2 h-full">
      <div className="flex flex-col sm:flex-row  justify-between">
        <CountryInfoBlock
          country={decodeURIComponent(country)}
          activities={
            Object.keys(filters).length > 0 ? filteredActivities : activities
          }
          sport={filters.sport}
        />

        <hr className="h-px border-1 bg-activityList  m-2 visible sm:hidden" />

        <CountryFilterBlock sportTypes={fetchedTypes} />
      </div>

      <div className="grid grid-rows-5">
        <div className="row-span-4 px-4">
          <MapBlock
            shape={shape}
            activities={
              Object.keys(filters).length > 0 ? filteredActivities : activities
            }
          />
        </div>
        <div className="row-span-1"></div>
      </div>
    </div>
  );
}
