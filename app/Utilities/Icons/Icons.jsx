import {
  faPersonHiking,
  faPersonRunning,
  faPersonBiking,
  faMountain,
  faPersonSwimming,
  faDumbbell,
  faNotdef,
  faPerson,
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
