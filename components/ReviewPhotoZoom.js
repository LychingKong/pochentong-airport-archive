"use client";

import { useEffect, useRef } from "react";

import AuthIcon from "./AuthIcon";
import { useLanguage } from "./LanguageProvider";
import styles from "./ReviewWorkspace.module.css";

// The full-size view of one review photo, opened by pressing the photo in
// ReviewGallery. Works like the entry page's viewer (EntryGallery): a
// native <dialog> stacked above the review panel, so Escape closes just
// this viewer; a click outside the photo or the close button closes it too.
export default function ReviewPhotoZoom({ src, title, onClose }) {
  const { t } = useLanguage();
  const dialog = useRef(null);

  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  function closeOnBackdrop(event) {
    if (event.target === event.currentTarget) dialog.current?.close();
  }

  return (
    <dialog
      ref={dialog}
      className={styles.zoom}
      aria-label={title}
      onClose={(event) => {
        // React passes "close" up to the review panel's own <dialog>
        // onClose; stop it here so closing the photo keeps the panel open.
        event.stopPropagation();
        onClose();
      }}
      onClick={closeOnBackdrop}
    >
      <img src={src} alt={title} className={styles.zoomImg} />
      <button
        type="button"
        className={styles.zoomClose}
        aria-label={t.exhibit.closePhoto}
        onClick={() => dialog.current?.close()}
      >
        <AuthIcon name="close" />
      </button>
    </dialog>
  );
}
