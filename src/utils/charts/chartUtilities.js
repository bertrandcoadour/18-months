import {
  convertMetersPerSecondsToPace,
  convertMetersToKms,
} from "../../../src/utils/Global/convertData";

export function getPaceChartInterval(totalDistance) {
  if (isNaN(totalDistance)) return 0;

  if (0 < totalDistance && totalDistance <= 20) return 1;
  if (20 < totalDistance && totalDistance <= 40) return 2;
  if (40 < totalDistance) return 4;
}

export function getAveragePaceForEachKm(activity) {
  const records = activity?.records;
  const totalDistance = convertMetersToKms(activity?.totalDistance);

  var rawData = [];
  var data = [];

  records.forEach((record) => {
    const distance = convertMetersToKms(record?.distance);
    const speed = record?.enhancedSpeed;
    const altitude = Math.round(record?.enhancedAltitude);
    rawData.push([distance, speed, altitude]);
  });

  for (let i = 0; i <= totalDistance; i += 1) {
    let currentKilData = rawData.filter(
      (data) => i <= data.at(0) && data.at(0) < i + 1
    );

    //there should be at least 5 records for the current kilometer to be considered a valid one
    if (currentKilData.length < 10) continue;

    let totalSpeed = 0;

    currentKilData.forEach((rawData) => {
      totalSpeed += rawData.at(1);
    });

    //the speed data in the records must not be 0 for the current kilometer to be considered a valid one
    if (!totalSpeed > 0) continue;

    let avgSpeed = Math.round((totalSpeed / currentKilData.length) * 100) / 100;

    let avgPace = convertMetersPerSecondsToPace(avgSpeed);

    let totalAltitude = 0;
    currentKilData.forEach((rawData) => {
      totalAltitude += rawData.at(2);
    });

    let avgAltitude =
      Math.round((totalAltitude / currentKilData.length) * 100) / 100;

    data.push({
      distance: i + 1,
      speed: avgSpeed,
      pace: avgPace,
      altitude: avgAltitude,
    });
  }

  return data;
}

export function getAscentDescentForEachKm(activity) {
  const rawData = getAllDistancesAndAltitudes(activity?.records);
  const totalDistance = convertMetersToKms(activity?.totalDistance);
  var data = [];

  for (let i = 0; i <= totalDistance; i += 1) {
    let currentKilData = rawData.filter(
      (data) => i <= data.distance && data.distance < i + 1
    );

    //there should be at least 5 records for the current kilometer to be considered a valid one
    if (currentKilData.length < 10) continue;

    let ascent = Math.round(
      getTotalAscent(currentKilData, 3)
      //getTotalAscent2(currentKilData)
    );
    let descent = Math.round(getTotalDescent(currentKilData, 3));

    data.push({
      distance: i + 1,
      ascent: ascent,
      descent: descent,
    });
  }

  return data;
}

export function getLapsData(activity) {
  const laps = activity?.laps;

  var data = [];
  let count = 0;
  let distances = new Set();

  laps.forEach((lap) => {
    count += 1;
    const distance = convertMetersToKms(lap?.totalDistance);
    const speed = lap?.enhancedAvgSpeed;

    data.push({
      count: count,
      distance: distance,
      speed: speed,
      pace: convertMetersPerSecondsToPace(speed),
    });
  });

  return data;
}

//get relevant elevation points from raw data
// input : data, must be an array of distances and altitudes
// input : the threshold to apply to decide wheter a value must be kept in the relevant data
// output : an array with only relevant data
export function getRelevantElevationData(data, threshold) {
  if (data.length < 1) return null;

  let relevantData = [];

  //use the average altitude of the first 1 percent of the data to get the first valid altitude
  const firstOnePercent = data.slice(0, Math.ceil(data.length * 0.01));
  const sum = firstOnePercent
    .map((item) => item.altitude)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const avgAltitude = sum / firstOnePercent.length;
  let lastValidAltitude = avgAltitude;

  for (let i = 1; i < data.length; i += 5) {
    //if the current value does not clear the threshold, go to the next value
    if (Math.abs(data[i].altitude - lastValidAltitude) <= threshold) continue;

    relevantData.push(data[i]);
    //the current altitude becomes the reference for the last valid altitude
    lastValidAltitude = data[i].altitude;
  }
  return relevantData;
}

//retrieve the total ascent from a set of data
// input : data, must be an array of distances and altitudes
// input : the threshold to apply for the elevation computation
// output :-1 if failed at any point, the total ascent otherwise
export function getTotalAscent(data, threshold) {
  let totalAscent = 0;

  if (data.length < 1) return -1;

  //use the average altitude of the first 10 percent of the data to get the first valid altitude
  const firstTenPercent = data.slice(0, Math.ceil(data.length * 0.1));
  const sum = firstTenPercent
    .map((item) => item.altitude)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const avgAltitude = sum / firstTenPercent.length;
  let lastValidAltitude = avgAltitude;

  for (let i = 1; i < data.length; i++) {
    //if the current value does not clear the threshold, go to the next value
    if (Math.abs(data[i].altitude - lastValidAltitude) <= threshold) continue;

    //the current value cleared the threshold, check that it is an ascent from the last valid altitude
    if (data[i].altitude > lastValidAltitude) {
      //add the difference of altitude to the total
      totalAscent += data[i].altitude - lastValidAltitude;

      //the current altitude becomes the reference for the last valid altitude
      lastValidAltitude = data[i].altitude;
    }
  }
  return totalAscent;
}

//retrieve the total descent from a set of data
// input : data, must be an array of distances and altitudes
// input : the threshold to apply for the elevation computation
// output :-1 if failed at any point, the total descent otherwise
export function getTotalDescent(data, threshold) {
  let totalDescent = 0;

  if (data.length < 1) return -1;

  //use the average altitude of the first 10 percent of the data to get the first valid altitude
  const firstTenPercent = data.slice(0, Math.ceil(data.length * 0.1));
  const sum = firstTenPercent
    .map((item) => item.altitude)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const avgAltitude = sum / firstTenPercent.length;
  let lastValidAltitude = avgAltitude;

  for (let i = 1; i < data.length; i++) {
    //if the current value does not clear the threshold, go to the next value
    if (Math.abs(data[i].altitude - lastValidAltitude) <= threshold) continue;

    //the current value cleared the threshold, check that it is an ascent from the last valid altitude
    if (data[i].altitude < lastValidAltitude) {
      //add the difference of altitude to the total
      totalDescent += lastValidAltitude - data[i].altitude;
      //the current altitude becomes the reference for the last valid altitude
      lastValidAltitude = data[i].altitude;
    }
  }
  return totalDescent;
}

//retrieve all the coordinates of a session in the records
// input : records, contain all data from the session
// output : list of longitudes and latitudes

export function getAllCoordinates(records) {
  let coordinates = [];

  records.forEach((record) => {
    const lat = record?.positionLat * (180 / Math.pow(2, 31));
    const long = record?.positionLong * (180 / Math.pow(2, 31));
    lat != 0 && long != 0 && coordinates.push([long, lat]);
  });

  return coordinates;
}

//for each record of the session, retrieve the distance and the associated coordinates
// input : records, contain all data from the session
// output : array of object with distances, longitudes and latitudes

export function getAllDistancesAndCoordinates(records) {
  let data = [];

  //console.log(records);

  records.forEach((record) => {
    const lat = record?.positionLat * (180 / Math.pow(2, 31));
    const long = record?.positionLong * (180 / Math.pow(2, 31));
    const distance = record?.distance;
    lat != 0 &&
      long != 0 &&
      data.push({
        distance: distance,
        longitude: long,
        latitude: lat,
      });
  });

  return data;
}

//for each record of the session, retrieve the distance and the associated altitude
// input : records, contain all data from the session
// output : array of object with distances and altitudes

export function getAllDistancesAndAltitudes(records) {
  let data = [];

  records.forEach((record) => {
    const distance = convertMetersToKms(record?.distance);
    const altitude = Math.round(record?.enhancedAltitude);
    altitude > 0 &&
      data.push({
        distance: distance,
        altitude: altitude,
      });
  });

  return data;
}

//for each record of the session, retrieve the distance and the associated heart rates
// input : records, contain all data from the session
// output : array of object with distances and heart rates

export function getAllDistancesAndHeartRates(records) {
  let data = [];

  records.forEach((record) => {
    const distance = convertMetersToKms(record?.distance);
    const heartRate = Math.round(record?.heartRate);
    heartRate > 0 &&
      data.push({
        distance: distance,
        heartRate: heartRate,
      });
  });

  return data;
}

//retrieve the coordinates betwwen two kilometers
// input : coordinates, array of object with distances, longitudes and latitudes
// input : start, the distance from which to start the search, in meters
// input : finish, the distance from which to end the search, in meters
// output : list of longitudes and latitudes

export function getCoordinatesBetween(coordinates, start, end) {
  let coordBetween = [];

  coordinates.forEach((coord) => {
    if (coord.distance >= start && coord.distance < end) {
      const lat = coord.latitude;
      const long = coord.longitude;
      lat != 0 && long != 0 && coordBetween.push([long, lat]);
    }
  });

  return coordBetween;
}
