import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import CountryShapes from "./CountryShapes";
import { getCountryShape } from "@/app/(actions)/countriesActions";
import CustomLegend from "./CustomLegend";

export default function WorldMap({ countries }) {
  const [center, setCenter] = useState([0, 0]);
  const [zoom, setZoom] = useState(2); // Default zoom level
  const [shapes, setShapes] = useState([]);

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

      // for (const country of countries) {
      //   // Use a for...of loop for async/await
      //   const shape = await getCountryShape(country); //API call
      //   newShapes.push(shape);
      // }

      // setShapes(newShapes); // Update state once all shapes are fetched
    };

    fetchShapes(); // Call the inner async function
  }, [countries]); // fetch every time countries change

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{
        height: "700px",
        backgroundColor: "grey",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <CountryShapes shapes={shapes} countries={countries} />
      <CustomLegend />
    </MapContainer>
  );
}
