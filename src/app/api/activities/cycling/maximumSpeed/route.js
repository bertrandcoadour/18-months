import {
  convertMetersPerSecondsToKmPerSeconds,
  convertMetersToKms,
} from "@/src/utils/Global/convertData";
import prisma from "@/src/prisma/db";
import { NextResponse } from "next/server";

export async function GET() {
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

    return NextResponse.json(
      Math.round(convertMetersPerSecondsToKmPerSeconds(maxSpeed))
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
