"use server";

import prisma from "@/src/prisma/db";
import { revalidatePath } from "next/cache";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import {
  countObjectOccurrences,
  countOccurencesOfEntries,
} from "../utils/Global/arrayManipulation";
import {
  convertMetersPerSecondsToPace,
  convertMetersToKms,
} from "../utils/Global/convertData";
import { getAllCoordinates } from "../utils/charts/chartUtilities";

export async function getActivities(params, limit, offset = 0) {
  try {
    const { sport, subSport, sort_by, sort_order, search } = await params;

    let query = {};

    if (sport) {
      query.sport = sport;
    }

    if (subSport) {
      query.subSport = subSport;
    }

    if (search) {
      query.title = {
        contains: search,
      };
    }

    //console.log(query);

    let query_order = {};

    if (sort_by && sort_order) query_order[sort_by] = sort_order;
    else query_order["timestamp"] = "desc";

    const rows = await prisma.Activity.findMany({
      where: query,
      take: limit, // Correct: Fetch 'limit' number of records per page
      skip: offset * limit, // Correct: Skip the records from previous pages
      orderBy: query_order,
      omit: {
        records: true,
        laps: true,
      },
    });

    return { rows, nextOffset: offset + 1 };
  } catch (error) {
    throw new Error(error.message);
  }

  // ["activities"],
  // { revalidate: 300, tags: ["activities"] }
}

export async function getActivityById(_id) {
  try {
    return await prisma.Activity.findUnique({
      where: {
        id: _id,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function activitiesCount() {
  try {
    return await prisma.Activity.count();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteActivities(_id) {
  try {
    await prisma.Activity.delete({
      where: {
        id: _id,
      },
    });

    revalidatePath("/");
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateActivityTitle(_id, newTitle) {
  try {
    await prisma.Activity.update({
      where: {
        id: _id,
      },
      data: {
        title: newTitle,
      },
    });

    revalidatePath("/");
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateActivityType(_id, newSport, newSubSport) {
  try {
    await prisma.Activity.update({
      where: {
        id: _id,
      },
      data: {
        sport: newSport,
        subSport: newSubSport,
      },
    });

    revalidatePath("/");
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateActivityCountry(_id, newCountry) {
  try {
    await prisma.Activity.update({
      where: {
        id: _id,
      },
      data: {
        country: newCountry,
      },
    });

    revalidatePath("/");
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateActivityCity(_id, newCity) {
  try {
    await prisma.Activity.update({
      where: {
        id: _id,
      },
      data: {
        city: newCity,
      },
    });

    revalidatePath("/");
  } catch (error) {
    throw new Error(error.message);
  }
}

export const getActivitiesCountries = unstable_cache(
  async () => {
    console.log("fetching countries...");
    try {
      const allCountries = await prisma.Activity.findMany({
        select: {
          country: true, // Only select the country related to each activity
        },
      });

      const flattenCountries = allCountries
        .flatMap((country) => country.country)
        .filter((country) => country != null);

      return countOccurencesOfEntries(flattenCountries);
    } catch (error) {
      console.error("Error fetching countries:", error);
      throw error; // Re-throw the error for handling outside if needed
    }
  },
  ["activitiesCountries"],
  { revalidate: 300, tags: ["activitiesCountries"] }
);

// export async function getActivitiesCountries() {
//   console.log("fetching countries...");
//   try {
//     const allCountries = await prisma.Activity.findMany({
//       select: {
//         country: true, // Only select the country related to each activity
//       },
//     });

//     const flattenCountries = allCountries
//       .flatMap((country) => country.country)
//       .filter((country) => country != null);

//     return countOccurencesOfEntries(flattenCountries);
//   } catch (error) {
//     console.error("Error fetching countries:", error);
//     throw error; // Re-throw the error for handling outside if needed
//   }
// }

export const getActivitiesCities = cache(async () => {
  try {
    const allCities = await prisma.Activity.findMany({
      select: {
        city: true, // Only select the city related to each activity
      },
    });

    const flattenCities = allCities
      .flatMap((city) => city.city)
      .filter((city) => city != null);

    return countOccurencesOfEntries(flattenCities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error; // Re-throw the error for handling outside if needed
  }
});

export const getActivitiesTypes = cache(async () => {
  try {
    const allTypes = await prisma.Activity.findMany({
      select: {
        sport: true, // Only select the sport and the subSport related to each activity
        subSport: true,
      },
    });

    const flattenTypes = allTypes
      .flatMap((type) => type.sport + " " + type.subSport)
      .filter((sport) => sport != null);

    return countOccurencesOfEntries(flattenTypes);
  } catch (error) {
    console.error("Error fetching types:", error);
    throw error; // Re-throw the error for handling outside if needed
  }
});

export const getActivitiesTypesInCountry = cache(async (country) => {
  try {
    const allTypes = await prisma.Activity.findMany({
      select: {
        sport: true, // Only select the sport and the subSport related to each activity
        subSport: true,
      },
      where: {
        country: country,
      },
    });

    const flattenTypes = allTypes
      .flatMap((type) => type.sport + " " + type.subSport)
      .filter((sport) => sport != null);

    return countOccurencesOfEntries(flattenTypes);
  } catch (error) {
    console.error("Error fetching types in " + country + " :", error);
    throw error; // Re-throw the error for handling outside if needed
  }
});

export async function walkingActivitiesCount() {
  try {
    const walkingActivities = await prisma.Activity.findMany({
      where: {
        sport: "walking",
        subSport: "generic",
      },
      select: {
        id: true, // Only select the id related to each activity
      },
    });

    return walkingActivities.length;
  } catch (error) {
    console.error("Error fetching walking activities:", error);
    throw error; // Re-throw the error for handling outside if needed
  }
}

export async function runningActivitiesCount() {
  try {
    const runningActivities = await prisma.Activity.findMany({
      where: {
        sport: "running",
      },
      select: {
        id: true, // Only select the id related to each activity
      },
    });

    return runningActivities.length;
  } catch (error) {
    console.error("Error fetching running activites:", error);
    throw error; // Re-throw the error for handling outside if needed
  }
}

export async function cyclingActivitiesCount() {
  try {
    const cyclingActivities = await prisma.Activity.findMany({
      where: {
        sport: "cycling",
        subSport: "generic",
      },
    });

    return cyclingActivities.count;
  } catch (error) {
    console.error("Error fetching cycling activities:", error);
    throw error; // Re-throw the error for handling outside if needed
  }
}

export async function walkingActivitiesTotalDistance() {
  try {
    const walkingActivitiesDistance = await prisma.Activity.findMany({
      where: {
        sport: "walking",
        subSport: "generic",
      },
      select: {
        totalDistance: true, // Only select the total distance related to each activity
      },
    });

    const total = walkingActivitiesDistance.reduce(
      (accumulator, currentValue) =>
        accumulator + convertMetersToKms(currentValue.totalDistance),
      0
    );

    return Math.round(total);
  } catch (error) {
    console.error("Error fetching total walking distance:", error);
    throw error; // Re-throw the error for handling outside if needed
  }
}

export async function runningActivitiesTotalDistance() {
  try {
    const runningActivitiesDistance = await prisma.Activity.findMany({
      where: {
        sport: "running",
      },
      select: {
        totalDistance: true, // Only select the total distance related to each activity
      },
    });

    const total = runningActivitiesDistance.reduce(
      (accumulator, currentValue) =>
        accumulator + convertMetersToKms(currentValue.totalDistance),
      0
    );

    return Math.round(total);
  } catch (error) {
    console.error("Error fetching total running distance:", error);
    throw error; // Re-throw the error for handling outside if needed
  }
}

export async function cyclingActivitiesTotalDistance() {
  try {
    const cyclingActivitiesDistance = await prisma.Activity.findMany({
      where: {
        sport: "cycling",
      },
      select: {
        totalDistance: true, // Only select the total distance related to each activity
      },
    });

    const total = cyclingActivitiesDistance.reduce(
      (accumulator, currentValue) =>
        accumulator + convertMetersToKms(currentValue.totalDistance),
      0
    );

    return Math.round(total);
  } catch (error) {
    console.error("Error fetching total cycling distance:", error);
    throw error; // Re-throw the error for handling outside if needed
  }
}

export async function runningActivitiesAvgPace() {
  try {
    const runningActivitiesPaces = await prisma.Activity.findMany({
      where: {
        sport: "running",
      },
      select: {
        enhancedAvgSpeed: true, // Only select the avg speed related to each activity
      },
    });

    const total = runningActivitiesPaces.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.enhancedAvgSpeed,
      0
    );

    return convertMetersPerSecondsToPace(total / runningActivitiesPaces.length);
  } catch (error) {
    console.error("Error fetching running average pace:", error);
    throw error; // Re-throw the error for handling outside if needed
  }
}

export async function walkingActivitiesTotalAscent() {
  try {
    const walkingActivitiesTotalAscents = await prisma.Activity.findMany({
      where: {
        sport: "walking",
      },
      select: {
        totalAscent: true, // Only select the total ascent related to each activity
      },
    });

    const total = walkingActivitiesTotalAscents.reduce(
      (accumulator, currentValue) => accumulator + currentValue.totalAscent,
      0
    );

    return Math.round(total);
  } catch (error) {
    console.error("Error fetching walking total ascent:", error);
    throw error; // Re-throw the error for handling outside if needed
  }
}

export async function cyclingActivitiesMaximumSpeed() {
  try {
    const cyclingActivitiesMaxSpeeds = await prisma.Activity.findMany({
      where: {
        sport: "cycling",
      },
      select: {
        enhancedMaxSpeed: true, // Only select the maximum speed related to each activity
      },
    });

    const maxSpeed = cyclingActivitiesMaxSpeeds.reduce((max, current) => {
      return Math.max(max, current.enhancedMaxSpeed);
    }, -Infinity);

    return Math.round(maxSpeed);
  } catch (error) {
    console.error("Error fetching walking total ascent:", error);
    throw error; // Re-throw the error for handling outside if needed
  }
}

export async function getActivitiesInCountry(countryName) {
  try {
    return await prisma.Activity.findMany({
      where: {
        country: countryName,
      },
      omit: {
        records: true,
        laps: true,
      },
    });
  } catch (error) {
    console.error("Error fetching activities in :", error);
    throw error; // Re-throw the error for handling outside if needed
  }
}

export async function getActivitiyCoords(_id) {
  try {
    const activityCoords = await prisma.Activity.findUnique({
      where: {
        id: _id,
      },
      select: {
        records: true, // Only select the record in the activity found
      },
    });

    if (activityCoords.length < 1) {
      return { error: `Records in activity "${_id}" not found.` };
    }

    return getAllCoordinates(activityCoords.records);
  } catch (error) {
    console.error("Error fetching activity records in :", error);
    throw error; // Re-throw the error for handling outside if needed
  }
}

export async function getTotalTimeOfTraining() {
  try {
    const totalTimes = await prisma.Activity.findMany({
      select: {
        totalTimerTime: true, // Only select the timer time related to each activity
      },
    });

    const total = totalTimes.reduce(
      (accumulator, currentValue) => accumulator + currentValue.totalTimerTime,
      0
    );

    return Math.round(total / 3600); //return the total converted in hours
  } catch (error) {
    console.error("Error fetching activities in :", error);
    throw error; // Re-throw the error for handling outside if needed
  }
}
