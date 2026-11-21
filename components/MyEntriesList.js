"use client";

import Link from "next/link";

import { useLanguage } from "./LanguageProvider";
import MyEntriesEmpty from "./MyEntriesEmpty";

const styles = {
  heading: {
    fontSize: "clamp(28px, 4vw, 40px)",
    margin: "0 0 clamp(24px, 4vw, 40px)",
  },
  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "grid",
    gap: 12,
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "8px 16px",
    padding: "16px 20px",
    border: "1px solid var(--color-line)",
    borderRadius: 12,
    color: "inherit",
    textDecoration: "none",
  },
  status: {
    fontSize: 14,
    color: "var(--color-muted)",
    whiteSpace: "nowrap",
  },
  note: {
    width: "100%",
    fontSize: 14,
    lineHeight: 1.5,
    color: "var(--color-text-soft)",
  },
};

export default function MyEntriesList({ entries }) {
  const { language, t } = useLanguage();

  // No entries yet: the "Your Story Starts Here" invitation instead.
  if (entries.length === 0) return <MyEntriesEmpty />;

  return (
    <section>
      <h1 style={styles.heading} data-reveal>
        {t.myEntries}
      </h1>
      <ul style={styles.list}>
        {entries.map((entry) => (
          <li key={entry.id} data-reveal>
            <Link href={`/entries/${entry.id}`} style={styles.item}>
              <span>
                {language === "km" && entry.title_km
                  ? entry.title_km
                  : entry.title}
              </span>
              <span style={styles.status}>{t.statuses[entry.status]}</span>
              {entry.status === "returned" && entry.review_note ? (
                <span style={styles.note}>
                  {t.reviewerNoteLabel} {entry.review_note}
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
