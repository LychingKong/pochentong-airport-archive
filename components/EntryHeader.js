"use client";

import { getLocalizedEntryField } from "../lib/translations";
import styles from "./EntryExhibit.module.css";
import { useLanguage } from "./LanguageProvider";

// The exhibit's title block: kicker, title, and the short description as an
// introduction. When an entry has no story, EntryDetail shows the
// description as the story instead, so it is not repeated here.
export default function EntryHeader({ entry }) {
  const { language, t } = useLanguage();

  const title = getLocalizedEntryField(entry, "title", language);
  const story = getLocalizedEntryField(entry, "story", language);
  const description = getLocalizedEntryField(entry, "description", language);

  return (
    <header className={styles.intro}>
      {/* In English the "subtitle" class (theme.css) makes this handwritten. */}
      <p className={`subtitle ${styles.kicker}`}>{t.kicker}</p>
      <h1 className={styles.title}>{title || t.untitledEntry}</h1>
      {story && description ? (
        <p className={styles.standfirst}>{description}</p>
      ) : null}
    </header>
  );
}
