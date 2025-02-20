import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const Tracks = ({ data }) => {
  const map = useMap();

  //remove each layer associated with a segment if there is one already
  map.eachLayer((layer) => {
    if (layer.feature) {
      if (layer.feature.properties.id) {
        map.removeLayer(layer);
      }
    }
  });

  var myStyle = {
    color: "#ff0008",
    weight: 3,
    opacity: 0.65,
  };

  useEffect(() => {
    data.forEach((d) => {
      L.geoJSON(d, {
        style: myStyle,
      }).addTo(map);
    });
  }, [data, map]);

  return null;
};

export default Tracks;
