const csv = require("csv-parser");
const fs = require("fs");

export async function readCSV() {
  var results = [];

  // asynchronus parsing of csv file
  const readableStream = fs.createReadStream("all_activities.csv");
  const csvParser = csv();
  for await (const data of readableStream.pipe(csvParser)) {
    //all fields in data are string but they can represent boolean or integer or decimal
    //they might need a conversion to match the db expected type
    for (var key in data) {
      if (key === "date") data[key] = new Date(data[key]);
      if (key === "favorite") data[key] = Boolean(data[key]);
      if (
        key === "distance" ||
        key === "aerobic_te" ||
        key === "average_stride_length" ||
        key === "average_vertical_ratio" ||
        key === "average_vertical_oscillation" ||
        key === "maximum_temperature"
      ) {
        data[key] = parseFloat(data[key].replace(",", "."));
      }

      if (
        key === "calories" ||
        key === "average_heart_rate" ||
        key === "maximum_heart_rate" ||
        key === "average_run_cadence" ||
        key === "maximum_run_cadence" ||
        key === "total_ascent" ||
        key === "total_descent" ||
        key === "training_stress_score" ||
        key === "grit" ||
        key === "total_strokes" ||
        key === "average_stroke_rate" ||
        key === "total_repetitions" ||
        key === "total_sets" ||
        key === "number_of_laps" ||
        key === "minimum_elevation" ||
        key === "maximum_elevation"
      )
        data[key] = parseInt(data[key].replace(".", ""));
    }

    results.push(data);
  }

  return results;
}
