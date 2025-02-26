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
        return await getCountryShape(country.entryName); // API call
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
  }, []); // only fetch when the component render

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

    //window.history.pushState({ path: url }, "", url);
    router.push(url);
  });

  // useEffect(() => {
  //   router.beforePopState(({ url, as, options }) => {
  //     // I only want to allow these two routes!
  //     if (as !== '/' && as !== '/other') {
  //       // Have SSR render bad routes as a 404.
  //       window.location.href = as
  //       return false
  //     }

  //     return true
  //   })
  // }, [router])

  // useEffect(() => {
  //   const handlePopState = () => {
  //     console.log("going back");
  //     const currentParams = new URLSearchParams(window.location.search);
  //     if (currentParams.has("country")) {
  //       window.history.replaceState({ path: "/map" }, "", "/map");
  //       router.replace("/map");
  //     }
  //   };

  //   window.addEventListener("popstate", handlePopState);

  //   return () => {
  //     window.removeEventListener("popstate", handlePopState);
  //   };
  // }, [router]);

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
