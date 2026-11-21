"use client";

import Link from "next/link";

import AuthIcon from "./AuthIcon";
import { useLanguage } from "./LanguageProvider";
import styles from "./ReviewEmpty.module.css";
import ReviewEmptyArt from "./ReviewEmptyArt";
import ReviewEmptyBoard from "./ReviewEmptyBoard";

// What a reviewer sees on /review when no entries are waiting: on the left
// an airport scene with the airliner climbing away and a PNH "all clear"
// stamp; on the right the headline, a short note, a departures-board status
// strip and a way back to the archive. Shown by ReviewQueue only for
// reviewers, as the whole page content, so its headline is the page's <h1>.
export default function ReviewEmpty() {
  const { t } = useLanguage();
  const copy = t.reviewAllCaughtUp;

  return (
    <div className={styles.empty} role="status" data-reveal>
      <ReviewEmptyArt />

      <div className={styles.text}>
        {/* In English the "subtitle" class (theme.css) makes this handwritten. */}
        <p className={`subtitle ${styles.kicker}`}>{copy.kicker}</p>
        <h1 className={styles.title}>
          <span className={styles.highlight}>{copy.title}</span>
        </h1>
        <p className={styles.message}>{copy.text}</p>

        <ReviewEmptyBoard />

        <Link href="/" className={styles.button}>
          <AuthIcon name="layers" />
          {copy.button}
        </Link>
      </div>
    </div>
  );
}
