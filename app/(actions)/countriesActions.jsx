"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getCountryShape(countryName) {
  try {
    return await prisma.Country.findFirstOrThrow({
      where: {
        name: countryName,
      },
      select: {
        shape: true,
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

export async function getCountryCode(countryName) {
  try {
    return await prisma.Country.findFirstOrThrow({
      where: {
        name: countryName,
      },
      select: {
        code: true,
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

    const allCities = countriesWithCities.flatMap((country) => country.cities);

    return allCities;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error; // Re-throw the error for handling outside if needed
  }
}

export async function getCitiesFromCountry(countryName) {
  try {
    const countriesWithCities = await prisma.Country.findMany({
      select: {
        cities: true, // Only select the cities related to the country
      },
      where: {
        name: countryName,
      },
    });

    const allCities = countriesWithCities.flatMap((country) => country.cities);
    return allCities;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error; // Re-throw the error for handling outside if needed
  }
}

export async function getAllCountries() {
  try {
    return await prisma.Country.findMany({
      select: {
        name: true, // Only select the cities related to each country
      },
    });
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error; // Re-throw the error for handling outside if needed
  }
}
