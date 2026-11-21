"use client";

import AuthIcon from "./AuthIcon";
import EntryNoteNextStep from "./EntryNoteNextStep";
import styles from "./EntryReviewNote.module.css";
import { useLanguage } from "./LanguageProvider";

// The reviewer's note on a returned entry, at the top of its page, styled
// like the page's museum label (EntryPlacard): a white card with a colored
// top edge, a small uppercase label, then the note. The entry page renders
// this only for the entry's owner (app/entries/[id]).
export default function EntryReviewNote({ id, note }) {
  const { t } = useLanguage();
  const copy = t.entryReviewNote;

  return (
    <aside
      className={styles.panel}
      aria-labelledby="review-note-title"
      data-reveal
    >
      <header className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <AuthIcon name="undo" />
        </span>
        <div>
          <p className={styles.kicker}>{copy.kicker}</p>
          <h2 id="review-note-title" className={styles.title}>
            {copy.title}
          </h2>
        </div>
      </header>

      <p className={styles.label}>{copy.label}</p>
      {/* The memo, as in the /my-entries popup. As the reviewer wrote it,
          Khmer included; only runs of empty lines are shown as one. */}
      <figure className={styles.memo}>
        <blockquote className={styles.note}>
          {note.replace(/\n\s*\n\s*\n+/g, "\n\n")}
        </blockquote>
        <figcaption className={styles.signature}>— {copy.signature}</figcaption>
      </figure>
      <EntryNoteNextStep id={id} />

      <footer className={styles.foot}>
        <p className={styles.privacy}>
          <AuthIcon name="lock" className={styles.lock} />
          {copy.privacy}
        </p>
      </footer>
    </aside>
  );
}
