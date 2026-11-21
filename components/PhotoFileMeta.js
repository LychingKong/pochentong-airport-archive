"use client";

import AuthIcon from "./AuthIcon";
import styles from "./ContributeForm.module.css";
import { useLanguage } from "./LanguageProvider";

// The row under a chosen photo: its file name and size, and Remove.
export default function PhotoFileMeta({ file, onRemove, disabled }) {
  const { t } = useLanguage();

  return (
    <div className={styles.fileMeta}>
      <span className={styles.fileText}>
        <span className={styles.fileName}>{file.name}</span>
        <span className={styles.fileSize}>
          {(file.size / 1024 / 1024).toFixed(1)} MB
        </span>
      </span>
      <button
        type="button"
        onClick={onRemove}
        className={styles.textButton}
        disabled={disabled}
      >
        <AuthIcon name="close" className={styles.removeIcon} />
        {t.removePhoto}
      </button>
    </div>
  );
}
