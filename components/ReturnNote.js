"use client";

import { useLanguage } from "./LanguageProvider";
import styles from "./ReviewCard.module.css";

// Opens under the card when a reviewer presses Return, so the note box only
// appears when a return needs a reason.
export default function ReturnNote({
  note,
  onNoteChange,
  onConfirm,
  onCancel,
  busy,
}) {
  const { t } = useLanguage();

  return (
    <div>
      <textarea
        value={note}
        onChange={(event) => onNoteChange(event.target.value)}
        disabled={busy}
        placeholder={t.reviewNotePlaceholder}
        rows={2}
        className={styles.note}
      />
      <div className={styles.actions}>
        <button
          type="button"
          disabled={busy}
          className={styles.button}
          onClick={onConfirm}
        >
          {t.returnEntry}
        </button>
        <button
          type="button"
          disabled={busy}
          className={styles.button}
          onClick={onCancel}
        >
          {t.cancel}
        </button>
      </div>
    </div>
  );
}
