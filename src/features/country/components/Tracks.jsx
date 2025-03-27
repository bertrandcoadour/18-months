import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const Tracks = ({ data }) => {
  const map = useMap();

  //get the tracks' id already displayed in the map
  const displayedTracks = [];
  map.eachLayer((layer) => {
    if (layer.feature && layer.feature.properties.id) {
      displayedTracks.push(layer.feature.properties.id);
    }
  });

  //by comparing the tracks already displayed with the data in the props, get the tracks to be displayed
  const tracksToDisplay = [];
  data.forEach((d) => {
    if (!displayedTracks.find((track) => track == d.properties.id))
      tracksToDisplay.push(d);
  });

  //by comparing the tracks already displayed with the data in the props, get the tracks to be removed
  const tracksToRemove = [];
  displayedTracks.forEach((track) => {
    if (!data.find((d) => d.properties.id == track)) tracksToRemove.push(track);
  });

  var myStyle = {
    color: "#ff0008",
    weight: 3,
    opacity: 0.65,
  };

  useEffect(() => {
    tracksToDisplay.forEach((d) => {
      L.geoJSON(d, {
        style: myStyle,
      }).addTo(map);
    });

    tracksToRemove.forEach((track) => {
      let layerToRemove;
      map.eachLayer((layer) => {
        if (layer.feature && layer.feature.properties.id == track) {
          layerToRemove = layer;
        }
      });

      map.removeLayer(layerToRemove);
    });
  }, [data, map]);

  return null;
};

export default Tracks;
