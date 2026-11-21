"use client";

import { useState } from "react";

import { useLanguage } from "./LanguageProvider";
import styles from "./ReviewWorkspace.module.css";

// The photos of the entry being reviewed: the selected one large (shown
// whole, not cropped), and a row of thumbnails when there are several.
export default function ReviewGallery({ images, title }) {
  const { t } = useLanguage();
  const list = (images || "")
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean);
  const photos = list.length > 0 ? list : ["/placeholder-image.png"];
  const [current, setCurrent] = useState(0);

  return (
    <div className={styles.gallery}>
      <div className={styles.galleryMain}>
        <img src={photos[current]} alt={title} className={styles.galleryImg} />
      </div>

      {photos.length > 1 ? (
        <div className={styles.galleryThumbs}>
          {photos.map((url, index) => (
            <button
              key={url}
              type="button"
              className={styles.galleryThumb}
              aria-pressed={index === current}
              aria-label={t.reviewWorkspace.photo.replace("{n}", index + 1)}
              onClick={() => setCurrent(index)}
            >
              <img src={url} alt="" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
