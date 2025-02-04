import { useMap } from "react-leaflet";
import L from "leaflet";

const HoveredSegment = ({ data }) => {
  const map = useMap();

  //remove each layer associated with a segment if there is one already
  map.eachLayer((layer) => {
    if (layer.feature) {
      if (layer.feature.properties.name == "Hovered kilometer") {
        map.removeLayer(layer);
      }
    }
  });

  var myStyle = {
    color: "#0008ff",
    weight: 3,
    opacity: 0.65,
  };

  L.geoJSON(data, {
    style: myStyle,
  }).addTo(map);

  return null;
};

export default HoveredSegment;
