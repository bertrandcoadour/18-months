"use client";

import { useMemo, useState, useEffect } from "react";

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
import { getCitiesWithinKilometers } from "@/app/Utilities/map/mapUtilities";
import {
  updateActivityCity,
  updateActivityCountry,
  updateActivityTitle,
  updateActivityType,
} from "@/app/(actions)/activitiesActions";
import { convertActivityTypeToDBType } from "@/app/Utilities/Global/convertData";
import Loading from "../Loading";

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
        loading: () => <Loading />,
        ssr: false,
      }),
    []
  );

  //get the longitude and latitude of the default city, to be later used as the reference for the cities to display to the user
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

  //get all the countries to display to the user
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
  }); //check the form validity as soon as something is updated of the page

  //get the cities to display to the user
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
  }, [country, activity.country, locationLat, locationLong]); //get the cities as soon as the coutry selection changed

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

  const handleCancel = (event) => {
    event.preventDefault();
    router.push(`/activities/${activity.id}`);
  };

  const handleSubmit = () => {
    const submit = async () => {
      await updateActivityTitle(activity.id, title);
      const activitySport = convertActivityTypeToDBType(type);
      await updateActivityType(
        activity.id,
        activitySport.sport,
        activitySport.subSport
      );
      await updateActivityCity(activity.id, city);
      await updateActivityCountry(activity.id, country);

      router.push(`/activities/${activity.id}`);
    };

    submit();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <form
        className="flex flex-col gap-6  p-6 overflow-auto"
        action={handleSubmit}
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
            name="type"
          />
        </div>
        <div className="flex flex-col w-full max-w-80">
          <span>Title : </span>
          <textarea
            type="text"
            name="title"
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
            disabled={!isFormValid}
          >
            Save
          </button>
          <button
            className="w-20 h-8 rounded-md   bg-activityList hover:bg-activityList-hover text-default-text"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>

      <div className="flex-1 p-5">
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
  );
}

export default ActivityEditionBlock;
