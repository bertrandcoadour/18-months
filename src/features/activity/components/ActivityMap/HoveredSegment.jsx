import { useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

const HoveredSegment = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    let oldSegmentLayer = null;
    //remove each layer associated with a segment if there is one already
    map.eachLayer((layer) => {
      if (layer.feature) {
        if (layer.feature.properties.name == "Hovered kilometer") {
          //map.removeLayer(layer);
          oldSegmentLayer = layer;
        }
      }
    });

    if (oldSegmentLayer) {
      map.removeLayer(oldSegmentLayer);
    }

    //add the new geoJSON layer to build the new segment

    if (data.geometry.coordinates) {
      var myStyle = {
        color: "#0008ff",
        weight: 3,
        opacity: 0.65,
      };

      L.geoJSON(data, {
        style: myStyle,
      }).addTo(map);
    }
  }, [data]);

  return null;
};

export default HoveredSegment;
