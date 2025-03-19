import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import AllTrack from "./AllTrack";
import {
  getCenterOfCoordinates,
  getZoomValue,
} from "../../Utilities/map/mapUtilities";
import ClickedSegment from "./ClickedSegment";
import HoveredSegment from "./HoveredSegment";
import StartAndFinishMarkers from "./StartAndFinishMarkers";
import CityMarkers from "./CityMarkers";

export default function Map({
  fullTrackCoords,
  selectedKmCoords,
  hoveredKmCoords,
  cityCoords,
}) {
  const [selectedKmFeature, setSelectedKmFeature] = useState(null);
  const [hoveredKmFeature, setHoveredKmFeature] = useState(null);

  useEffect(() => {
    setSelectedKmFeature({
      type: "Feature",
      properties: {
        name: "Selected kilometer",
        type: "running",
      },
      geometry: {
        type: "LineString",
        coordinates: selectedKmCoords,
      },
    });
  }, [selectedKmCoords]);

  useEffect(() => {
    setHoveredKmFeature({
      type: "Feature",
      properties: {
        name: "Hovered kilometer",
        type: "running",
      },
      geometry: {
        type: "LineString",
        coordinates: hoveredKmCoords,
      },
    });
  }, [hoveredKmCoords]);

  // a geojson feature for the full activity track
  let fullTrackGeojsonFeature = null;

  if (fullTrackCoords) {
    fullTrackGeojsonFeature = {
      type: "Feature",
      properties: {
        name: "All track",
        type: "running",
      },
      geometry: {
        type: "LineString",
        coordinates: fullTrackCoords,
      },
    };
  }

  return (
    <MapContainer
      center={getCenterOfCoordinates(fullTrackCoords)}
      zoom={getZoomValue(fullTrackCoords)}
      scrollWheelZoom={true}
      style={{
        height: "500px",
        backgroundColor: "grey",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {cityCoords.length == 0 && (
        <StartAndFinishMarkers data={fullTrackCoords} />
      )}
      {cityCoords.length > 0 && <CityMarkers data={cityCoords} />}
      {fullTrackCoords && <AllTrack data={fullTrackGeojsonFeature} />}
      {selectedKmFeature && (
        <ClickedSegment
          data={selectedKmFeature}
          fullTrackCoords={fullTrackCoords}
        />
      )}
      {hoveredKmFeature && <HoveredSegment data={hoveredKmFeature} />}
    </MapContainer>
  );
}
