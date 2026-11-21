"use client";

import { useEffect, useRef } from "react";

import AuthIcon from "./AuthIcon";
import { useLanguage } from "./LanguageProvider";
import ReviewPreview from "./ReviewPreview";
import styles from "./ReviewWorkspace.module.css";

// The review panel opened by a card's Review button: the entry in full
// (ReviewPreview: gallery, story, tags, Publish / Return) in a native
// <dialog>, so Escape and focus handling come from the browser. It closes
// itself after review_entry confirms a decision (the board unmounts it).
export default function ReviewDialog({ entry, onClose, onReviewed }) {
  const { t } = useLanguage();
  const dialog = useRef(null);

  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  // A click on the dark backdrop (outside the panel) closes it.
  function closeOnBackdrop(event) {
    if (event.target === event.currentTarget) dialog.current?.close();
  }

  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      onClose={onClose}
      onClick={closeOnBackdrop}
    >
      <div className={styles.dialogPanel}>
        <button
          type="button"
          className={styles.dialogClose}
          aria-label={t.reviewWorkspace.close}
          onClick={() => dialog.current?.close()}
        >
          <AuthIcon name="close" />
        </button>
        <ReviewPreview entry={entry} onReviewed={onReviewed} />
      </div>
    </dialog>
  );
}
