"use client";

import { useEffect, useRef, useState } from "react";

import { formatFieldError } from "../lib/translations";
import styles from "./ContributeForm.module.css";
import { useLanguage } from "./LanguageProvider";
import UploadIcon from "./UploadIcon";

export default function ImageField({ file, onChange, error, disabled }) {
  const { t } = useLanguage();
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Show the chosen photo, and free its memory when it changes or the form closes.
  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function removePhoto() {
    inputRef.current.value = "";
    onChange(null);
  }

  const zoneClass = [
    styles.dropzone,
    previewUrl ? styles.dropzoneFilled : "",
    error ? styles.dropzoneError : "",
  ].join(" ");

  return (
    <div className={styles.field}>
      <div className={zoneClass}>
        {previewUrl ? (
          <>
            <img src={previewUrl} alt="" className={styles.previewImg} />
            <span className={styles.changePill}>{t.changePhoto}</span>
          </>
        ) : (
          <div className={styles.dropPrompt}>
            <UploadIcon className={styles.dropIcon} />
            <span className={styles.dropTitle}>{t.dropTitle}</span>
            <span className={styles.dropHint}>{t.dropHint}</span>
          </div>
        )}
        <input
          ref={inputRef}
          id="images"
          name="images"
          type="file"
          accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          className={styles.fileInput}
          disabled={disabled}
          aria-labelledby="images-heading"
          aria-describedby={error ? "images-hint images-error" : "images-hint"}
          aria-invalid={error ? "true" : "false"}
        />
      </div>
      {file ? (
        <div className={styles.fileMeta}>
          <span className={styles.fileName}>{file.name}</span>
          <span className={styles.fileSize}>
            {(file.size / 1024 / 1024).toFixed(1)} MB
          </span>
          <button
            type="button"
            onClick={removePhoto}
            className={styles.textButton}
            disabled={disabled}
          >
            {t.removePhoto}
          </button>
        </div>
      ) : null}
      {error ? (
        <p id="images-error" className={styles.error}>
          {formatFieldError(t, error)}
        </p>
      ) : null}
    </div>
  );
}
