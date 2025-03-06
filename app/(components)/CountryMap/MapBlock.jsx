"use client";

import { useMemo, useEffect, useState } from "react";

import dynamic from "next/dynamic";
import Loading from "../Loading";

function MapBlock({ country }) {
  const [shape, setShape] = useState(null);
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  const ClientMap = useMemo(
    () =>
      dynamic(() => import("./CountryMap"), {
        loading: () => <Loading />,
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
