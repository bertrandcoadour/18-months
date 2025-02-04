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
    description: "Filter only walking activities",
  },
  {
    label: "running",
    subLabel: "generic",
    icon: faPersonRunning,
    description: "Filter only running activities",
  },
  {
    label: "running",
    subLabel: "trail",
    icon: faMountain,
    description: "Filter only trail activities",
  },
  {
    label: "cycling",
    subLabel: "generic",
    icon: faPersonBiking,
    description: "Filter only cycling activities",
  },
  {
    label: "swimming",
    subLabel: "lapSwimming",
    icon: faPersonSwimming,
    description: "Filter only swimming activities",
  },
  {
    label: "training",
    subLabel: "cardioTraining",
    icon: faDumbbell,
    description: "Filter only cardio activities",
  },
  {
    label: "Not found",
    icon: faNotdef,
    description: "Icon not found",
  },
];

export function getActivityIcon(sport, subSport) {
  for (const icon of activity_types_icons) {
    if (icon.label === sport && icon.subLabel == subSport) return icon.icon;
  }

  return activity_types_icons.at(-1).icon;
}
