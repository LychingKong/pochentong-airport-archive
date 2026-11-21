"use client";

import styles from "./ContributeForm.module.css";
import { useLanguage } from "./LanguageProvider";

// The navy band across the top of the boarding-pass form: a round PNH
// badge and "Memory Boarding Pass", then (past the tear line, over the
// stub) a small decorative barcode.
const BARS = [0, 4, 6, 11, 14, 16, 21, 25, 27, 32, 35, 39, 42, 44];

export default function PassBand() {
  const { t } = useLanguage();

  return (
    <div className={styles.band}>
      <div className={styles.bandMain}>
        <span className={styles.badge} aria-hidden="true">
          PNH
        </span>
        <p className={styles.bandTitle}>{t.contributePass.passTitle}</p>
      </div>
      {/* The stub's part of the band, past the tear line. */}
      <div className={styles.bandStub} aria-hidden="true">
        <svg className={styles.barcode} viewBox="0 0 46 20">
          {BARS.map((x) => (
            <rect key={x} x={x} width={x % 3 === 0 ? 2 : 1} height="20" />
          ))}
        </svg>
      </div>
    </div>
  );
}
