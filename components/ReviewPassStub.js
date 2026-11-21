"use client";

import { useLanguage } from "./LanguageProvider";
import styles from "./ReviewRestricted.module.css";

// The tear-off stub of the /review boarding pass, behind a dashed
// perforation: the gate, who may pass, a red ACCESS DENIED rubber stamp
// and a barcode. The stamp and barcode are decoration; the words around
// them say the same thing in plain text.
export default function ReviewPassStub() {
  const { t } = useLanguage();
  const copy = t.reviewRestricted;

  return (
    <aside className={styles.stub}>
      <div className={styles.stubFields}>
        <span className={styles.stubField}>
          <span className={styles.label}>{copy.gateLabel}</span>
          <span className={styles.gate}>R1</span>
        </span>
        <span className={styles.stubField}>
          <span className={styles.label}>{copy.accessLabel}</span>
          <span className={styles.access}>{copy.accessValue}</span>
        </span>
      </div>

      <div className={styles.stamp}>
        <span className={styles.stampText}>{copy.stamp}</span>
      </div>

      <div className={styles.ticketCode} aria-hidden="true">
        <span className={styles.barcode} />
        <span className={styles.ticketNumber}>PNH · R1 · 0001</span>
      </div>
    </aside>
  );
}
