"use client";

import collection from "../collection.config.js";
import { collectionText } from "../lib/translations";
import { useLanguage } from "./LanguageProvider";
import PlaneIcon from "./PlaneIcon";
import styles from "./ReviewRestricted.module.css";

// The navy strip across the top of the /review boarding pass: a round PNH
// badge and the archive's name on the left, "Review Pass" on the right.
export default function ReviewPassHeader() {
  const { language, t } = useLanguage();
  const name = language === "km" ? collectionText.km.name : collection.name;

  return (
    <header className={styles.band}>
      <span className={styles.brand}>
        <span className={styles.badge} aria-hidden="true">
          <PlaneIcon className={styles.badgePlane} />
          <span className={styles.badgeCode}>PNH</span>
        </span>
        <span className={styles.brandName}>{name}</span>
      </span>
      <span className={styles.passTitle}>{t.reviewRestricted.passTitle}</span>
    </header>
  );
}
