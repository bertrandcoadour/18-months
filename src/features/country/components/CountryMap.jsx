import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import CountryLayer from "./CountryLayer";
import {
  convertMetersToKms,
  convertTimestampToDate,
} from "@/src/utils/Global/convertData";
import { convertFitToStandardCoord } from "@/src/utils/map/mapUtilities";
import ActivityMarkers from "./ActivityMarkers";
import Tracks from "./Tracks";

export default function CountryMap({
  countryShape,
  activities,
  onSelectedMarker,
  selectedActivities,
}) {
  const [center, setCenter] = useState([0, 0]);
  const [zoom, setZoom] = useState(2); // Default zoom level

  const markers = activities.map((activity) => ({
    id: activity.id,
    title: activity.title,
    date: convertTimestampToDate(activity.timestamp),
    latitude: convertFitToStandardCoord(activity.startPositionLat),
    longitude: convertFitToStandardCoord(activity.startPositionLong),
    distance: convertMetersToKms(activity.totalDistance),
    ascent: activity.totalAscent,
    sport: activity.sport,
    subSport: activity.subSport,
  }));

  const handleMarkerClicked = async (marker) => {
    onSelectedMarker(marker); //send the selected marker to the parent component
  };

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      minZoom={2}
      scrollWheelZoom={true}
      style={{
        height: "650px",
        width: "100%",
        backgroundColor: "grey",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {countryShape && <CountryLayer shape={countryShape} />}
      {markers && (
        <ActivityMarkers data={markers} markerClicked={handleMarkerClicked} />
      )}
      {selectedActivities && <Tracks data={selectedActivities} />}
    </MapContainer>
  );
}
