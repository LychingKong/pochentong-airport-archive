"use client";

import Link from "next/link";

import { getLocalizedEntryField } from "../lib/translations";
import styles from "./HomeHero.module.css";
import { useLanguage } from "./LanguageProvider";

// The newest published entry as a small card on the hero; opens its page.
export default function HeroFeatured({ entry }) {
  const { language, t } = useLanguage();
  const title = getLocalizedEntryField(entry, "title", language);
  const contributor = getLocalizedEntryField(entry, "contributor", language);
  const image = entry.images?.[0] || "/placeholder-image.png";

  return (
    <Link href={`/entries/${entry.id}`} className={styles.featured}>
      <img src={image} alt="" className={styles.featuredImg} />
      <span className={styles.featuredText}>
        <span className={styles.featuredTitle}>{title || t.untitledEntry}</span>
        {contributor ? (
          <span className={styles.featuredMeta}>{contributor}</span>
        ) : null}
      </span>
    </Link>
  );
}
