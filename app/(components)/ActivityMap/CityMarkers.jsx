import { useMap } from "react-leaflet";
import L from "leaflet";

const CityMarkers = ({ data }) => {
  const map = useMap();

  if (data.length < 1) return; //return if no data

  //remove every marker each time the component is mounted, to ensure markers are not displayed more than once
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) layer.remove();
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

  data.forEach((d) => {
    L.marker([d.city.latitude, d.city.longitude], {
      icon: icon,
      city: d.city.name,
    })
      .addTo(map)
      .bindPopup(d.city.name);
  });

  return null;
};

export default CityMarkers;
