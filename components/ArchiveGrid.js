"use client";

import { useMemo, useState } from "react";

import { getLocalizedEntryField } from "../lib/translations";
import EntryCard from "./EntryCard";
import { useLanguage } from "./LanguageProvider";
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

  const styles = {
    sectionHead: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      marginBottom: "clamp(28px, 4vw, 40px)",
    },
    sectionTitle: {
      fontFamily: "Georgia, 'Times New Roman', serif",
      fontSize: 22,
      fontWeight: 600,
      margin: 0,
      color: "#211F1B",
    },
    count: {
      fontFamily: "'Courier New', monospace",
      fontSize: 13,
      color: "#9C6B3F",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
      gap: "clamp(32px, 5vw, 56px)",
    },
    empty: {
      fontSize: 15,
      color: "#7C7568",
      lineHeight: 1.6,
      padding: "8px 0 24px",
    },
  };

  return (
    <section>
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder={t.searchPlaceholder}
      />

      <div style={styles.sectionHead}>
        <h2 style={styles.sectionTitle}>{t.collectionSectionTitle}</h2>
        {/* Live count updates as search results change */}
        <span style={styles.count}>
          {filtered.length}{" "}
          {filtered.length === 1 ? t.entryCountSingular : t.entryCountPlural}
        </span>
      </div>

      {/* Show grid of results if any match, otherwise show "no results" message */}
      {filtered.length > 0 ? (
        <div style={styles.grid}>
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
      ) : (
        <p style={styles.empty}>{t.noResults}</p>
      )}
    </section>
  );
}
