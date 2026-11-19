"use client";

import styles from "./HomeHero.module.css";
import { useLanguage } from "./LanguageProvider";

// The number of published entries, drawn like a split-flap departure board.
// Built from the entries the homepage already loaded; no extra query.
export default function HeroFlapCount({ entries }) {
  const { t } = useLanguage();
  if (entries.length === 0) return null;

  const unit = entries.length === 1 ? t.entryCountSingular : t.entryCountPlural;
  const digits = Array.from(String(entries.length).padStart(2, "0"));

  return (
    <div
      className={styles.flapCount}
      role="img"
      aria-label={`${entries.length} ${unit}`}
    >
      <div className={styles.flaps} aria-hidden="true">
        {digits.map((digit, index) => (
          <span key={index} className={styles.flap}>
            {digit}
          </span>
        ))}
      </div>
      <span className={styles.flapLabel} aria-hidden="true">
        {unit}
      </span>
    </div>
  );
}
