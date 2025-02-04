"use server";

import prisma from "@/lib/db";

export async function addGPX(id, content) {
  try {
    let gpx = {
      activity_id: id,
      content: content,
    };

    return await prisma.GPXFile.create({
      data: gpx,
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getGPXById(_id) {
  try {
    return await prisma.GPXFile.findUnique({
      where: {
        activity_id: _id,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
