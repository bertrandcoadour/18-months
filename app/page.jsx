import {
  fitParser,
  updateActivitiesCountryAndCity,
} from "./Utilities/fit/fitParser";
import prisma from "@/lib/db";

export default async function Home() {
  //fitParser("data/FIT/newFit/UploadedFiles_0-_Part3");
  //const data = await fitParser("data/FIT/Light_UploadedFiles_0-_Part1");
  //updateActivitiesCountryAndCity();

  return <div>My dashborad</div>;
}
