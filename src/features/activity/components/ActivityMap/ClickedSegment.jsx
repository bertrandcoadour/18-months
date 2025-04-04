import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import {
  getCenterOfCoordinates,
  getZoomValue,
} from "../../../../utils/map/mapUtilities";

const ClickedSegment = ({ data, fullTrackCoords }) => {
  const map = useMap();

  useEffect(() => {
    let oldSegmentLayer = null;
    //remove each layer associated with a segment if there is one already
    map.eachLayer((layer) => {
      if (layer.feature) {
        if (layer.feature.properties.name == "Selected kilometer") {
          //map.removeLayer(layer);
          oldSegmentLayer = layer;
        }
      }
    });

    if (oldSegmentLayer) {
      map.removeLayer(oldSegmentLayer);

      //set the view to the default values (full track visible)
      map.setView(
        getCenterOfCoordinates(fullTrackCoords),
        getZoomValue(fullTrackCoords)
      );
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

      //set the view so that it is centered on the highlighted kilometer with the correct level of zoom
      data.geometry.coordinates.length > 0 &&
        map.setView(
          getCenterOfCoordinates(data.geometry.coordinates),
          getZoomValue(data.geometry.coordinates)
        );
    }
  }, [data]);

  return null;
};

export default ClickedSegment;
