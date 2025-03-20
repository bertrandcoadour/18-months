//in an array of multiple differents entries, count the occurences of each entries
//an return it in a set of : object {entry, entryOccurences}

export function countOccurencesOfEntries(data) {
  const entriesCounts = {};

  for (const entry of data) {
    // Normalize country names (e.g., lowercase, remove extra spaces) for consistent counting
    const normalizedEntry = entry.trim().toLowerCase(); // Important for accurate counts

    if (entriesCounts[normalizedEntry]) {
      entriesCounts[normalizedEntry].entryOccurences++;
    } else {
      entriesCounts[normalizedEntry] = {
        entryName: entry, // Store the original name (case-sensitive)
        entryOccurences: 1,
      };
    }
  }

  // Convert the object to an array of objects
  const result = Object.values(entriesCounts);

  return result;
}
