// The homepage search (ArchiveGrid): does an entry match the typed query?
// It searches the English fields and the Khmer translation together, so
// either language finds an entry whichever language the site is shown in.
// The query arrives already lowercased (ArchiveGrid). Lowercasing the text
// here only changes the English letters: Khmer has no upper or lower case,
// so toLowerCase() leaves it exactly as it is.
export function matches(entry, query) {
  const km = entry.translations?.km || {};
  const searchFields = [
    entry.title,
    entry.description,
    entry.contributor,
    entry.date,
    ...(entry.tags || []),
    entry.story,
    km.title,
    km.description,
    km.contributor,
    km.date,
    ...(km.tags || []),
    km.story,
  ];

  return searchFields.join(" ").toLowerCase().includes(query);
}
