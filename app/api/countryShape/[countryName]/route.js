import prisma from "@/lib/db";
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
    const shape = await prisma.Country.findFirstOrThrow({
      where: {
        name: countryName,
      },
      select: {
        shape: true,
      },
    });

    return NextResponse.json(shape);
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
