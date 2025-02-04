const date = {
  title: "timestamp",
  subTitle: "date",
  unit: "",
};

const distance = {
  title: "totalDistance",
  subTitle: "distance",
  unit: "km",
};

const time = {
  title: "totalElapsedTime",
  subTitle: "time",
  unit: "",
};

const average_pace = {
  title: "enhancedAvgSpeed",
  subTitle: "avg pace",
  unit: "/km",
};

const average_pace_cycling = {
  title: "enhancedAvgSpeed",
  subTitle: "speed",
  unit: "km/h",
};

const average_heart_rate = {
  title: "avgHeartRate",
  subTitle: "avg HR",
  unit: "bpm",
};

const maximum_heart_rate = {
  title: "maxHeartRate",
  subTitle: "max HT",
  unit: "bpm",
};

const calories = {
  title: "totalCalories",
  subTitle: "calories",
  unit: "",
};

const total_ascent = {
  title: "totalAscent",
  subTitle: "total ascent",
  unit: "m",
};

export const info_to_display = [
  {
    sport: "walking",
    subSport: "generic",
    items: [date, distance, time, average_pace, average_heart_rate, calories],
  },
  {
    sport: "running",
    subSport: "generic",
    items: [
      date,
      distance,
      time,
      average_pace,
      total_ascent,
      average_heart_rate,
    ],
  },
  {
    sport: "running",
    subSport: "trail",
    items: [
      date,
      distance,
      time,
      average_pace,
      total_ascent,
      average_heart_rate,
    ],
  },
  {
    sport: "cycling",
    subSport: "generic",
    items: [date, distance, time, average_pace_cycling, total_ascent, calories],
  },
  {
    sport: "swimming",
    subSport: "generic",
    items: [date, distance, time, average_pace, average_heart_rate, calories],
  },
  {
    sport: "training",
    subSport: "cardioTraining",
    items: [date, time, average_heart_rate, maximum_heart_rate, calories],
  },
];
