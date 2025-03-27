import { countryParser } from "./parser";
import prisma from "@/src/prisma/db";

export async function fillCountryDB() {
  const countries = countryParser();

  let dbPostCount = 0;
  countries.forEach((country) => {
    dbPostCount += 1;
    console.log("filling database. Post n° : ", dbPostCount);
    fillDataBase(country);
  });
}

async function fillDataBase(input) {
  const result = await prisma.Country.create({
    data: input,
  });
}
