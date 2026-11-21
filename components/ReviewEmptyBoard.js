"use client";

import { useLanguage } from "./LanguageProvider";
import styles from "./ReviewEmpty.module.css";

// A small departures-board strip in the reviewer's empty /review state:
// "Pending" with split-flap tiles reading 0 0 (styled like the homepage's
// HeroFlapCount), and "Status" with a softly pulsing green light and
// "All clear". It only ever shows when nothing is pending.
export default function ReviewEmptyBoard() {
  const { t } = useLanguage();
  const copy = t.reviewAllCaughtUp;

  return (
    <div className={styles.board}>
      <span className={styles.boardCell}>
        <span className={styles.boardLabel}>{copy.pendingLabel}</span>
        <span className={styles.flaps} aria-label="0">
          <span className={styles.flap} aria-hidden="true">
            0
          </span>
          <span className={styles.flap} aria-hidden="true">
            0
          </span>
        </span>
      </span>

      <span className={styles.boardDivider} aria-hidden="true" />

      <span className={styles.boardCell}>
        <span className={styles.boardLabel}>{copy.statusLabel}</span>
        <span className={styles.status}>
          <span className={styles.statusLight} aria-hidden="true" />
          {copy.statusValue}
        </span>
      </span>
    </div>
  );
}
