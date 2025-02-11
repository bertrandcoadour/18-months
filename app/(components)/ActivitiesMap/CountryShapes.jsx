import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { getCountryColor } from "@/app/Utilities/map/mapUtilities";
import "./CustomInfo.css";

const CountryShapes = ({ shapes, countries }) => {
  const map = useMap();

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature,
    });
  };

  const highlightFeature = (e) => {
    var layer = e.target;

    layer.setStyle({
      weight: 5,
      color: "#666",
      dashArray: "",
      fillOpacity: 0.7,
    });

    layer.bringToFront();

    let country = countriesToDisplay.find(
      (country) => country.entryName == layer.feature.properties.ADMIN
    );

    if (country) {
      info.update({
        name: country.entryName,
        occurences: country.entryOccurences,
      });
    }
  };

  const resetHighlight = (e) => {
    var layer = e.target;

    layer.setStyle({
      weight: 1,
      opacity: 1,
      color: "white",
      dashArray: "1",
      fillOpacity: 0.7,
    });

    layer.bringToBack();

    info.update();
  };

  const zoomToFeature = (e) => {
    map.fitBounds(e.target.getBounds());
  };

  //declare a control from an info panel on the map
  const info = L.control();

  info.onAdd = function (map) {
    this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
    this.update();
    return this._div;
  };

  // method that we will use to update the control based on props passed
  info.update = function (props) {
    this._div.innerHTML =
      "<h4>Activities per country</h4>" +
      (props
        ? "<b>" + props.name + " : </b>" + props.occurences + " activities"
        : "Hover over a country");
  };

  //get the countries whose shapes are already displayed in the map
  const displayedCoutries = [];
  map.eachLayer((layer) => {
    if (layer.feature) {
      displayedCoutries.push(layer.feature.properties.ADMIN);
    }
  });

  //by comparing the shapes already displayed with the countries in the props, get the countries' shapes to be displayed
  const countriesToDisplay = [];
  countries.forEach((country) => {
    if (!displayedCoutries.find((c) => c == country.entryName))
      countriesToDisplay.push(country);
  });

  useEffect(() => {
    shapes.forEach((shape) => {
      let country = countriesToDisplay.find(
        (country) => country.entryName == shape.shape.properties.ADMIN
      );
      if (country) {
        var myStyle = {
          fillColor: getCountryColor(country.entryOccurences),
          weight: 2,
          opacity: 1,
          color: "white",
          dashArray: "3",
          fillOpacity: 0.7,
        };
        L.geoJson(shape.shape, {
          style: myStyle,
          onEachFeature: onEachFeature,
        }).addTo(map);

        info.addTo(map);
      }
    });
  }, [shapes, map]);

  return null;
};

export default CountryShapes;
