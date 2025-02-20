"use client";

import { useMemo, useEffect, useState } from "react";

import dynamic from "next/dynamic";
import {
  getActivitiesCountries,
  getActivitiesInCountry,
} from "@/app/(actions)/activitiesActions";
import { getCountryShape } from "@/app/(actions)/countriesActions";

function MapBlock({ country }) {
  const [shape, setShape] = useState(null);
  const [activities, setActivities] = useState([]);

  const ClientMap = useMemo(
    () =>
      dynamic(() => import("./CountryMap"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  useEffect(() => {
    const fetchCountryShape = async () => {
      const shape = await getCountryShape(country);
      setShape(shape);
    };
    fetchCountryShape();
  }, [country]);

  useEffect(() => {
    const fetchActivities = async () => {
      const activities = await getActivitiesInCountry(country);
      setActivities(activities);
    };
    fetchActivities();
  }, [country]);

  return <ClientMap countryShape={shape} activities={activities} />;
}

export default MapBlock;
