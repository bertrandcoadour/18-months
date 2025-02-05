"use client";

import { useMemo, useState, useEffect } from "react";

import dynamic from "next/dynamic";

import { getAllDistancesAndCoordinates } from "../../Utilities/charts/chartUtilities";
import Dropdown from "../Dropdown";
import {
  activity_types_icons,
  getActivityDescription,
} from "@/app/Utilities/Icons/Icons";
import {
  getAllCountries,
  getCitiesFromCountry,
  getCountryCode,
} from "@/app/(actions)/countriesActions";

function ActivityEditionBlock({ activity }) {
  const [type, setType] = useState(
    getActivityDescription(activity.sport, activity.subSport)
  );
  const [title, setTitle] = useState(activity.title);
  const [country, setCountry] = useState(activity.country);
  const [city, setCity] = useState(activity.city);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const selectedKmCoords = [];
  const hoveredKmCoords = [];

  const activityTypesOptions = activity_types_icons
    .filter((item) => item.description && item.label != "All")
    .map((item) => item.description);

  const distancesAndCoord = useMemo(() => {
    return getAllDistancesAndCoordinates(activity.records);
  }, [activity.records]);

  const coordinates = useMemo(() => {
    return distancesAndCoord.map((item) => [item.longitude, item.latitude]);
  }, [distancesAndCoord]);

  const ClientMap = useMemo(
    () =>
      dynamic(() => import("./Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  useEffect(() => {
    const fetchCountries = async () => {
      let countries = await getAllCountries(); // API call
      countries = countries.map((c) => c.name);
      console.log(countries);
      setCountries(countries);
    };

    fetchCountries();
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    const fetchCities = async () => {
      //const countryCode = await getCountryCode(country);

      let cities = await getCitiesFromCountry(country); // API call
      // console.log(cities);
      cities = cities.map((c) => c.name);
      console.log(cities);
      setCities(cities);
    };

    fetchCities();
  }, [country]); // Empty dependency array ensures this runs only once

  const handleTypeChanged = (event) => {
    setType(event);
  };

  const handleTitleChange = (event) => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event);
  };

  const handleCityChange = (event) => {
    setCity(event);
  };

  console.log(cities);

  return (
    <div>
      <div className="flex flex-row">
        <div className="flex-1  p-44">
          <div className="flex  items-center">
            <span className="w-full max-w-40">Activity Type : </span>
            <Dropdown
              options={activityTypesOptions}
              onSelect={handleTypeChanged}
              defaultValue={type}
            />
          </div>
          <div className="flex items-center">
            <span className="w-full max-w-40">Title : </span>
            <textarea
              type="text"
              value={title}
              style={{ width: "320px", height: "80px" }}
              onChange={handleTitleChange}
              placeholder="Your activity title..."
            />
          </div>
          <div className="flex  items-center">
            <span className="w-full max-w-40">Country : </span>
            <Dropdown
              options={countries}
              onSelect={handleCountryChange}
              defaultValue={country}
            />
          </div>
          <div className="flex  items-center">
            <span className="w-full max-w-40">City : </span>
            <Dropdown
              options={cities}
              onSelect={handleCityChange}
              defaultValue={city}
            />
          </div>
        </div>
        <div className="flex-1 p-10 pr-32 ">
          {coordinates && (
            <ClientMap
              fullTrackCoords={coordinates}
              selectedKmCoords={selectedKmCoords}
              hoveredKmCoords={hoveredKmCoords}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ActivityEditionBlock;
