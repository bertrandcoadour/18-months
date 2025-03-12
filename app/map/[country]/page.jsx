import { getActivitiesInCountry } from "@/app/(actions)/activitiesActions";
import { getCountryShape } from "@/app/(actions)/countriesActions";
import MapBlock from "@/app/(components)/CountryMap/MapBlock";

export default async function CountryMap({ params, searchParams }) {
  const { country } = await params;
  const filters = await searchParams;

  const shape = await getCountryShape(decodeURIComponent(country));
  const activities = await getActivitiesInCountry(decodeURIComponent(country));

  let filteredActivities = [];
  activities.forEach((element) => {
    if (element.sport === filters.sport) filteredActivities.push(element);
  });

  return (
    <MapBlock
      shape={shape}
      activities={
        Object.keys(filters).length > 0 ? filteredActivities : activities
      }
    />
  );
}
