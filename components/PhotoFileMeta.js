"use client";

import styles from "./ContributeForm.module.css";
import { useLanguage } from "./LanguageProvider";

export default function PhotoFileMeta({ file, onRemove, disabled }) {
  const { t } = useLanguage();

  return (
    <div className={styles.fileMeta}>
      <span className={styles.fileName}>{file.name}</span>
      <span className={styles.fileSize}>
        {(file.size / 1024 / 1024).toFixed(1)} MB
      </span>
      <button
        type="button"
        onClick={onRemove}
        className={styles.textButton}
        disabled={disabled}
      >
        {t.removePhoto}
      </button>
    </div>
  );
}
