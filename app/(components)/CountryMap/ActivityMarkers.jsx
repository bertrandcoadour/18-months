import { useMap } from "react-leaflet";
import { useEffect } from "react";
import L, { tooltip } from "leaflet";

const ActivityMarkers = ({ data, markerClicked }) => {
  const map = useMap();

  //get the activities whose marker are already displayed on the map
  const displayedMarkers = [];
  map.eachLayer((layer) => {
    if (layer._icon) displayedMarkers.push(layer);
  });

  //by comparing the markers already displayed with the data in the props, get the markers to be displayed
  const markersToDisplay = [];
  data.forEach((d) => {
    if (!displayedMarkers.find((marker) => marker.options.id == d.id))
      markersToDisplay.push(d);
  });

  var icon = new L.icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png", // replace with the path to a custom and local icon
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  useEffect(() => {
    markersToDisplay.forEach((d) => {
      const marker = L.marker([d.latitude, d.longitude], {
        icon: icon,
        id: d.id,
        title: d.title,
        date: d.date,
        latitude: d.latitude,
        longitude: d.longitude,
        sport: d.sport,
        subSport: d.subSport,
      })
        .bindPopup(d.title + " " + d.date + " " + d.distance)
        .addTo(map);

      marker.on("click", (e) => {
        const clickedMarker = e.target;
        clickedMarker
          .bindPopup("More info about " + clickedMarker.options.title + ": ...")
          .openPopup();
        map.flyTo(clickedMarker.getLatLng(), 15);

        markerClicked(marker);
      });
    });
  });

  return null;
};

export default ActivityMarkers;
