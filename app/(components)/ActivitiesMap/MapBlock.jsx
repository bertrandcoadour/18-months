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

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <div className="flex-1">
          <ClientMap countries={countries} />
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
}

export default MapBlock;
