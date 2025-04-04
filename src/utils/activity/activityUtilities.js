import {
  convertMetersPerSecondsToKmPerSeconds,
  convertMetersPerSecondsToPace,
  convertMetersToKms,
  convertTimestampToDate,
} from "../Global/convertData";

export function getStartDate(activities) {
  if (!activities || activities.length === 0) {
    return null;
  }

  let earliestStartTime = activities[0].timestamp;

  for (const activity of activities) {
    if (activity.timestamp < earliestStartTime) {
      earliestStartTime = activity.timestamp;
    }
  }

  return convertTimestampToDate(earliestStartTime);
}

export function getEndDate(activities) {
  if (!activities || activities.length === 0) {
    return null;
  }

  let latestActivity = activities[0].timestamp;

  for (const activity of activities) {
    if (activity.timestamp > latestActivity) {
      latestActivity = activity.timestamp;
    }
  }

  return convertTimestampToDate(latestActivity);
}

export function getFavoriteCity(activities) {
  if (!activities || activities.length === 0) {
    return null; // Or handle empty array as needed
  }

  const cityCounts = {};
  let favoriteCity = null;
  let maxCount = 0;

  for (const activity of activities) {
    if (activity.city) {
      cityCounts[activity.city] = (cityCounts[activity.city] || 0) + 1;

      if (cityCounts[activity.city] > maxCount) {
        maxCount = cityCounts[activity.city];
        favoriteCity = activity.city;
      }
    }
  }

  return favoriteCity;
}

export function getTotalDistance(activities) {
  if (!activities || activities.length === 0) {
    return 0;
  }

  return activities.reduce(
    (total, activity) =>
      total + Math.round(convertMetersToKms(activity.totalDistance)),
    0
  );
}

export function getAvgPace(activities) {
  if (!activities || activities.length === 0) {
    return null;
  }

  let avgPace = activities.reduce(
    (accumulator, currentValue) => accumulator + currentValue.enhancedAvgSpeed,
    0
  );
  return convertMetersPerSecondsToPace(avgPace / activities.length);
}

export function getCyclingAvgPace(activities) {
  if (!activities || activities.length === 0) {
    return null;
  }

  let avgPace = activities.reduce(
    (accumulator, currentValue) => accumulator + currentValue.enhancedAvgSpeed,
    0
  );
  return convertMetersPerSecondsToKmPerSeconds(avgPace / activities.length);
}

export function getBestAvgPace(activities) {
  if (!activities || activities.length === 0) {
    return null;
  }

  let bestAvgSpeed = activities[0].enhancedAvgSpeed;

  for (const activity of activities) {
    if (activity.enhancedAvgSpeed > bestAvgSpeed) {
      bestAvgSpeed = activity.enhancedAvgSpeed;
    }
  }

  return convertMetersPerSecondsToPace(bestAvgSpeed);
}

export function getTotalAscent(activities) {
  if (!activities || activities.length === 0) {
    return 0;
  }

  return activities.reduce(
    (total, activity) => total + activity.totalAscent,
    0
  );
}

export function getBestSpeed(activities) {
  const maxSpeed = activities.reduce((max, current) => {
    return Math.max(max, current.enhancedMaxSpeed);
  }, -Infinity);

  return Math.round(convertMetersPerSecondsToKmPerSeconds(maxSpeed));
}

export function getMetrics(activities, sport) {
  if (!sport)
    return {
      startDate: getStartDate(activities),
      endDate: getEndDate(activities),
      favoriteCity: getFavoriteCity(activities),
      totalDistance: getTotalDistance(activities),
    };

  switch (sport) {
    case "walking":
      return {
        totalDistance: getTotalDistance(activities),
        avgPace: getAvgPace(activities),
        totalAscent: getTotalAscent(activities),
      };

    case "running":
      return {
        totalDistance: getTotalDistance(activities),
        avgPace: getAvgPace(activities),
        totalAscent: getTotalAscent(activities),
        bestAvgPace: getBestAvgPace(activities),
      };

    case "cycling":
      return {
        totalDistance: getTotalDistance(activities),
        avgPace: getCyclingAvgPace(activities),
        totalAscent: getTotalAscent(activities),
        bestSpeed: getBestSpeed(activities),
      };

    default:
      return null;
  }
}

export default function sortActivities(activities, queryString = "") {
  if (!activities || activities.length === 0) {
    return []; // Return empty array for null or empty input
  }

  let sortBy = "timestamp";
  let sortOrder = "desc"; // Default sort order

  if (queryString) {
    const params = new URLSearchParams(queryString);
    const sortByParam = params.get("sort_by");
    const sortOrderParam = params.get("sort_order");

    if (sortByParam) {
      sortBy = sortByParam;
    }
    if (sortOrderParam) {
      sortOrder = sortOrderParam.toLowerCase(); // Ensure case-insensitive comparison
    }
  }

  return activities.slice().sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (aValue === undefined || bValue === undefined) {
      // Handle cases where the property doesn't exist on one or both objects
      if (aValue === undefined && bValue === undefined) return 0; // both undefined, no change
      if (aValue === undefined) return 1; // b comes first
      if (bValue === undefined) return -1; // a comes first
    }

    if (sortOrder === "asc") {
      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    } else {
      if (aValue < bValue) return 1;
      if (aValue > bValue) return -1;
      return 0;
    }
  });
}
