"use client";

import Link from "next/link";

import CollagePhoto from "./CollagePhoto";
import styles from "./ContributeCollage.module.css";
import { useLanguage } from "./LanguageProvider";

// One tilted print in the /contribute collage. With a `photo` (a published
// entry) it shows the real picture with the entry's title written in the
// bottom margin, and opens that entry. Without one it shows a drawn scene
// (`fallbackMood`, see CollagePhoto) so the collage never has a hole.
export default function CollagePrint({ slot, photo, fallbackMood }) {
  const { language } = useLanguage();
  const printClass = `${styles.print} ${styles[slot]}`;
  const tape =
    slot === "main" ? (
      <span className={styles.tape} aria-hidden="true" />
    ) : null;

  if (!photo) {
    return (
      <div className={printClass} aria-hidden="true">
        {tape}
        <CollagePhoto mood={fallbackMood} />
      </div>
    );
  }

  const title =
    language === "km" && photo.titleKm ? photo.titleKm : photo.title;

  // The caption names the link, so the photo itself needs no alt text.
  return (
    <Link
      href={`/entries/${photo.id}`}
      className={`${printClass} ${styles.linked}`}
    >
      {tape}
      <span className={styles.realPhoto}>
        <img
          src={photo.image}
          alt=""
          loading="lazy"
          decoding="async"
          className={styles.realImg}
        />
      </span>
      <span className={styles.caption}>{title}</span>
    </Link>
  );
}
