import { convertMetersToKms } from "@/src/utils/Global/convertData";
import prisma from "@/src/prisma/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cyclingActivitiesDistance = await prisma.Activity.findMany({
      where: {
        sport: "cycling",
      },
      select: {
        totalDistance: true, // Only select the total distance related to each activity
      },
    });

    const total = cyclingActivitiesDistance.reduce(
      (accumulator, currentValue) =>
        accumulator + convertMetersToKms(currentValue.totalDistance),
      0
    );

    return NextResponse.json(Math.round(total));
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
