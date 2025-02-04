import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const AllTrack = ({ data }) => {
  const map = useMap();

  //if there is already the full track layer, no need to add it to the map
  var layers = [];
  map.eachLayer((layer) => {
    if (layer.feature) layers.push(layer);
  });

  //console.log("size of layers : ", layers.length);

  if (
    layers.length > 0 &&
    layers.find((l) => l.feature.properties.name === "All track") != -1
  )
    return;

  var myStyle = {
    color: "#ff0008",
    weight: 3,
    opacity: 0.65,
  };

  L.geoJSON(data, {
    style: myStyle,
  }).addTo(map);

  // useEffect(() => {
  //   var myStyle = {
  //     color: "#ff0008",
  //     weight: 3,
  //     opacity: 0.65,
  //   };

  //   console.log("adding layer...");

  //   L.geoJSON(data, {
  //     style: myStyle,
  //   }).addTo(map);
  // }, [data, map]);

  return null;
};

export default AllTrack;
