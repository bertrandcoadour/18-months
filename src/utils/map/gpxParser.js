import { parseGPX } from "@we-gold/gpxjs";
import { convertTimestampToDate } from "../Global/convertData";

export async function gpxParser(file) {
  try {
    const reader = new FileReader();
    reader.readAsText(file);

    await new Promise((resolve) => (reader.onload = resolve));

    const [parsedFile] = parseGPX(reader.result);

    return parsedFile.toGeoJSON();
  } catch (error) {
    throw new Error(error.message);
  }
}

export function checkGPXWithActivity(geojson, activity) {
  if (!geojson) return false;

  const gpxName = geojson.features?.at(0).properties.name;
  const gpxType = geojson.features?.at(0).properties.type;
  const gpxDate = geojson.properties?.time;

  if (
    gpxName.toLowerCase() === activity.title.toLowerCase() &&
    gpxType.toLowerCase() === activity.activity_type.toLowerCase() &&
    convertTimestampToDate(gpxDate) === convertTimestampToDate(activity.date)
  )
    return true;

  return false;
}
