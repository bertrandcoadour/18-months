"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { countOccurencesOfEntries } from "../Utilities/Global/arrayManipulation";

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
    //console.log("country count : ", countriesCount);

    //return new Set(flattenCountries);
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error; // Re-throw the error for handling outside if needed
  }
}
