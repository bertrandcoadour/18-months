import {
  faPersonHiking,
  faPersonRunning,
  faPersonBiking,
  faMountain,
  faCalendarXmark,
  faCloudArrowUp,
  faPassport,
  faRankingStar,
  faFlagUsa,
  faCalendarCheck,
  faTreeCity,
  faRoad,
  faGaugeHigh,
  faPersonSwimming,
  faDumbbell,
  faNotdef,
  faPerson,
  faBan,
  faArrowRight,
  faTruckFast,
  faGauge,
} from "@fortawesome/free-solid-svg-icons";

export const activity_types_icons = [
  {
    label: "All",
    subLabel: "All",
    icon: faPerson,
    description: "All",
  },
  {
    label: "walking",
    subLabel: "generic",
    icon: faPersonHiking,
    description: "Walking",
  },
  {
    label: "running",
    subLabel: "generic",
    icon: faPersonRunning,
    description: "Running",
  },
  {
    label: "running",
    subLabel: "trail",
    icon: faMountain,
    description: "Trail running",
  },
  {
    label: "cycling",
    subLabel: "generic",
    icon: faPersonBiking,
    description: "Cycling",
  },
  {
    label: "swimming",
    subLabel: "lapSwimming",
    icon: faPersonSwimming,
    description: "Swimming",
  },
  {
    label: "training",
    subLabel: "cardioTraining",
    icon: faDumbbell,
    description: "Cardio training",
  },
  {
    label: "Not found",
    icon: faNotdef,
  },
];

export const world_general_icons = [
  {
    label: "activities",
    icon: faCloudArrowUp,
    description: "Activities",
  },
  {
    label: "countries",
    icon: faPassport,
    description: "Walking",
  },
  {
    label: "topCountry",
    icon: faFlagUsa,
    description: "Most visitied country",
  },
];

export const country_general_icons = [
  {
    label: "startDate",
    icon: faCalendarCheck,
    description: "first activity",
  },
  {
    label: "endDate",
    icon: faCalendarXmark,
    description: "last activity",
  },
  {
    label: "favoriteCity",
    icon: faTreeCity,
    description: "favorite city",
  },
  {
    label: "totalDistance",
    icon: faRoad,
    description: "total distance (km)",
  },
];

export const country_running_icons = [
  {
    label: "totalDistance",
    icon: faRoad,
    description: "total distance (km)",
  },
  {
    label: "avgPace",
    icon: faGauge,
    description: "avg pace (min/km)",
  },
  {
    label: "totalAscent",
    icon: faMountain,
    description: "total ascent (m)",
  },
  {
    label: "bestAvgPace",
    icon: faGaugeHigh,
    description: "best avg pace (min/km)",
  },
];

export const country_walking_icons = [
  {
    label: "totalDistance",
    icon: faRoad,
    description: "total distance (km)",
  },
  {
    label: "avgPace",
    icon: faGauge,
    description: "avg pace (min/km)",
  },
  {
    label: "totalAscent",
    icon: faMountain,
    description: "total ascent (m)",
  },
];

export const country_cycling_icons = [
  {
    label: "totalDistance",
    icon: faRoad,
    description: "total distance (km)",
  },
  {
    label: "avgPace",
    icon: faGauge,
    description: "avg speed (km/h)",
  },
  {
    label: "totalAscent",
    icon: faMountain,
    description: "total ascent (m)",
  },
  {
    label: "bestSpeed",
    icon: faGaugeHigh,
    description: "best speed (km/h)",
  },
];

export function getActivityIcon(sport, subSport) {
  for (const icon of activity_types_icons) {
    if (icon.label === sport && icon.subLabel == subSport) return icon.icon;
  }

  return activity_types_icons.at(-1).icon;
}

export function getActivityDescription(sport, subSport) {
  for (const icon of activity_types_icons) {
    if (icon.label === sport && icon.subLabel == subSport)
      return icon.description;
  }

  return null;
}
