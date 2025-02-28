import { convertMetersToKms } from "@/app/Utilities/Global/convertData";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const walkingActivitiesDistance = await prisma.Activity.findMany({
      where: {
        sport: "walking",
        subSport: "generic",
      },
      select: {
        totalDistance: true, // Only select the total distance related to each activity
      },
    });

    const total = walkingActivitiesDistance.reduce(
      (accumulator, currentValue) =>
        accumulator + convertMetersToKms(currentValue.totalDistance),
      0
    );

    return NextResponse.json(Math.round(total));
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
