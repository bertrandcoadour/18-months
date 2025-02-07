import React, { useEffect } from "react";
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
import LocationAndRadiusMarkers from "./LocationAndRadiusMarkers";

export default function Map({
  fullTrackCoords,
  selectedKmCoords,
  hoveredKmCoords,
  locationCoords,
}) {
  // a geojson feature for the full activity track
  var fullTrackGeojsonFeature = {
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

  //a geojson feature for the selected kilometer
  var selectedKmGeojsonFeature = {
    type: "Feature",
    properties: {
      name: "Selected kilometer",
      type: "running",
    },
    geometry: {
      type: "LineString",
      coordinates: selectedKmCoords,
    },
  };

  //a geojson feature for the hovered kilometer
  var hoveredKmGeojsonFeature = {
    type: "Feature",
    properties: {
      name: "Hovered kilometer",
      type: "running",
    },
    geometry: {
      type: "LineString",
      coordinates: hoveredKmCoords,
    },
  };

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
      {locationCoords.length == 0 && (
        <StartAndFinishMarkers data={fullTrackCoords} />
      )}
      {locationCoords.length > 0 && (
        <LocationAndRadiusMarkers data={locationCoords} />
      )}
      <AllTrack data={fullTrackGeojsonFeature} />
      <ClickedSegment
        data={selectedKmGeojsonFeature}
        fullTrackCoords={fullTrackCoords}
      />
      <HoveredSegment data={hoveredKmGeojsonFeature} />
    </MapContainer>
  );
}
