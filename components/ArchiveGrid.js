"use client";

import { useMemo, useState } from "react";

import EntryCard from "./EntryCard";
import SearchInput from "./SearchInput";

// Check if an entry matches the search query by searching title, description, contributor, date, and tags.
function matches(entry, query) {
  const haystack = [
    entry.title,
    entry.description,
    entry.contributor,
    entry.date,
    ...(entry.tags || []),
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

export default function ArchiveGrid({ entries }) {
  // Search query state, updated as user types in SearchInput
  const [query, setQuery] = useState("");

  // Memoized filter: only re-runs when query or entries array changes. Returns all entries if query is empty.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? entries.filter((entry) => matches(entry, q)) : entries;
  }, [entries, query]);

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
        placeholder="Search entries, contributors, tags..."
      />

      <div style={styles.sectionHead}>
        <h2 style={styles.sectionTitle}>The Collection</h2>
        {/* Live count updates as search results change */}
        <span style={styles.count}>
          {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      {/* Show grid of results if any match, otherwise show "no results" message */}
      {filtered.length > 0 ? (
        <div style={styles.grid}>
          {filtered.map((entry) => (
            <EntryCard
              key={entry.id}
              title={entry.title}
              description={entry.description}
              contributor={entry.contributor}
              date={entry.date}
              image={entry.images && entry.images[0] ? entry.images[0] : ""}
            />
          ))}
        </div>
      ) : (
        <p style={styles.empty}>No entries match &ldquo;{query}&rdquo;.</p>
      )}
    </section>
  );
}
