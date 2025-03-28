import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import CountryShapes from "./CountryShapes";
import CustomLegend from "./CustomLegend";
import { useQueries } from "@tanstack/react-query";
import LoadingLegend from "./LoadingLegend";

export default function WorldMap({ countries }) {
  const [center, setCenter] = useState([0, 40]);
  const [zoom, setZoom] = useState(2); // Default zoom level

  const router = useRouter();
  const params = useSearchParams();

  const countryQueries = useQueries({
    queries: countries.map((country) => ({
      queryKey: ["countryShape", country?.entryName],
      queryFn: async () => {
        const res = await fetch(`/api/countryShape/${country?.entryName}`);
        return await res.json();
      },
      enabled: !!country?.entryName, // Only fetch if country has a name
      staleTime: 1000 * 60 * 5, ////for 5min, the data is considered valid to be retrieve from cache
    })),
  });

  const queries = countryQueries.map((query) => ({
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    data: query.data,
  }));

  const shapes = queries.map((query) => query.data);
  const isLoading = queries.some((query) => query.isLoading == true);

  const handleCountrySelected = useCallback((country) => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    //if there is any other filter when changing selected activity, remove it
    if (params?.get("country")) delete currentQuery.country;

    const updatedQuery = {
      ...currentQuery,
      country: country,
    };

    const url = qs.stringifyUrl(
      {
        url: "/map",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  });

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      minZoom={2}
      scrollWheelZoom={true}
      style={{
        height: "650px",
        width: "100%",
        backgroundColor: "grey",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {!isLoading && (
        <CountryShapes
          shapes={shapes}
          countries={countries}
          countryClicked={handleCountrySelected}
        />
      )}
      {!isLoading && <CustomLegend />}
      <LoadingLegend isLoading={isLoading} />
    </MapContainer>
  );
}
