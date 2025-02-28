"use client";

import { useMemo, useEffect, useState } from "react";

import dynamic from "next/dynamic";

function MapBlock({ country }) {
  const [shape, setShape] = useState(null);
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  const ClientMap = useMemo(
    () =>
      dynamic(() => import("./CountryMap"), {
        loading: () => (
          <div className="flex items-center justify-center gap-2 mx-auto h-full">
            <h3 className="font-semibold  py-2 px-4 ">Loading...</h3>
          </div>
        ),
        ssr: false,
      }),
    []
  );

  useEffect(() => {
    const fetchCountryShape = async () => {
      setError(null);

      try {
        const res = await fetch(`/api/countryShape/${country}`, {
          cache: "force-cache",
        });
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Country shape not found");
          }
          throw new Error("Failed to fetch country shape");
        }

        setShape(await res.json());
      } catch (error) {
        setError(err);
      }
    };

    fetchCountryShape();
  }, [country]);

  useEffect(() => {
    const fetchActivities = async () => {
      setError(null);

      try {
        const res = await fetch(`/api/activities/byCountry/${country}`, {
          cache: "force-cache",
        });
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error(`activities in ${country}  not found`);
          }
          throw new Error("Failed to fetch activities");
        }

        setActivities(await res.json());
      } catch (error) {
        setError(err);
      }
    };

    fetchActivities();
  }, [country]);

  return <ClientMap countryShape={shape} activities={activities} />;
}

export default MapBlock;
