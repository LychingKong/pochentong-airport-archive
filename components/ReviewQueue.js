"use client";

import { useState } from "react";

import { useLanguage } from "./LanguageProvider";
import ReviewCard from "./ReviewCard";

const styles = {
  heading: {
    fontSize: "clamp(28px, 4vw, 40px)",
    margin: "0 0 clamp(24px, 4vw, 40px)",
  },
  message: {
    fontSize: 16,
    color: "var(--color-muted)",
  },
  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "grid",
    gap: 16,
  },
};

export default function ReviewQueue({ isReviewer, entries }) {
  const { t } = useLanguage();
  // Kept in state so a reviewed entry can leave the list without a reload.
  const [queue, setQueue] = useState(entries);

  if (!isReviewer) {
    return <p style={styles.message}>{t.reviewNotReviewer}</p>;
  }

  function removeEntry(id) {
    setQueue((current) => current.filter((entry) => entry.id !== id));
  }

  return (
    <section>
      <h1 style={styles.heading}>{t.reviewTitle}</h1>
      {queue.length === 0 ? (
        <p style={styles.message}>{t.reviewEmpty}</p>
      ) : null}
      <ul style={styles.list}>
        {queue.map((entry) => (
          <li key={entry.id}>
            <ReviewCard entry={entry} onReviewed={removeEntry} />
          </li>
        ))}
      </ul>
    </section>
  );
}
