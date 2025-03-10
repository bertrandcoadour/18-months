import {
  getActivitiesCities,
  getActivitiesCountries,
  getActivitiesTypes,
} from "../(actions)/activitiesActions";
import GeneralInfoBlock from "../(components)/ActivitiesMap/GeneralInfoBlock";
import MapBlock from "../(components)/ActivitiesMap/MapBlock";
import Link from "next/link";
import { faBan, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function WorldMapPage({ searchParams }) {
  const params = await searchParams;

  const fetchedCountries = await getActivitiesCountries();
  const fetchedCities = await getActivitiesCities();
  const fetchedTypes = await getActivitiesTypes();

  const getCountryOccurences = (countryName) => {
    const foundCountry = fetchedCountries.find(
      (country) => country.entryName === countryName
    );
    if (foundCountry) {
      return foundCountry.entryOccurences;
    } else {
      return undefined;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-2">
      <div className="grid grid-rows-5">
        <div className="row-span-4 p-4">
          <MapBlock countries={[...fetchedCountries]} />
        </div>
        <div className="row-span-1 flex items-center justify-center gap-2 mx-auto  p-4">
          {!params.country && (
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
          {params.country && (
            <Link
              className="hover:cursor-pointer hover:text-slate-900"
              href={`/map/${params.country}`}
            >
              <div className="relative w-full border rounded-md shadow-lg">
                <button className="bg-gray-800 hover:bg-gray-500 text-white py-2 px-4 rounded-md flex items-center justify-center hover:text-black transition cursor-pointer">
                  <span className="mr-2">{`Explore ${getCountryOccurences(
                    params.country
                  )} activities in ${params.country} `}</span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </Link>
          )}
        </div>
      </div>

      <GeneralInfoBlock
        countries={[...fetchedCountries]}
        cities={[...fetchedCities]}
        types={[...fetchedTypes]}
      />
    </div>
  );
}
