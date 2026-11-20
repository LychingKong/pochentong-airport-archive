"use client";

import { useLanguage } from "./LanguageProvider";
import styles from "./NoResults.module.css";
import NoResultsIllustration from "./NoResultsIllustration";

// Shown by ArchiveGrid when a search matches nothing. The last line is a
// tip, not a button: the visitor edits the search box above to try again.
export default function NoResults() {
  const { t } = useLanguage();

  return (
    <div className={styles.wrap} role="status" data-reveal>
      <NoResultsIllustration className={styles.art} />
      <h3 className={styles.title}>{t.noResultsTitle}</h3>
      <p className={styles.hint}>{t.noResultsHint}</p>
      <p className={styles.tip}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        {t.noResultsAction}
      </p>
    </div>
  );
}
