"use client";

import AuthIcon from "./AuthIcon";
import { useLanguage } from "./LanguageProvider";
import styles from "./MyEntries.module.css";
import NoteButton from "./NoteButton";

// The top row of a /my-entries card: the status badge (Pending Review /
// Published / Returned) and, on a returned entry with a reviewer's note,
// a message button (NoteButton) that opens the note (MyEntryNoteDialog).
const STATUS_ICONS = { pending: "clock", published: "check", returned: "undo" };

export default function MyEntryBadges({ status, hasNote, onOpenNote }) {
  const { t } = useLanguage();

  // `status` is the real one from the database (app/my-entries/page.js).
  return (
    <div className={styles.badgeRow}>
      {STATUS_ICONS[status] ? (
        <span className={`${styles.badge} ${styles[`status_${status}`]}`}>
          <AuthIcon name={STATUS_ICONS[status]} className={styles.badgeIcon} />
          {t.myEntriesDashboard.status[status]}
        </span>
      ) : null}
      {hasNote ? <NoteButton onClick={onOpenNote} /> : null}
    </div>
  );
}
