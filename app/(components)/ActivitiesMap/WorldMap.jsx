import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import CountryShapes from "./CountryShapes";
import { getCountryShape } from "@/app/(actions)/countriesActions";
import CustomLegend from "./CustomLegend";

export default function WorldMap({ countries }) {
  const [center, setCenter] = useState([0, 0]);
  const [zoom, setZoom] = useState(2); // Default zoom level
  const [shapes, setShapes] = useState([]);

  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const fetchShapes = async () => {
      const getShape = async (country) => {
        try {
          const res = await fetch(`/api/countryShape/${country?.entryName}`, {
            cache: "force-cache",
          });
          if (!res.ok) {
            if (res.status === 404) {
              throw new Error("Country shape not found");
            }
            throw new Error("Failed to fetch country shape");
          }

          return await res.json();
        } catch (error) {
          console.error("Error fetching shape:", error);
          return null; // or a default shape object
        }
      };

      if (countries && countries.length > 0) {
        // Check if countries prop exists and is not empty
        const newShapes = await Promise.all(countries.map(getShape));
        setShapes(newShapes);
      } else {
        setShapes([]); // Clear shapes if countries is empty or null
      }
    };

    fetchShapes(); // Call the inner async function
  }, [countries]); // fetch every time countries prop changes

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
        height: "800px",
        backgroundColor: "grey",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <CountryShapes
        shapes={shapes}
        countries={countries}
        countryClicked={handleCountrySelected}
      />
      <CustomLegend />
    </MapContainer>
  );
}
