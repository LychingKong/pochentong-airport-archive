"use client";

import { useMemo, useState } from "react";

import { matches } from "../lib/archiveSearch";
import { getLocalizedEntryField } from "../lib/translations";
import styles from "./ArchiveGrid.module.css";
import ArchiveToolbar from "./ArchiveToolbar";
import EntryCard from "./EntryCard";
import { useLanguage } from "./LanguageProvider";
import NoResults from "./NoResults";

export default function ArchiveGrid({ entries }) {
  const { language, t } = useLanguage();

  // Search query state, updated as user types in SearchInput
  const [query, setQuery] = useState("");
  // "newest" or "oldest", from the sort menu.
  const [order, setOrder] = useState("newest");

  // Memoized filter: re-runs when the query or entries array changes.
  // Returns all entries if the query is empty. Lowercasing makes English
  // case-insensitive and leaves Khmer unchanged (it has no case).
  const filtered = useMemo(() => {
    const q = query.trim().replace(/["']/g, "").toLowerCase();
    return q ? entries.filter((entry) => matches(entry, q)) : entries;
  }, [entries, query]);

  // The homepage loads entries newest first (ordered by created_at in
  // app/page.js), so "Oldest First" is that list reversed.
  const shown = order === "oldest" ? [...filtered].reverse() : filtered;

  return (
    <section>
      <ArchiveToolbar
        count={shown.length}
        query={query}
        onQuery={setQuery}
        order={order}
        onOrder={setOrder}
      />

      {/* Show grid of results if any match, otherwise show "no results" message */}
      {shown.length > 0 ? (
        <div className={styles.grid}>
          {shown.map((entry) => (
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
        <p className={styles.empty} data-reveal>
          {t.noResults}
        </p>
      )}
    </section>
  );
}
