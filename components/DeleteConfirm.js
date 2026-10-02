"use client";

import styles from "./EntryOwnerActions.module.css";
import { useLanguage } from "./LanguageProvider";

export default function DeleteConfirm({ onConfirm, onCancel, deleting }) {
  const { t } = useLanguage();

  return (
    <div className={styles.confirm} aria-live="polite">
      <p className={styles.question}>{t.deleteConfirm}</p>
      <button
        type="button"
        className={`${styles.button} ${styles.dangerSolid}`}
        onClick={onConfirm}
        disabled={deleting}
      >
        {deleting ? t.deleting : t.deleteYes}
      </button>
      <button
        type="button"
        className={styles.button}
        onClick={onCancel}
        disabled={deleting}
        autoFocus
      >
        {t.cancel}
      </button>
    </div>
  );
}
