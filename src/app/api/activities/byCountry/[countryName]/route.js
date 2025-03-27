import prisma from "@/src/prisma/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { countryName } = await params;

  if (!countryName) {
    return NextResponse.json(
      { message: "Missing countryName parameter" },
      { status: 400 }
    );
  }

  try {
    const activities = await prisma.Activity.findMany({
      where: {
        country: countryName,
      },
      omit: {
        records: true,
        laps: true,
      },
    });

    return NextResponse.json(activities);
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
