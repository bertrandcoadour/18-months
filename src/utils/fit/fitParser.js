import { Decoder, Stream, Profile, Utils } from "@garmin/fitsdk";
import * as fs from "node:fs";
import prisma from "@/src/prisma/db";
import { convertFitToStandardCoord, getNearestCity } from "../map/mapUtilities";
import {
  getActivities,
  updateActivityCity,
  updateActivityCountry,
} from "@/src/actions/activitiesActions";
import { getAllCities, getCountryName } from "@/src/actions/countriesActions";

export async function fitParser(fitFilesDir) {
  if (fitFilesDir == "") return;

  fs.readdir(fitFilesDir, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    let parsedFilesCount = 0;
    let dbPostCount = 0;
    files.forEach((file) => {
      parsedFilesCount += 1;
      console.log(file, " parsing file n° : ", parsedFilesCount);
      let data = parseFitFile(fitFilesDir + "/" + file);

      if (data) {
        dbPostCount += 1;
        console.log("filling database. Post n° : ", dbPostCount);
        fillDataBase(data);
      }
    });

    //console.log("Files in the directory:", files);
  });

  // let data = parseFitFile("data/bertrandcoadour@gmail.com_40572680162.fit");
  // fillDataBase(data);
}

export function parseFitFile(fitFilePath) {
  const buf = fs.readFileSync(fitFilePath);
  const stream = Stream.fromBuffer(buf);

  const decoder = new Decoder(stream);

  //const recordFields = new Set();
  const recordMessages = [];
  const lapMessages = [];
  const sessionMessages = [];

  const onMesg = (messageNumber, message) => {
    if (Profile.types.mesgNum[messageNumber] === "record") {
      let msg = {
        timestamp: message.timestamp,
        positionLat: message?.positionLat,
        positionLong: message?.positionLong,
        distance: message.distance,
        altitude: message?.altitude,
        speed: message?.speed,
        cycleLength16: message?.cycleLength16,
        currentStress: message?.currentStress,
        heartRate: message?.heartRate,
        cadence: message?.cadence,
        fractionalCadence: message?.fractionalCadence,
        enhancedAltitude: message?.enhancedAltitude,
        enhancedSpeed: message?.enhancedSpeed,
      };
      recordMessages.push(msg);
    }

    if (Profile.types.mesgNum[messageNumber] === "session") {
      let msg = {
        title: message.sport + " activity",
        timestamp: message.timestamp,
        startTime: message.startTime,
        startPositionLat: message.startPositionLat,
        startPositionLong: message.startPositionLong,
        totalElapsedTime: message.totalElapsedTime,
        totalTimerTime: message.totalTimerTime,
        totalDistance: message.totalDistance,
        totalCycles: message.totalCycles,
        necLat: message.necLat,
        necLong: message.necLong,
        swcLat: message.swcLat,
        swcLong: message.swcLong,
        endPositionLat: message.endPositionLat,
        endPositionLong: message.endPositionLong,
        sportProfileName: message.sportProfileName,
        messageIndex: message.messageIndex,
        totalCalories: message.totalCalories,
        avgSpeed: message.avgSpeed,
        maxSpeed: message.maxSpeed,
        totalAscent: message.totalAscent,
        totalDescent: message.totalDescent,
        firstLapIndex: message.firstLapIndex,
        numLaps: message.numLaps,
        event: message.event,
        eventType: message.eventType,
        sport: message.sport,
        subSport: message.subSport,
        avgHeartRate: message.avgHeartRate,
        maxHeartRate: message.maxHeartRate,
        avgCadence: message.avgCadence,
        maxCadence: message.maxCadence,
        totalTrainingEffect: message.totalTrainingEffect,
        trigger: message.trigger,
        avgFractionalCadence: message.avgFractionalCadence,
        maxFractionalCadence: message.maxFractionalCadence,
        totalAnaerobicTrainingEffect: message.totalAnaerobicTrainingEffect,
        totalStrides: message.totalStrides,
        avgRunningCadence: message.avgRunningCadence,
        maxRunningCadence: message.maxRunningCadence,
        enhancedAvgSpeed: message.enhancedAvgSpeed,
        enhancedMaxSpeed: message.enhancedMaxSpeed,
      };

      sessionMessages.push(msg);
    }

    if (Profile.types.mesgNum[messageNumber] === "lap") {
      let msg = {
        timestamp: message.timestamp,
        startTime: message.startTime,
        startPositionLat: message.startPositionLat,
        startPositionLong: message.startPositionLong,
        endPositionLat: message.endPositionLat,
        endPositionLong: message.endPositionLong,
        totalElapsedTime: message.totalElapsedTime,
        totalTimerTime: message.totalTimerTime,
        totalDistance: message.totalDistance,
        totalCycles: message.totalCycles,
        messageIndex: message.messageIndex,
        totalCalories: message.totalCalories,
        avgSpeed: message.avgSpeed,
        maxSpeed: message.maxSpeed,
        totalAscent: message.totalAscent,
        totalDescent: message.totalDescent,
        event: message.event,
        eventType: message.eventType,
        avgHeartRate: message.avgHeartRate,
        maxHeartRate: message.maxHeartRate,
        avgCadence: message.avgCadence,
        maxCadence: message.maxCadence,
        lapTrigger: message.lapTrigger,
        sport: message.sport,
        subSport: message.subSport,
        avgFractionalCadence: message.avgFractionalCadence,
        maxFractionalCadence: message.maxFractionalCadence,
        totalStrides: message.totalStrides,
        avgRunningCadence: message.avgRunningCadence,
        maxRunningCadence: message.maxRunningCadence,
        enhancedAvgSpeed: message.enhancedAvgSpeed,
        enhancedMaxSpeed: message.enhancedMaxSpeed,
      };

      lapMessages.push(msg);
    }
  };

  const { messages, errors } = decoder.read({
    mesgListener: onMesg,
    convertTypesToStrings: true,
    convertDateTimesToDates: false,
    includeUnknownData: false,
  });

  if (recordMessages.length < 1) {
    console.log("current file is not an activity file, abort parsing...");
    return;
  }

  sessionMessages.at(0).laps = lapMessages;
  sessionMessages.at(0).records = recordMessages;

  // console.log("record : ", recordMessages.at(50));
  // console.log("lap : ", lapMessages.at(2));
  //console.log("session : ", sessionMessages.at(0).country);

  return sessionMessages.at(0);
}

async function fillDataBase(data) {
  try {
    await prisma.Activity.create({
      data: data,
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateActivitiesCountryAndCity() {
  const activities = await getActivities({});
  const cities = await getAllCities();

  let count = 0;

  for (const activity of activities) {
    if (!activity.country && !activity.city) {
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
          } catch (error) {
            throw new Error(error.message);
          }
        }
      }

      count += 1;
    }
  }

  return 0;
}
