import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const CountryShapes = ({ data }) => {
  const map = useMap();

  data.forEach((shape) => {
    console.log(shape);
    L.geoJson(shape.shape).addTo(map);
  });

  //console.log("in shape component : ", data);

  // for (const shape in data) {
  //   console.log("in shape component : ", shape);
  //   //L.geoJson(shape.shape).addTo(map);
  // }

  // //add the new geoJSON layer to build the new segment
  // useEffect(() => {
  //   data.forEach((shape) => {
  //     console.log(shape);
  //     L.geoJson(shape.shape).addTo(map);
  //   });
  // }, [data, map]);

  //L.geoJson(data).addTo(map);

  return null;
};

export default CountryShapes;
