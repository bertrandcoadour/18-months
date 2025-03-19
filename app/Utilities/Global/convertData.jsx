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

  let decimalPart = speedInMetersPerSeconds % 1;
  decimalPart = Math.round(decimalPart * 60);

  //toFixed(2) to get 2 digit-decimal
  return (Math.trunc(speedInMetersPerSeconds) + 0.01 * decimalPart)
    .toFixed(2)
    .replace(".", ":");
  //return Math.trunc(speedInMetersPerSeconds) + 0.01 * decimalPart;
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

export function filterOutliers(someArray) {
  // Copy the values, rather than operating on references to existing values
  var values = someArray.concat();

  // // Then sort
  // values.sort(function (a, b) {
  //   return a - b;
  // });

  /* Then find a generous IQR. This is generous because if (values.length / 4)
   * is not an int, then really you should average the two elements on either
   * side to find q1.
   */
  var q1 = values[Math.floor(values.length / 4)];
  // Likewise for q3.
  var q3 = values[Math.ceil(values.length * (3 / 4))];
  var iqr = q3 - q1;

  // Then find min and max values
  var maxValue = q3 + iqr * 1.5;
  var minValue = q1 - iqr * 1.5;

  // Then filter anything beyond or beneath these values.
  var filteredValues = values.filter(function (x) {
    return x <= maxValue && x >= minValue;
  });

  // Then return
  return filteredValues;
}
