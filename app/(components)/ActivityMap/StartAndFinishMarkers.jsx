import { useMap } from "react-leaflet";
import L from "leaflet";

const StartAndFinishMarkers = ({ data }) => {
  const map = useMap();

  if (data.length < 1) return;

  //if there already are the start and finish markers, no need to add them to the map.
  // there are search with the "icon" attribute in the layers. It is assumed these markers are the only one in the map.
  //if other markers were to be added to the map, this code would need to be modified.
  var layers = [];
  map.eachLayer((layer) => {
    if (layer._icon) layers.push(layer);
  });

  if (layers.length > 0) return;

  let start = data[0];
  let finish = data[data.length - 1];

  var startIcon = new L.icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png", // replace with the path to a custom and local icon
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  var finishIcon = new L.icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png", // replace with the path to a custom and local icon
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  L.marker([start.at(1), start.at(0)], {
    icon: startIcon,
  }).addTo(map);

  L.marker([finish.at(1), finish.at(0)], {
    icon: finishIcon,
  }).addTo(map);

  return null;
};

export default StartAndFinishMarkers;
