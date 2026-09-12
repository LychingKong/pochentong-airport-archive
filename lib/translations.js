// Static UI copy (chrome text) for each supported language. Khmer values are
// placeholders to be replaced with real translations later.
export const uiText = {
  en: {
    kicker: "KHMER LIVING ARCHIVE",
    curatedByLabel: "CURATED BY",
    sourceLabel: "SOURCE",
    collectionSectionTitle: "The Collection",
    entryCountSingular: "entry",
    entryCountPlural: "entries",
    searchPlaceholder: "Search entries, contributors, tags...",
    clearSearchLabel: "Clear search",
    noResults: "No memories/stories found. Try a different keyword.",
    backToArchive: "← BACK TO ARCHIVE",
    untitledEntry: "Untitled entry",
    footer:
      "Built in ICT 340 — Vibe Coding, American University of Phnom Penh, Fall 2026. This archive is under construction all semester. Come back in December.",
  },
  km: {
    kicker: "បណ្ណសាររស់នៃកម្ពុជា",
    curatedByLabel: "រៀបចំដោយ",
    sourceLabel: "ប្រភព",
    collectionSectionTitle: "បណ្តុំប្រមូលផ្តុំ",
    entryCountSingular: "កំណត់ត្រា",
    entryCountPlural: "កំណត់ត្រា",
    searchPlaceholder: "ស្វែងរកតាម កំណត់ត្រា អ្នកចូលរួមចំណែក ស្លាក...",
    clearSearchLabel: "លុបការស្វែងរក",
    noResults: "រកមិនឃើញកំណត់ត្រា/រឿងរ៉ាវទេ។ សូមល្បងពាក្យគន្លឹះផ្សេង។",
    backToArchive: "← ត្រឡប់ទៅវិញ",
    untitledEntry: "កំណត់ត្រាគ្មានចំណងជើង",
    footer:
      "បង្កើតឡើងក្នុងមុខវិជ្ជា ICT 340 — Vibe Coding នៅសាកលវិទ្យាល័យអាមេរិកាំងភ្នំពេញ (AUPP) ឆមាសរដូវស្លឹកឈើជ្រុះ ឆ្នាំ២០២៦។ បណ្ណសារនេះកំពុងស្ថិតក្នុងការអភិវឌ្ឍពេញមួយឆមាស។ សូមត្រឡប់មកពិនិត្យឡើងវិញនៅខែធ្នូ។",
  },
};

// Khmer translations for the collection.config.js values shown on the homepage.
// collection.config.js itself stays English-only and untouched.
export const collectionText = {
  km: {
    name: "បណ្ណសារអាកាសយានដ្ឋានពោធិ៍ចិនតុង",
    description:
      "បណ្ណសារអាកាសយានដ្ឋានពោធិ៍ចិនតុង គឺជាបណ្ណសារឌីជីថលបែបសហគមន៍ ដែលជួយរក្សាទុកការចងចាំផ្ទាល់ខ្លួន រឿងរ៉ាវ រូបថត និងអនុស្សាវរីយ៍ផ្សេងៗ ទាក់ទងនឹងអតីតព្រលានយន្តហោះអន្តរជាតិភ្នំពេញ។",
    curator: "គង់ លីជីង",
    source:
      "ការចូលរួមចែករំលែកផ្ទាល់ពីសហគមន៍ អតីតបុគ្គលិកអាកាសយានដ្ឋាន អ្នកធ្វើដំណើរ ប្រជាជនក្នុងតំបន់ គ្រួសារ ព្រមទាំងឯកសារប្រវត្តិសាស្ត្រសាធារណៈ។",
  },
};

// Returns a single entry field in the given language, falling back to the
// English value when no translation exists yet (or the language is "en").
export function getLocalizedEntryField(entry, field, language) {
  if (language === "km") {
    const value = entry.translations?.km?.[field];
    if (value !== undefined) return value;
  }
  return entry[field];
}
