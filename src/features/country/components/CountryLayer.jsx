import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const CountryLayer = ({ shape }) => {
  const map = useMap();

  let layers = [];
  map.eachLayer((layer) => {
    if (layer.feature) {
      layers.push(layer.feature);
    }
  });

  if (layers.length > 0 && layers.find((l) => l.type === "Feature") != -1)
    return;

  const onEachFeature = (feature, layer) => {
    map.fitBounds(layer.getBounds());
  };

  var myStyle = {
    fillColor: "white",
    weight: 2,
    opacity: 0.8,
    fillOpacity: 0,
  };

  L.geoJson(shape.shape, {
    style: myStyle,
    onEachFeature: onEachFeature,
  }).addTo(map);

  return null;
};

export default CountryLayer;
