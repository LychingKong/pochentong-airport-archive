"use client";

import styles from "./HomeHero.module.css";
import { useLanguage } from "./LanguageProvider";

// A number drawn like a split-flap departure board. By default it counts
// `entries` (the published entries the homepage already loaded; no extra
// query) and says "entry"/"entries". Other pages may pass `count` and
// `label` instead (the /review board shows how many are waiting).
export default function HeroFlapCount({ entries = [], count, label }) {
  const { t } = useLanguage();
  const total = count ?? entries.length;
  if (total === 0) return null;

  const unit =
    label ?? (total === 1 ? t.entryCountSingular : t.entryCountPlural);
  const digits = Array.from(String(total).padStart(2, "0"));

  return (
    <div
      className={styles.flapCount}
      role="img"
      aria-label={`${total} ${unit}`}
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
