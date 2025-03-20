const FIT_EPOCH_MS = 631065600000;

export function convertTimestampToDate(timestamp) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour12: false,
  };

  const date = new Date((timestamp ?? 0) * 1000 + FIT_EPOCH_MS);
  const formattedDate = date.toLocaleString("en-GB", options);

  return formattedDate;
}

export function convertMetersToKms(distance) {
  return Math.round((distance / 1000) * 100) / 100;
}

export function convertSecondsToHoursMinutesSeconds(timeInSec) {
  const hours = Math.floor(timeInSec / 3600);
  const minutes = Math.floor((timeInSec % 3600) / 60);
  const seconds = Math.floor(timeInSec % 60);

  const hoursStr = String(hours).padStart(2, "0");
  const minutesStr = String(minutes).padStart(2, "0");
  const secondsStr = String(seconds).padStart(2, "0");

  return `${hoursStr}:${minutesStr}:${secondsStr}`;
}

export function convertMetersPerSecondsToPace(speedInMetersPerSeconds) {
  speedInMetersPerSeconds = 60 / (speedInMetersPerSeconds * 3.6);

  let minutes = Math.floor(speedInMetersPerSeconds); // Get the whole minutes
  let decimalPart = speedInMetersPerSeconds % 1;
  let seconds = Math.round(decimalPart * 60);

  if (seconds === 60) {
    minutes++; // Increment minutes if seconds are 60
    seconds = 0; // Reset seconds to 0
  }

  // Pad seconds with leading zero if needed
  let formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${formattedSeconds}`;
}

export function convertMetersPerSecondsToKmPerSeconds(speedInMetersPerSeconds) {
  return Math.round(speedInMetersPerSeconds * 3.6 * 100) / 100;
}

export function convertActivityTypeToDBType(activityType) {
  switch (activityType) {
    case "Walking":
      return { sport: "walking", subSport: "generic" };
    case "Running":
      return { sport: "running", subSport: "generic" };
    case "Trail running":
      return { sport: "running", subSport: "trail" };
    case "Cycling":
      return { sport: "cycling", subSport: "generic" };
    case "Swimming":
      return { sport: "swimming", subSport: "lapSwimming" };
    case "Cardio training":
      return { sport: "training", subSport: "cardioTraining" };
    default:
      return null;
  }
}

export function convertStringifiedDBTypeToActivityType(dbType) {
  switch (dbType) {
    case "walking generic":
      return "Walking";
    case "running generic":
      return "Running";
    case "running trail":
      return "Trail running";
    case "cycling generic":
      return "Cycling";
    case "swimming lapSwimming":
      return "Swimming";
    case "training cardioTraining":
      return "Cardio training";
    default:
      return null;
  }
}

export function convertDBTypeToActivityType(dbType) {
  switch (dbType) {
    case { sport: "walking", subSport: "generic" }:
      return "Walking";
    case { sport: "running", subSport: "generic" }:
      return "Running";
    case { sport: "running", subSport: "trail" }:
      return "Trail running";
    case { sport: "cycling", subSport: "generic" }:
      return "Cycling";
    case { sport: "swimming", subSport: "lapSwimming" }:
      return "Swimming";
    case { sport: "training", subSport: "cardioTraining" }:
      return "Cardio training";
    default:
      return null;
  }
}
