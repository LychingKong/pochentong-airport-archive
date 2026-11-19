"use client";

import { useMemo, useState } from "react";

import { getLocalizedEntryField } from "../lib/translations";
import styles from "./ArchiveGrid.module.css";
import EntryCard from "./EntryCard";
import { useLanguage } from "./LanguageProvider";
import NoResults from "./NoResults";
import SearchInput from "./SearchInput";

// Search against the fields in the currently selected language
function matches(entry, query, language) {
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

export default function ArchiveGrid({ entries }) {
  const { language, t } = useLanguage();

  // Search query state, updated as user types in SearchInput
  const [query, setQuery] = useState("");

  // Memoized filter: re-runs when query, language, or entries array changes. Returns all entries if query is empty.
  const filtered = useMemo(() => {
    let q = query.trim().replace(/["']/g, "");
    if (language === "en") {
      q = q.toLowerCase();
    }
    return q ? entries.filter((entry) => matches(entry, q, language)) : entries;
  }, [entries, query, language]);

  return (
    <section>
      {/* Title and live count on the left, search on the right (stacks on phones) */}
      <div className={styles.toolbar}>
        <div className={styles.heading}>
          <h2 className={styles.title}>{t.collectionSectionTitle}</h2>
          <span className={styles.count}>
            {filtered.length}{" "}
            {filtered.length === 1 ? t.entryCountSingular : t.entryCountPlural}
          </span>
        </div>
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder={t.searchPlaceholder}
        />
      </div>

      {/* Show grid of results if any match, otherwise show "no results" message */}
      {filtered.length > 0 ? (
        <div className={styles.grid}>
          {filtered.map((entry) => (
            <EntryCard
              key={entry.id}
              id={entry.id}
              title={getLocalizedEntryField(entry, "title", language)}
              description={getLocalizedEntryField(
                entry,
                "description",
                language,
              )}
              contributor={getLocalizedEntryField(
                entry,
                "contributor",
                language,
              )}
              date={getLocalizedEntryField(entry, "date", language)}
              image={entry.images && entry.images[0] ? entry.images[0] : ""}
              untitledLabel={t.untitledEntry}
            />
          ))}
        </div>
      ) : query.trim() ? (
        // A search found nothing: illustrated "no entries found" message.
        <NoResults />
      ) : (
        // Nothing published yet (no search typed): keep the short message.
        <p className={styles.empty}>{t.noResults}</p>
      )}
    </section>
  );
}
