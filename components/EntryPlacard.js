"use client";

import { getLocalizedEntryField } from "../lib/translations";
import styles from "./EntryExhibit.module.css";
import { useLanguage } from "./LanguageProvider";

// The museum label beside the story: who shared the memory, when it was
// added, and its tags. Empty fields are left out rather than shown blank.
export default function EntryPlacard({ entry }) {
  const { language, t } = useLanguage();

  const contributor = getLocalizedEntryField(entry, "contributor", language);
  const date = getLocalizedEntryField(entry, "date", language);
  const tags = getLocalizedEntryField(entry, "tags", language);

  return (
    <aside className={styles.placard} data-reveal>
      {/* PNH: Pochentong's airport code, as on the homepage. */}
      <p className={styles.code}>PNH</p>
      <dl className={styles.facts}>
        {contributor ? (
          <div className={styles.fact}>
            <dt className={styles.label}>{t.sections.contributor.title}</dt>
            <dd className={styles.value}>{contributor}</dd>
          </div>
        ) : null}
        {date ? (
          <div className={styles.fact}>
            <dt className={styles.label}>{t.exhibit.dateLabel}</dt>
            <dd className={styles.value}>{date}</dd>
          </div>
        ) : null}
      </dl>
      {tags && tags.length > 0 ? (
        <div className={styles.tagBlock}>
          <p className={styles.label}>{t.sections.tags.title}</p>
          <ul className={styles.tags}>
            {tags.map((tag, index) => (
              <li className={styles.tag} key={index}>
                {tag}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </aside>
  );
}
