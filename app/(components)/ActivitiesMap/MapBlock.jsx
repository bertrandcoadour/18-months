"use client";

import { useMemo, useEffect, useState } from "react";

import dynamic from "next/dynamic";
import { getActivitiesCountries } from "@/app/(actions)/activitiesActions";

function MapBlock() {
  const [countries, setCountries] = useState([]);

  const ClientMap = useMemo(
    () =>
      dynamic(() => import("./WorldMap"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  useEffect(() => {
    const fetchCountries = async () => {
      const fetchedCountries = await getActivitiesCountries();
      setCountries([...fetchedCountries]);
    };

    fetchCountries();
  }, []);

  return <ClientMap countries={countries} />;
}

export default MapBlock;
