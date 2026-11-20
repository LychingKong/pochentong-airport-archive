"use client";

import { useRef } from "react";

import styles from "./EntryExhibit.module.css";
import { useLanguage } from "./LanguageProvider";

// Shows one photo: the first image in the list (entries keep a single
// storage URL). The photo is shown whole, never cropped, over a blurred copy
// of itself. Pressing it opens the full photo in a <dialog>, which the
// browser closes on Escape; a click outside the photo closes it too.
export default function EntryGallery({ images, title }) {
  const { t } = useLanguage();
  const viewer = useRef(null);
  const list =
    images && images.length > 0 ? images : ["/placeholder-image.png"];
  const [hero] = list;
  const alt = title || "Archive entry image";

  function closeOnBackdrop(event) {
    if (event.target === event.currentTarget) event.currentTarget.close();
  }

  return (
    <figure className={styles.gallery} data-reveal>
      <button
        type="button"
        className={styles.frame}
        style={{ "--photo": `url(${JSON.stringify(hero)})` }}
        onClick={() => viewer.current?.showModal()}
        aria-label={t.exhibit.viewPhoto}
      >
        <img
          src={hero}
          alt={alt}
          fetchPriority="high"
          decoding="async"
          className={styles.photo}
        />
        <span className={styles.zoom} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <dialog ref={viewer} className={styles.viewer} onClick={closeOnBackdrop}>
        <img src={hero} alt={alt} className={styles.viewerImg} />
        <form method="dialog">
          <button className={styles.close} aria-label={t.exhibit.closePhoto}>
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </form>
      </dialog>
    </figure>
  );
}
