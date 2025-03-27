import { convertMetersPerSecondsToPace } from "@/src/utils/Global/convertData";
import prisma from "@/src/prisma/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const runningActivitiesPaces = await prisma.Activity.findMany({
      where: {
        sport: "running",
      },
      select: {
        enhancedAvgSpeed: true, // Only select the avg speed related to each activity
      },
    });

    const total = runningActivitiesPaces.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.enhancedAvgSpeed,
      0
    );
    return NextResponse.json(
      convertMetersPerSecondsToPace(total / runningActivitiesPaces.length)
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
