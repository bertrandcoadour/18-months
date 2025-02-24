import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import L, { tooltip } from "leaflet";
import { getActivityDescription } from "@/app/Utilities/Icons/Icons";
import "../ActivitiesMap/CustomInfo.css";

const ActivityMarkers = ({ data, markerClicked }) => {
  const map = useMap(); //get the activities whose marker are already displayed on the map

  const displayedMarkers = [];

  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) displayedMarkers.push(layer);
  }); //by comparing the markers already displayed with the data in the props, get the markers to be displayed

  //console.log("displayedMarkers", displayedMarkers);

  const markersToDisplay = [];
  data.forEach((d) => {
    if (!displayedMarkers.find((marker) => marker?.options?.id == d.id))
      markersToDisplay.push(d);
  });

  //console.log("markersToDisplay", markersToDisplay);

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
    // const walkingActivities = [];
    // const runningActivities = [];
    // const cyclingActivities = [];

    markersToDisplay.forEach((d) => {
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

      // const type = getActivityDescription(
      //   marker.options.sport,
      //   marker.options.subSport
      // );

      // type === "Walking" && walkingActivities.push(marker);
      // type === "Running" && runningActivities.push(marker);
      // type === "Cycling" && cyclingActivities.push(marker);

      marker.on("click", (e) => {
        const clickedMarker = e.target;
        markerClicked(clickedMarker);
      });

      marker.on("contextmenu", (e) => {
        map.flyTo(marker.getLatLng(), 15);
      });

      marker.on("mouseover", (e) => {
        info.update({
          title: marker.options.title,
          date: marker.options.date,
          distance: marker.options.distance,
        });
      });

      marker.on("mouseout", (e) => {
        info.update();
      });
    });

    // if (data.length > 0) {
    //   let walkGroup = L.layerGroup(walkingActivities, {
    //     id: "Activities",
    //   });
    //   let runGroup = L.layerGroup(runningActivities, {
    //     id: "Activities",
    //   });
    //   let cycleGroup = L.layerGroup(cyclingActivities, {
    //     id: "Activities",
    //   });

    // walkGroup.addTo(map);
    // runGroup.addTo(map);
    // cycleGroup.addTo(map);

    // let overlayMaps = {
    //   "Walking activities": walkGroup,
    //   "Running activities": runGroup,
    //   "Cycling activities": cycleGroup,
    // };

    //L.control.layers(null, overlayMaps).addTo(map);
    markersToDisplay.length > 0 && info.addTo(map);
  }, [map, markersToDisplay]);

  return null;
};

export default ActivityMarkers;

// import { useMap } from "react-leaflet";
// import { useEffect, useState } from "react";
// import L, { tooltip } from "leaflet";
// import { getActivityDescription } from "@/app/Utilities/Icons/Icons";
// import "../ActivitiesMap/CustomInfo.css";

// const ActivityMarkers = ({ data, markerClicked }) => {
//   const map = useMap(); //get the activities whose marker are already displayed on the map
//   //const [overlayControl, setOverlayControl] = useState(null);

//   const displayedMarkers = [];

//   map.eachLayer((layer) => {
//     //if (layer._icon) displayedMarkers.push(layer);
//     //console.log("layer", layer);
//     if (layer instanceof L.Marker)
//       // || layer instanceof L.LayerGroup)
//       displayedMarkers.push(layer);
//     if (layer instanceof L.LayerGroup && layer.options.id === "Activities") {
//       //console.log("layer._layers", layer._layers);
//       let array = Object.values(layer._layers);
//       array.map((l) => displayedMarkers.push(l));
//       //displayedMarkers.push(layer._layers);
//       //displayedMarkers.push(Object.values(layer._layers));
//     }
//     //displayedMarkers.push(layer._layers);
//   }); //by comparing the markers already displayed with the data in the props, get the markers to be displayed

//   //console.log("displayedMarkers", displayedMarkers);

//   const markersToDisplay = [];

//   data.forEach((d) => {
//     if (!displayedMarkers.find((marker) => marker?.options?.id == d.id))
//       markersToDisplay.push(d);
//   });

//   //console.log("markersToDisplay", markersToDisplay);

//   const getIconUrl = (type) => {
//     switch (type) {
//       case "Walking":
//         return "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png";

//       case "Running":
//         return "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png";

//       case "Cycling":
//         return "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png";

//       default:
//         return "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png";
//     }
//   };

//   const getIcon = (activity) => {
//     const type = getActivityDescription(activity.sport, activity.subSport);

//     return new L.icon({
//       iconUrl: getIconUrl(type),

//       shadowUrl:
//         "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",

//       iconSize: [25, 41],

//       iconAnchor: [12, 41],

//       popupAnchor: [1, -34],

//       shadowSize: [41, 41],
//     });
//   };

//   const info = L.control();

//   info.onAdd = function (map) {
//     this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"

//     this.update();

//     return this._div;
//   }; // method that we will use to update the control based on props passed

//   info.update = function (props) {
//     this._div.innerHTML = props
//       ? "<h4>" +
//         props.title +
//         "</h4>" +
//         "<b>" +
//         props.date +
//         " - </b>" +
//         "<b>" +
//         props.distance +
//         " km </b>"
//       : "Hover over a marker";
//   };

//   useEffect(() => {
//     const walkingActivities = [];
//     const runningActivities = [];
//     const cyclingActivities = [];

//     // map.eachLayer((layer) => {
//     //   if (layer instanceof L.Marker || layer instanceof L.LayerGroup) {
//     //     map.removeLayer(layer);
//     //   }
//     // });
//     // if (overlayControl) {
//     //   map.removeControl(overlayControl);
//     // }

//     markersToDisplay.forEach((d) => {
//       const marker = L.marker([d.latitude, d.longitude], {
//         icon: getIcon(d),
//         id: d.id,
//         title: d.title,
//         date: d.date,
//         latitude: d.latitude,
//         longitude: d.longitude,
//         sport: d.sport,
//         subSport: d.subSport,
//         distance: d.distance,
//       }); //.bindPopup(d.title + " " + d.date + " " + d.distance)

//       const type = getActivityDescription(
//         marker.options.sport,
//         marker.options.subSport
//       );

//       type === "Walking" && walkingActivities.push(marker);
//       type === "Running" && runningActivities.push(marker);
//       type === "Cycling" && cyclingActivities.push(marker);

//       marker.on("click", (e) => {
//         const clickedMarker = e.target;
//         markerClicked(clickedMarker);
//       });

//       marker.on("contextmenu", (e) => {
//         map.flyTo(marker.getLatLng(), 15);
//       });

//       marker.on("mouseover", (e) => {
//         info.update({
//           title: marker.options.title,
//           date: marker.options.date,
//           distance: marker.options.distance,
//         });
//       });

//       marker.on("mouseout", (e) => {
//         info.update();
//       });
//     });

//     if (data.length > 0) {
//       let walkGroup = L.layerGroup(walkingActivities, {
//         id: "Activities",
//       });
//       let runGroup = L.layerGroup(runningActivities, {
//         id: "Activities",
//       });
//       let cycleGroup = L.layerGroup(cyclingActivities, {
//         id: "Activities",
//       });

//       walkGroup.addTo(map);
//       runGroup.addTo(map);
//       cycleGroup.addTo(map);

//       let overlayMaps = {
//         "Walking activities": walkGroup,
//         "Running activities": runGroup,
//         "Cycling activities": cycleGroup,
//       }; // console.log("adding info");

//       // const layers = [];

//       // map.eachLayer((layer) => {
//       //   layers.push(layer);
//       // });

//       // console.log(layers);

//       const newControl = L.control.layers(null, overlayMaps).addTo(map);
//       //setOverlayControl(newControl);
//       //L.control.layers();
//       info.addTo(map);
//     }
//   }, [map, markersToDisplay]);

//   return null;
// };

// export default ActivityMarkers;
