"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { countOccurencesOfEntries } from "../Utilities/Global/arrayManipulation";
import { convertMetersToKms } from "../Utilities/Global/convertData";
import { getAllCoordinates } from "../Utilities/charts/chartUtilities";

export async function getActivities(params) {
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

    return await prisma.Activity.findMany({
      where: query,
      //take: 50,
      orderBy: query_order,
      omit: {
        records: true,
        laps: true,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
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

export async function getActivitiesCountries() {
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
}

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
        totalDistance: true, // Only select the country related to each activity
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
        totalDistance: true, // Only select the country related to each activity
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
