"use client";

import { useMemo, useState, useEffect, useActionState } from "react";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { getAllDistancesAndCoordinates } from "../../Utilities/charts/chartUtilities";
import Dropdown from "../Dropdown";
import {
  activity_types_icons,
  getActivityDescription,
} from "@/app/Utilities/Icons/Icons";
import {
  getAllCountries,
  getCitiesFromCountry,
} from "@/app/(actions)/countriesActions";
import {
  getCitiesWithinKilometers,
  updateActivitiesTitle,
} from "@/app/Utilities/map/mapUtilities";
import { submitActivityEditionForm } from "@/app/(actions)/activitiesActions";

function ActivityEditionBlock({ activity }) {
  const router = useRouter();

  const [type, setType] = useState(
    getActivityDescription(activity.sport, activity.subSport)
  );
  const [title, setTitle] = useState(activity.title);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [locationLat, setLocationLat] = useState(0);
  const [locationLong, setLocationLong] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false); // State for button enabled/disabled
  const [error, handleSubmit, isPending] = useActionState(
    submitActivityEditionForm,
    null
  );

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
    const getLocationOrigin = async () => {
      let cities = await getCitiesFromCountry(activity.country);
      let cityInfo = cities.filter((c) => c.name == activity.city);

      if (cityInfo) {
        setLocationLat(cityInfo.at(0).latitude);
        setLocationLong(cityInfo.at(0).longitude);
      }
    };

    getLocationOrigin();

    setCountry(activity.country);
    setCity(activity.city);
  }, [activity.country, activity.city]);

  useEffect(() => {
    const fetchCountries = async () => {
      let countries = await getAllCountries(); // API call
      countries = countries.map((c) => c.name);
      setCountries(countries);
    };

    fetchCountries();
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    validateForm();
  });

  useEffect(() => {
    const fetchCities = async () => {
      if (locationLat != 0 && locationLong != 0) {
        let citiesInSelectedCountry = await getCitiesFromCountry(
          country ? country : activity.country
        );

        let citiesAround = getCitiesWithinKilometers(
          citiesInSelectedCountry,
          locationLat,
          locationLong,
          30
        );

        citiesAround = citiesAround.map((c) => c.name);
        setCities(citiesAround);
      }
    };

    fetchCities();
  }, [country, activity.country, locationLat, locationLong]); // Empty dependency array ensures this runs only once

  const handleTypeChanged = (event) => {
    setType(event);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event);
    setCity("");
  };

  const handleCityChange = (event) => {
    setCity(event);
  };

  const validateForm = () => {
    title && type && country && city
      ? setIsFormValid(true)
      : setIsFormValid(false);
  };

  return (
    <div className="flex flex-row">
      <form
        className="flex flex-col gap-6 w-1/3 p-6 overflow-auto"
        onSubmit={handleSubmit}
      >
        <label className="text-3xl font-normal self-center">
          Edit your activity
        </label>
        <hr className="h-px border-1 bg-activityList mb-2" />
        <div className="flex flex-col w-full max-w-80">
          <span>Activity Type : </span>
          <Dropdown
            options={activityTypesOptions}
            onSelect={handleTypeChanged}
            value={type}
          />
        </div>
        <div className="flex flex-col w-full max-w-80">
          <span>Title : </span>
          <textarea
            type="text"
            value={title}
            style={{ width: "320px", height: "80px" }}
            onChange={handleTitleChange}
            placeholder="Your activity title..."
          />
        </div>
        <hr className="h-px border-1 bg-activityList mb-2" />
        <label className="text-sm font-normal">
          You can change the activity location by selecting a new country and/or
          a new city. Only cities within 30 kilometers from the orignial
          location can be selected (see the marker and the circle radius on the
          map).{" "}
        </label>
        <div className="flex flex-col w-full max-w-80">
          <span className="">Country : </span>
          <Dropdown
            options={countries}
            onSelect={handleCountryChange}
            value={country == null ? activity.country : country}
          />
        </div>
        <div className="flex flex-col w-full max-w-80">
          <span className="">City : </span>
          <Dropdown
            options={cities}
            onSelect={handleCityChange}
            value={city == null ? activity.city : city}
          />
        </div>
        <hr className="h-px border-1 bg-activityList mb-2" />
        <div className="flex flex-row  gap-3 pt-10 self-end">
          <button
            className={`w-20 h-8 rounded-md  text-default-text ${
              !isFormValid
                ? "bg-gray-400 text-gray-600 cursor-not-allowed" // Disabled styles
                : "bg-blue-accent hover:bg-blue-accent-hover cursor-pointer"
            }`}
            type="submit"
            //disabled={!isFormValid}
            disabled={true}
          >
            Save
          </button>
          <button
            className="w-20 h-8 rounded-md   bg-activityList hover:bg-activityList-hover text-default-text"
            onClick={() => router.back()}
          >
            Cancel
          </button>
        </div>
      </form>

      <div className="flex-1 p-10  ">
        {coordinates && (
          <ClientMap
            fullTrackCoords={coordinates}
            selectedKmCoords={[]}
            hoveredKmCoords={[]}
            locationCoords={[locationLat, locationLong]}
          />
        )}
      </div>
    </div>

    // <div className="flex flex-row">
    //   <div className="flex-1 p-44 gap-4">
    //     <div className="flex items-center  ">
    //       <span className="w-full max-w-40">Activity Type : </span>
    //       <Dropdown
    //         options={activityTypesOptions}
    //         onSelect={handleTypeChanged}
    //         value={type}
    //       />
    //     </div>
    //     <div className="flex items-center">
    //       <span className="w-full max-w-40">Title : </span>
    //       <textarea
    //         type="text"
    //         value={title}
    //         style={{ width: "320px", height: "80px" }}
    //         onChange={handleTitleChange}
    //         placeholder="Your activity title..."
    //       />
    //     </div>
    //     <div className="flex  items-center">
    //       <span className="w-full max-w-40">Country : </span>
    //       <Dropdown
    //         options={countries}
    //         onSelect={handleCountryChange}
    //         value={country == null ? activity.country : country}
    //       />
    //     </div>
    //     <div className="flex  items-center">
    //       <span className="w-full max-w-40">City : </span>
    //       <Dropdown
    //         options={cities}
    //         onSelect={handleCityChange}
    //         value={city == null ? activity.city : city}
    //       />
    //     </div>
    //     <div className="flex justify-center gap-3 pt-10">
    //       <button className="w-20 h-8 rounded-md   bg-blue-accent hover:bg-blue-accent-hover text-default-text ">
    //         Save
    //       </button>
    //       <button className="w-20 h-8 rounded-md   bg-activityList hover:bg-activityList-hover text-default-text ">
    //         Cancel
    //       </button>
    //     </div>
    //   </div>
    //   <div className="flex-1 p-10 pr-32 ">
    //     {coordinates && (
    //       <ClientMap
    //         fullTrackCoords={coordinates}
    //         selectedKmCoords={[]}
    //         hoveredKmCoords={[]}
    //         locationCoords={[locationLat, locationLong]}
    //       />
    //     )}
    //   </div>
    // </div>
  );
}

export default ActivityEditionBlock;
