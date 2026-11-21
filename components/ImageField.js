"use client";

import { useRef, useState } from "react";

import { formatFieldError } from "../lib/translations";
import { usePhotoPreview } from "../lib/usePhotoPreview";
import styles from "./ContributeForm.module.css";
import { useLanguage } from "./LanguageProvider";
import PhotoDropPrompt from "./PhotoDropPrompt";
import PhotoFileMeta from "./PhotoFileMeta";

// The photo slot on the boarding pass's stub: the slot is the file input
// itself (click or drop a file anywhere on it) and turns orange while a
// file is dragged over it; a chosen photo fills it, with a row below to
// remove it. `currentUrl` is the entry's existing photo when editing; it
// shows until a new file is picked.
export default function ImageField({
  currentUrl,
  file,
  onChange,
  error,
  disabled,
}) {
  const { t } = useLanguage();
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const previewUrl = usePhotoPreview(file) || currentUrl;

  function removePhoto() {
    inputRef.current.value = "";
    onChange(null);
  }

  const zoneClass = [
    styles.dropzone,
    previewUrl ? styles.dropzoneFilled : "",
    error ? styles.dropzoneError : "",
    dragging ? styles.dropzoneDragging : "",
  ].join(" ");

  return (
    <div className={styles.field}>
      <div
        className={zoneClass}
        onDragEnter={() => setDragging(true)}
        onDragLeave={() => setDragging(false)}
        onDrop={() => setDragging(false)}
      >
        {previewUrl ? (
          <>
            <img src={previewUrl} alt="" className={styles.previewImg} />
            <span className={styles.changePill}>{t.changePhoto}</span>
          </>
        ) : (
          <PhotoDropPrompt dragging={dragging} />
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
