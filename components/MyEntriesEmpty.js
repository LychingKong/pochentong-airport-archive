"use client";

import Link from "next/link";

import AuthIcon from "./AuthIcon";
import { useLanguage } from "./LanguageProvider";
import styles from "./MyEntriesEmpty.module.css";
import SuitcaseIllustration from "./SuitcaseIllustration";

// What /my-entries shows when the signed-in user has no entries yet: an
// invitation to share a first memory. MyEntriesList shows the normal list
// as soon as there is at least one entry.
export default function MyEntriesEmpty() {
  const { t } = useLanguage();
  const copy = t.myEntriesEmpty;

  return (
    <section className={styles.empty}>
      <div className={styles.artWrap} data-reveal>
        <SuitcaseIllustration />
      </div>

      <div className={styles.text} data-reveal>
        {/* In English the "subtitle" class (theme.css) makes this handwritten. */}
        <p className={`subtitle ${styles.kicker}`}>{t.myEntries}</p>
        <h1 className={styles.title}>
          {copy.titleLead}{" "}
          <span className={styles.highlight}>{copy.titleHighlight}</span>
        </h1>
        <p className={styles.message}>{copy.text}</p>

        <div className={styles.actions}>
          <Link href="/contribute" className={styles.primary}>
            <AuthIcon name="plus" />
            {copy.primary}
          </Link>
          <Link href="/" className={styles.secondary}>
            <AuthIcon name="layers" />
            {copy.secondary}
          </Link>
        </div>

        <p className={styles.note}>
          <AuthIcon name="clock" className={styles.noteIcon} />
          {copy.note}
        </p>
      </div>
    </section>
  );
}
