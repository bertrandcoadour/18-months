import { convertMetersToKms } from "@/app/Utilities/Global/convertData";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const runningActivitiesDistance = await prisma.Activity.findMany({
      where: {
        sport: "running",
      },
      select: {
        totalDistance: true, // Only select the total distance related to each activity
      },
    });

    const total = runningActivitiesDistance.reduce(
      (accumulator, currentValue) =>
        accumulator + convertMetersToKms(currentValue.totalDistance),
      0
    );

    return NextResponse.json(Math.round(total));
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
