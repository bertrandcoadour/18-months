import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import CountryLayer from "./CountryLayer";
import {
  convertMetersToKms,
  convertTimestampToDate,
} from "@/src/utils/Global/convertData";
import { convertFitToStandardCoord } from "@/src/utils/map/mapUtilities";
import ActivityMarkers from "./ActivityMarkers";
import { getActivitiyCoords } from "@/src/actions/activitiesActions";
import { getActivityDescription } from "@/src/utils/Icons/Icons";
import Tracks from "./Tracks";
import { useQuery } from "@tanstack/react-query";

export default function CountryMap({
  countryShape,
  activities,
  onSelectedMarker,
}) {
  const [center, setCenter] = useState([0, 0]);
  const [zoom, setZoom] = useState(2); // Default zoom level
  const [activityTracks, setActivityTracks] = useState([]);

  const data = activities.map((activity) => ({
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

  useEffect(() => {
    setActivityTracks([]);
  }, [activities]);

  const handleMarkerClicked = (marker) => {
    const markerId = marker.options.id;

    onSelectedMarker(markerId); //send the selected marker to the parent component

    // const { data } = useQuery({
    //   queryKey: ["activity coordinates", markerId],
    //   queryFn: async (markerId) => {
    //     return await getActivitiyCoords(markerId); // API call
    //   },
    // });

    // console.log(data);

    const fetchActivityCoords = async () => {
      const getCoords = async (id) => {
        return await getActivitiyCoords(id); // API call
      };

      const coords = await getCoords(marker.options.id);
      var fullTrackGeojsonFeature = {
        type: "Feature",
        properties: {
          id: marker.options.id,
          title: marker.options.title,
          type: getActivityDescription(
            marker.options.sport,
            marker.options.subSport
          ),
        },
        geometry: {
          type: "LineString",
          coordinates: coords,
        },
      };

      setActivityTracks((prevFeatures) => {
        //check if the track associated to this id is already in the list of geojson features
        //if so, remove the feature, it not, add a new feature with its coords

        const existingIndex = prevFeatures.findIndex(
          (f) => f.properties.id === markerId
        );

        if (existingIndex > -1) {
          // Feature already exists, remove it
          const newFeatures = [...prevFeatures]; // Create a copy
          newFeatures.splice(existingIndex, 1);

          return newFeatures;
        } else {
          // Feature doesn't exist, add it
          const newFeatures = [...prevFeatures, fullTrackGeojsonFeature];
          return newFeatures;
        }
      });
    };

    fetchActivityCoords();
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
      {data && (
        <ActivityMarkers data={data} markerClicked={handleMarkerClicked} />
      )}
      {activityTracks && <Tracks data={activityTracks} />}
    </MapContainer>
  );
}
