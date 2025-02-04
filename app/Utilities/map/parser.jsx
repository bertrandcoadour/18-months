import * as fs from "node:fs";

const COUNTRY_SHAPE_FILE = "data/WorldMap/countryShapes.json";
const CITIES_FILES = "data/cities500/cities500.txt";
const COUNTRY_FILE = "data/cities500/countryCode.txt";

export function countryShapeParser() {
  try {
    const path = COUNTRY_SHAPE_FILE;

    const data = JSON.parse(fs.readFileSync(path));
    //console.log(data);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export function cityParser() {
  const filePath = CITIES_FILES;

  try {
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.split("\n");

    const cities = lines
      .map((line) => {
        const regex =
          /(\d{5,})\s+(.+?)\s+(-?\d{1,3}\.\d+)\s+(-?\d{1,3}\.\d+)\s+.*?\s+(?<![A-Z])([A-Z]{2})(?![A-Z])\s*/;
        const match = line.match(regex);

        if (match) {
          const id = match[1];
          const name = match[2].trim().split("\t")[0];
          const latitude = parseFloat(match[3]);
          const longitude = parseFloat(match[4]);
          const countryCode = match[5];
          return { name, latitude, longitude, countryCode };
        } else {
          return null;
        }
      })
      .filter((item) => item !== null); // Filter out lines that didn't match

    const citiesByCountry = [];

    cities.forEach((city) => {
      const countryEntry = citiesByCountry.find(
        (entry) => entry.countryCode == city.countryCode
      );

      if (countryEntry) {
        countryEntry.cities.push(city);
      } else {
        citiesByCountry.push({
          countryCode: city.countryCode,
          cities: [city],
        });
      }
    });

    return citiesByCountry;
  } catch (err) {
    console.error("Error reading file:", err);
    return null;
  }
}

export function countryParser() {
  const filePath = COUNTRY_FILE;

  try {
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.split("\n");

    const countries = lines
      .map((line) => {
        const regex =
          /([A-Z]{2})\t([^\t]+)\t([^\t]+)\t[^\t]+\t(\d+)\t([A-Z]{2})/;
        const match = line.match(regex);

        if (match) {
          const code = match[1];
          const name = match[2];
          const capital = match[3];
          const population = parseInt(match[4]);
          const continentCode = match[5];
          return { code, name, capital, population, continentCode };
        } else {
          return null;
        }
      })
      .filter((item) => item !== null); // Filter out lines that didn't match

    console.log(countries.length);

    const shapes = countryShapeParser();
    const cities = cityParser();

    let result = [];

    countries.forEach((country) => {
      let foundShape = shapes.features.find(
        (shape) => shape.properties.ISO_A2 == country.code
      );

      let foundCities = cities.find((city) => city.countryCode == country.code);

      foundShape && foundCities
        ? result.push({
            ...country,
            shape: foundShape,
            cities: foundCities.cities,
          })
        : result.push(data);
    });

    return result;
  } catch (err) {
    console.error("Error reading file:", err);
    return null;
  }
}
