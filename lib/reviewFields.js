// Small helpers shared by the /review workspace components (formerly
// inside ReviewCard.js).

// Dates read dd-mm-yyyy, the same as the rest of the archive.
export function formatReviewDate(isoDate) {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}-${month}-${date.getFullYear()}`;
}

// Khmer falls back to English when the Khmer field is empty.
export function pickField(entry, field, language) {
  const khmer = entry[`${field}_km`];
  return language === "km" && khmer ? khmer : entry[field];
}
