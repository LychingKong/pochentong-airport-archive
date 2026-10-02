"use client";

import { useEffect, useRef, useState } from "react";

import { formatFieldError } from "../lib/translations";
import styles from "./ContributeForm.module.css";
import { useLanguage } from "./LanguageProvider";
import PhotoFileMeta from "./PhotoFileMeta";
import UploadIcon from "./UploadIcon";

// `currentUrl` is the entry's existing photo when editing; it shows until
// a new file is picked.
export default function ImageField({
  currentUrl,
  file,
  onChange,
  error,
  disabled,
}) {
  const { t } = useLanguage();
  const inputRef = useRef(null);
  const [filePreview, setFilePreview] = useState(null);
  const previewUrl = filePreview || currentUrl;

  // Show the chosen photo, and free its memory when it changes or the form closes.
  useEffect(() => {
    if (!file) {
      setFilePreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setFilePreview(url);
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
        <PhotoFileMeta file={file} onRemove={removePhoto} disabled={disabled} />
      ) : null}
      {!file && currentUrl ? (
        <p className={styles.note}>{t.keepPhotoNote}</p>
      ) : null}
      {error ? (
        <p id="images-error" className={styles.error}>
          {formatFieldError(t, error)}
        </p>
      ) : null}
    </div>
  );
}
