"use client";

import { useState } from "react";

import BackLink from "./BackLink";
import { useLanguage } from "./LanguageProvider";
import ReviewCard from "./ReviewCard";
import ReviewEmpty from "./ReviewEmpty";

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

  // Nothing waiting (or the last one was just reviewed): only the
  // "All Caught Up!" panel, whose headline is then the page's heading.
  if (queue.length === 0) return <ReviewEmpty />;

  return (
    <section>
      <BackLink />
      <h1 style={styles.heading} data-reveal>
        {t.reviewTitle}
      </h1>
      <ul style={styles.list}>
        {queue.map((entry) => (
          <li key={entry.id} data-reveal>
            <ReviewCard entry={entry} onReviewed={removeEntry} />
          </li>
        ))}
      </ul>
    </section>
  );
}
