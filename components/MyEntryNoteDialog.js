"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

import AuthIcon from "./AuthIcon";
import EntryNoteNextStep from "./EntryNoteNextStep";
import { useLanguage } from "./LanguageProvider";
import styles from "./MyEntryNoteDialog.module.css";
import MyEntryNoteHead from "./MyEntryNoteHead";

// The popup opened by the message button on a returned entry's card on
// /my-entries, styled like the note panel on the entry page
// (EntryReviewNote): a header (MyEntryNoteHead), the reviewer's note as a
// memo, then buttons to close or open the entry. A native <dialog>, so Escape and focus handling come from the
// browser, like ReviewDialog.
export default function MyEntryNoteDialog({
  entry,
  title,
  onClose,
  forReviewer = false,
}) {
  const { t } = useLanguage();
  const copy = t.entryReviewNote;
  const dialog = useRef(null);
  const panel = useRef(null);

  useEffect(() => {
    dialog.current?.showModal();
    // Start focus on the panel, not the close button (no ring on open).
    panel.current?.focus();
  }, []);

  // A click on the dark backdrop (outside the panel) closes it.
  function closeOnBackdrop(event) {
    if (event.target === event.currentTarget) dialog.current?.close();
  }
  const close = () => dialog.current?.close();

  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      aria-labelledby="note-dialog-title"
      onClose={onClose}
      onClick={closeOnBackdrop}
    >
      <div ref={panel} tabIndex={-1} className={styles.panel}>
        <MyEntryNoteHead title={title} onClose={close} />

        <p className={styles.label}>{copy.label}</p>
        {/* As the reviewer wrote it, Khmer included; only runs of empty
            lines are shown as one, so the memo has no big gaps. */}
        <figure className={styles.memo}>
          <blockquote className={styles.note}>
            {entry.review_note.replace(/\n\s*\n\s*\n+/g, "\n\n")}
          </blockquote>
          <figcaption className={styles.signature}>
            — {copy.signature}
          </figcaption>
        </figure>
        {forReviewer ? null : <EntryNoteNextStep id={entry.id} />}

        <p className={styles.privacy}>
          <AuthIcon name="lock" className={styles.lock} />
          {forReviewer ? copy.privacyReviewer : copy.privacy}
        </p>
        <div className={styles.actions}>
          <button type="button" className={styles.ghost} onClick={close}>
            {t.reviewWorkspace.close}
          </button>
          <Link href={`/entries/${entry.id}`} className={styles.open}>
            {t.myEntriesDashboard.openEntry}
            <AuthIcon name="arrowRight" className={styles.openIcon} />
          </Link>
        </div>
      </div>
    </dialog>
  );
}
