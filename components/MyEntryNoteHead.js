"use client";

import AuthIcon from "./AuthIcon";
import { useLanguage } from "./LanguageProvider";
import styles from "./MyEntryNoteDialog.module.css";

// The top of the reviewer's-note popup (MyEntryNoteDialog), laid out like
// the note panel on the entry page (EntryReviewNote): a yellow icon,
// "Returned for changes", the heading and which entry the note is about,
// then the close button.
export default function MyEntryNoteHead({ title, onClose }) {
  const { t } = useLanguage();
  const copy = t.entryReviewNote;

  return (
    <header className={styles.head}>
      <span className={styles.icon} aria-hidden="true">
        <AuthIcon name="undo" />
      </span>
      <div className={styles.heading}>
        <p className={styles.kicker}>{copy.kicker}</p>
        <h2 id="note-dialog-title" className={styles.title}>
          {copy.title}
        </h2>
        <p className={styles.entry}>
          <AuthIcon name="document" className={styles.entryIcon} />
          <span className={styles.entryText}>{title}</span>
        </p>
      </div>
      <button
        type="button"
        className={styles.close}
        aria-label={t.reviewWorkspace.close}
        onClick={onClose}
      >
        <AuthIcon name="close" />
      </button>
    </header>
  );
}
