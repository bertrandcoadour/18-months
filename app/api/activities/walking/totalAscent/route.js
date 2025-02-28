import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const walkingActivitiesTotalAscents = await prisma.Activity.findMany({
      where: {
        sport: "walking",
      },
      select: {
        totalAscent: true, // Only select the total ascent related to each activity
      },
    });

    const total = walkingActivitiesTotalAscents.reduce(
      (accumulator, currentValue) => accumulator + currentValue.totalAscent,
      0
    );

    return NextResponse.json(Math.round(total));
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
