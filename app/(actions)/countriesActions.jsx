"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getCountryShape(countryName) {
  try {
    return await prisma.Country.findFirstOrThrow({
      where: {
        name: countryName,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCountryName(countryCode) {
  try {
    return await prisma.Country.findFirstOrThrow({
      where: {
        code: countryCode,
      },
      select: {
        name: true,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getAllCities() {
  try {
    const countriesWithCities = await prisma.Country.findMany({
      select: {
        cities: true, // Only select the cities related to each country
      },
    });

    // Flatten the array of cities: countriesWithCities is an array of objects, each with a cities property (which is an array of cities). We want a single array of all cities.

    const allCities = countriesWithCities.flatMap((country) => country.cities);

    return allCities;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error; // Re-throw the error for handling outside if needed
  }
}
