"use client";

import AuthIcon from "./AuthIcon";
import { useLanguage } from "./LanguageProvider";
import styles from "./MyEntries.module.css";
import MyEntriesHeaderArt from "./MyEntriesHeaderArt";

// The heading of /my-entries: an orange document tile, "My Entries" with
// an orange swoosh under the last word, a one-line subtitle, and a faint
// drawing of the old terminal on the right.
export default function MyEntriesOverview() {
  const { t } = useLanguage();
  // "My Entries" → "My" + "Entries", so the swoosh goes under the last word.
  // Khmer has no spaces between words, so there the whole title is used.
  const words = t.myEntries.split(" ");
  const last = words.length > 1 ? words.pop() : null;

  return (
    <header className={styles.head} data-reveal>
      <MyEntriesHeaderArt />

      <span className={styles.tile} aria-hidden="true">
        <AuthIcon name="document" />
      </span>
      <div className={styles.headText}>
        <h1 className={styles.title}>
          {last ? `${words.join(" ")} ` : null}
          <span className={styles.highlight}>{last ?? t.myEntries}</span>
        </h1>
        <p className={styles.subtitle}>{t.myEntriesDashboard.subtitle}</p>
      </div>
    </header>
  );
}
