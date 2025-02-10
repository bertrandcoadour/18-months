import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "./CustomLegend.css";
import { getCountryColor } from "@/app/Utilities/map/mapUtilities";

const CustomLegend = () => {
  const map = useMap();

  useEffect(() => {
    legend.onAdd = function (map) {
      var div = L.DomUtil.create("div", "info legend"),
        grades = [0, 10, 20, 50, 100, 200, 500];

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
          '<i style="background:' +
          getCountryColor(grades[i] + 1) +
          '"></i> ' +
          grades[i] +
          (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
      }

      return div;
    };

    legend.addTo(map);
  }, [map]);

  var legend = L.control({ position: "bottomright" });

  return null;
};

export default CustomLegend;
