import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const LoadingLegend = ({ isLoading }) => {
  const map = useMap();

  useEffect(() => {
    let legend; // Declare legend within useEffect scope

    if (map) {
      // Check if map is available
      if (isLoading) {
        legend = L.control({ position: "topright" });
        legend.onAdd = function () {
          const div = L.DomUtil.create("div", "loading legend");
          div.innerHTML = "<h4>Loading countries...</h4>";
          return div;
        };
        legend.addTo(map);
      } else {
        // Function to check if a control is already added
        const controlExists = () => {
          if (!legend) return false;
          for (const control of Object.values(map._controlCorners)) {
            if (control.contains(legend.getContainer())) {
              return true;
            }
          }
          return false;
        };

        if (controlExists()) {
          map.removeControl(legend);
        }
      }
    }

    // Cleanup function: remove legend when component unmounts or isLoading changes
    return () => {
      if (
        map &&
        legend &&
        Object.values(map._controlCorners).some((control) =>
          control.contains(legend.getContainer())
        )
      ) {
        map.removeControl(legend);
      }
    };
  }, [isLoading, map]);

  return null;
};

export default LoadingLegend;
