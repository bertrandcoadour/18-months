import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const params = url.searchParams;
    const sport = params.get("sport");
    const subSport = params.get("subSport");
    const search = params.get("search");
    const sort_by = params.get("sort_by");
    const sort_order = params.get("sort_order");

    let query = {};
    if (sport) {
      query.sport = sport;
    }
    if (subSport) {
      query.subSport = subSport;
    }
    if (search) {
      query.title = {
        contains: search,
      };
    }
    let query_order = {};
    if (sort_by && sort_order) query_order[sort_by] = sort_order;
    else query_order["timestamp"] = "desc";
    const activities = await prisma.Activity.findMany({
      where: query,
      //take: 5,
      orderBy: query_order,
      omit: {
        records: true,
        laps: true,
      },
    });

    return NextResponse.json(activities);
  } catch (error) {
    throw new Error(error.message);
  }
}
