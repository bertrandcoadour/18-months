import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import L, { tooltip } from "leaflet";
import { getActivityDescription } from "@/src/utils/Icons/Icons";

const ActivityMarkers = ({ data, markerClicked }) => {
  const map = useMap(); //get the activities whose marker are already displayed on the map

  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  const getIconUrl = (type) => {
    switch (type) {
      case "Walking":
        return "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png";
      case "Running":
        return "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png";
      case "Cycling":
        return "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png";
      default:
        return "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png";
    }
  };

  const getIcon = (activity) => {
    const type = getActivityDescription(activity.sport, activity.subSport);
    return new L.icon({
      iconUrl: getIconUrl(type),
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  };

  const info = L.control();

  info.onAdd = function (map) {
    this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
    this.update();
    return this._div;
  }; // method that we will use to update the control based on props passed

  info.update = function (props) {
    this._div.innerHTML = props
      ? "<h4>" +
        props.title +
        "</h4>" +
        "<b>" +
        props.date +
        " | </b>" +
        "<b>" +
        props.distance +
        " km </b>"
      : "Hover over a marker";
  };

  useEffect(() => {
    data.forEach((d) => {
      const marker = L.marker([d.latitude, d.longitude], {
        icon: getIcon(d),
        id: d.id,
        title: d.title,
        date: d.date,
        latitude: d.latitude,
        longitude: d.longitude,
        sport: d.sport,
        subSport: d.subSport,
        distance: d.distance,
      }).addTo(map); //.bindPopup(d.title + " " + d.date + " " + d.distance)

      marker.on("click", (e) => {
        const clickedMarker = e.target;
        markerClicked(clickedMarker);
      });

      marker.on("contextmenu", (e) => {
        map.flyTo(marker.getLatLng(), 15);
      });

      marker.on("mouseover", (e) => {
        // info.update({
        //   title: marker.options.title,
        //   date: marker.options.date,
        //   distance: marker.options.distance,
        // });
      });

      marker.on("mouseout", (e) => {
        //info.update();
      });
    });
  }, [map, data]);

  return null;
};

export default ActivityMarkers;
