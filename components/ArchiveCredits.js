"use client";

import styles from "./ArchiveCredits.module.css";
import { useLanguage } from "./LanguageProvider";

// Line icons for the two tiles: one person (curator), a group (source).
const ICONS = {
  curator: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  source: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2 20a7 7 0 0 1 14 0" />
      <path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 4 6" />
    </>
  ),
};

// Who curates the archive and where its stories come from, shown as two
// tiles under the homepage hero. Values come from collection.config.js
// (or their Khmer versions), passed in by app/page.js.
export default function ArchiveCredits({ curator, source }) {
  const { t } = useLanguage();
  const items = [
    { key: "curator", label: t.curatedByLabel, value: curator },
    { key: "source", label: t.sourceLabel, value: source },
  ];

  return (
    <dl className={styles.credits}>
      {items.map(({ key, label, value }) => (
        <div key={key} className={`${styles.tile} ${styles[key]}`} data-reveal>
          <span className={styles.icon} aria-hidden="true">
            <svg viewBox="0 0 24 24">{ICONS[key]}</svg>
          </span>
          <div className={styles.text}>
            <dt className={styles.label}>{label}</dt>
            <dd className={styles.value}>{value}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
