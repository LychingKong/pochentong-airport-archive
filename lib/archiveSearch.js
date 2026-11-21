// The homepage search (ArchiveGrid): does an entry match the typed query?
// Search against the fields in the currently selected language
export function matches(entry, query, language) {
  let searchFields = [];

  if (language === "km" && entry.translations?.km) {
    // Search Khmer translations
    searchFields = [
      entry.translations.km.title,
      entry.translations.km.description,
      entry.translations.km.contributor,
      entry.translations.km.date,
      ...(entry.translations.km.tags || []),
      entry.translations.km.story,
    ];
  } else {
    // Search English fields (default)
    searchFields = [
      entry.title,
      entry.description,
      entry.contributor,
      entry.date,
      ...(entry.tags || []),
      entry.story,
    ];
  }

  let haystack = searchFields.join(" ");
  if (language === "en") {
    haystack = haystack.toLowerCase();
  }
  return haystack.includes(query);
}
