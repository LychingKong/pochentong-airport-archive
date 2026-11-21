"use client";

import AuthIcon from "./AuthIcon";
import { useLanguage } from "./LanguageProvider";
import styles from "./NoteButton.module.css";

// The small yellow message button with a dot, beside the "Returned" badge
// on /my-entries and /review cards. It opens the reviewer's note in a
// popup (MyEntryNoteDialog). The words are in the tooltip and for screen
// readers.
export default function NoteButton({ onClick }) {
  const { t } = useLanguage();
  const label = t.myEntriesDashboard.noteHint;

  return (
    <button
      type="button"
      className={styles.button}
      title={label}
      onClick={onClick}
    >
      <AuthIcon name="comment" className={styles.icon} />
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.hidden}>{label}</span>
    </button>
  );
}
