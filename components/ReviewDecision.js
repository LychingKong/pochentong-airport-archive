"use client";

import { useState } from "react";

import { useReviewDecision } from "../lib/useReviewDecision";
import AuthIcon from "./AuthIcon";
import { useLanguage } from "./LanguageProvider";
import ReturnNote from "./ReturnNote";
import styles from "./ReviewWorkspace.module.css";

// The Publish / Return bar under the entry being reviewed. Return first
// reveals the return-note field (ReturnNote). Saving the decision is in
// lib/useReviewDecision.js; the entry only leaves the queue when
// review_entry confirms it.
export default function ReviewDecision({
  entryId,
  onSavingChange,
  onReviewed,
}) {
  const { t } = useLanguage();
  const copy = t.reviewWorkspace;
  const { busy, failed, decide } = useReviewDecision(entryId, {
    onSavingChange,
    onReviewed,
  });
  const [note, setNote] = useState("");
  const [returning, setReturning] = useState(false);

  return (
    <div className={styles.decision}>
      <p className={styles.sectionLabel}>{copy.decisionLabel}</p>
      {returning ? (
        <ReturnNote
          note={note}
          onNoteChange={setNote}
          onConfirm={() => decide("returned", note.trim() || null)}
          onCancel={() => setReturning(false)}
          busy={busy !== null}
        />
      ) : (
        <div className={styles.decisionButtons}>
          <button
            type="button"
            disabled={busy !== null}
            className={styles.publish}
            onClick={() => decide("published")}
          >
            <AuthIcon name="check" />
            {busy === "published" ? copy.publishing : t.publishEntry}
          </button>
          <button
            type="button"
            disabled={busy !== null}
            className={styles.return}
            onClick={() => setReturning(true)}
          >
            <AuthIcon name="undo" />
            {t.returnEntry}
          </button>
        </div>
      )}
      {busy === "returned" ? (
        <p className={styles.savingText} role="status">
          {copy.returning}
        </p>
      ) : null}
      {failed ? (
        <p role="alert" className={styles.error}>
          {t.reviewFailed}
        </p>
      ) : null}
    </div>
  );
}
