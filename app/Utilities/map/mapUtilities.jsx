import {
  updateActivityCity,
  updateActivityCountry,
  updateActivityTitle,
} from "@/app/(actions)/activitiesActions";
import { getAllCities, getCountryName } from "@/app/(actions)/countriesActions";

export function getCenterOfCoordinates(coordinates) {
  let centerCoordinates = [];

  if (coordinates == null || coordinates.length < 1) return [];

  let smallestLat = coordinates[0].at(1);
  let biggestLat = coordinates[0].at(1);
  let smallestLong = coordinates[0].at(0);
  let biggestLong = coordinates[0].at(0);

  for (const coord of coordinates) {
    if (coord.at(0) < smallestLong) smallestLong = coord.at(0);
    if (coord.at(0) > biggestLong) biggestLong = coord.at(0);
    if (coord.at(1) < smallestLat) smallestLat = coord.at(1);
    if (coord.at(1) > biggestLat) biggestLat = coord.at(1);
  }

  let centerLong = (biggestLong + smallestLong) / 2;
  let centerLat = (biggestLat + smallestLat) / 2;

  centerCoordinates.push(centerLat, centerLong);

  return centerCoordinates;
}

export function getZoomValue(coordinates) {
  if (coordinates == null || coordinates.length < 1) return 10;

  let smallestLat = coordinates[0].at(1);
  let biggestLat = coordinates[0].at(1);
  let smallestLong = coordinates[0].at(0);
  let biggestLong = coordinates[0].at(0);

  for (const coord of coordinates) {
    if (coord.at(0) < smallestLong) smallestLong = coord.at(0);
    if (coord.at(0) > biggestLong) biggestLong = coord.at(0);
    if (coord.at(1) < smallestLat) smallestLat = coord.at(1);
    if (coord.at(1) > biggestLat) biggestLat = coord.at(1);
  }

  let distanceLong = (biggestLong - smallestLong) * 1000;
  let distanceLat = (biggestLat - smallestLat) * 1000;

  let zoomvalue = 10;

  if (0 <= distanceLat + distanceLong && distanceLat + distanceLong < 10)
    zoomvalue = 16;
  if (10 <= distanceLat + distanceLong && distanceLat + distanceLong < 25)
    zoomvalue = 15;
  if (25 <= distanceLat + distanceLong && distanceLat + distanceLong < 50)
    zoomvalue = 14;
  if (50 <= distanceLat + distanceLong && distanceLat + distanceLong < 70)
    zoomvalue = 13;
  if (70 <= distanceLat + distanceLong && distanceLat + distanceLong < 200)
    zoomvalue = 12;
  if (distanceLat + distanceLong > 200) zoomvalue = 11;

  return zoomvalue;
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers

  // Convert latitude and longitude to radians
  const radLat1 = (Math.PI * lat1) / 180;
  const radLon1 = (Math.PI * lon1) / 180;
  const radLat2 = (Math.PI * lat2) / 180;
  const radLon2 = (Math.PI * lon2) / 180;

  // Haversine formula
  const dLon = radLon2 - radLon1;
  const dLat = radLat2 - radLat1;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.asin(Math.sqrt(a));
  const distance = R * c;

  return distance;
}

export function convertFitToStandardCoord(fitCoord) {
  return fitCoord * (180 / Math.pow(2, 31));
}

export async function updateActivitiesCountryAndCity(activities, cities) {
  let count = 0;

  for (const activity of activities) {
    console.log("updating activity : ", count);

    if (activity.necLat && activity.necLong) {
      let rslt = getNearestCity(
        cities,
        convertFitToStandardCoord(activity.necLat),
        convertFitToStandardCoord(activity.necLong)
      );

      if (rslt) {
        try {
          await updateActivityCity(activity.id, rslt.city);
          const country = await getCountryName(rslt.country);
          await updateActivityCountry(activity.id, country.name);
          await updateActivityTitle(
            activity.id,
            activity.sport +
              " activity, " +
              activity?.city +
              ", " +
              activity?.country
          );
        } catch (error) {
          throw new Error(error.message);
        }
      }
    }

    count += 1;
  }

  return 0;
}

export async function updateActivitiesTitle(activities) {
  let count = 0;

  for (const activity of activities) {
    console.log("updating activity : ", count);

    try {
      await updateActivityTitle(activity.id, activity.sport + " activity");
    } catch (error) {
      throw new Error(error.message);
    }

    count += 1;
  }

  return 0;
}

export function getNearestCity(cities, lat, long) {
  let nearestCity = null;
  let countryCode = null;
  let smallestDistance = 1000000;

  cities.forEach((city) => {
    let distance = haversine(city.latitude, city.longitude, lat, long);

    if (distance < smallestDistance) {
      nearestCity = city.name;
      countryCode = city.countryCode;
      smallestDistance = distance;
    }
  });

  return {
    city: nearestCity,
    country: countryCode,
  };
}

export function getCitiesWithinKilometers(
  cities,
  originLat,
  originLong,
  radius
) {
  let citiesWithinRadius = [];

  cities.forEach((city) => {
    let distance = haversine(
      city.latitude,
      city.longitude,
      originLat,
      originLong
    );

    if (distance <= radius) {
      citiesWithinRadius.push(city);
    }
  });

  return citiesWithinRadius;
}

export function getVisitiedCountries(activities) {
  const countries = new Set();

  // const allCities = cityParser();
  // const countryCode = countryCodeParser();

  activities.forEach((activity) => {
    const lat = activity?.necLat * (180 / Math.pow(2, 31));
    const long = activity?.necLong * (180 / Math.pow(2, 31));

    // if (lat != 0 && long != 0) {
    //   let info = getNearestCity(allCities, countryCode, lat, long);
    //   countries.add(info.country);
    //   console.log(info);
    // }
  });

  return countries;
}
