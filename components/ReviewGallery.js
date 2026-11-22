"use client";

import { useState } from "react";

import AuthIcon from "./AuthIcon";
import { useLanguage } from "./LanguageProvider";
import ReviewPhotoZoom from "./ReviewPhotoZoom";
import styles from "./ReviewWorkspace.module.css";

// The photos of the entry being reviewed: the selected one large (shown
// whole, not cropped; pressing it opens it full screen in ReviewPhotoZoom,
// like the entry page's EntryGallery), and a row of thumbnails when there
// are several.
export default function ReviewGallery({ images, title }) {
  const { t } = useLanguage();
  const list = (images || "")
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean);
  const photos = list.length > 0 ? list : ["/placeholder-image.png"];
  const [current, setCurrent] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className={styles.gallery}>
      <button
        type="button"
        className={styles.galleryMain}
        aria-label={t.exhibit.viewPhoto}
        onClick={() => setZoomed(true)}
      >
        <img src={photos[current]} alt={title} className={styles.galleryImg} />
        <span className={styles.zoomBadge} aria-hidden="true">
          <AuthIcon name="expand" />
        </span>
      </button>

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

      {zoomed ? (
        <ReviewPhotoZoom
          src={photos[current]}
          title={title}
          onClose={() => setZoomed(false)}
        />
      ) : null}
    </div>
  );
}
