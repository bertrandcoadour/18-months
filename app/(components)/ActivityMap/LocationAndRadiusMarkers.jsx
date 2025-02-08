import { useMap } from "react-leaflet";
import L from "leaflet";

const LocationAndRadiusMarkers = ({ data }) => {
  const map = useMap();

  if (data.length < 1 || (data.length == 2 && data[0] == 0 && data[1] == 0))
    return; //if data is null or contains lagitude and longitude of 0, return.

  //if there already are the start and finish markers, no need to add them to the map.
  // there are search with the "icon" attribute in the layers. It is assumed these markers are the only one in the map.
  //if other markers were to be added to the map, this code would need to be modified.
  var layers = [];
  map.eachLayer((layer) => {
    if (layer._icon) layers.push(layer);
  });

  if (layers.length > 0) return;

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

  L.marker([data.at(0), data.at(1)], {
    icon: icon,
  }).addTo(map);

  L.circle(data, 30000, {
    color: "blue",
    fillColor: "#009bff",
    fillOpacity: 0.2,
  }).addTo(map);

  return null;
};

export default LocationAndRadiusMarkers;
