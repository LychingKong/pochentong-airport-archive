"use client";

import Link from "next/link";

import collection from "../collection.config.js";
import { collectionText } from "../lib/translations";
import styles from "./Header.module.css";
import { useLanguage } from "./LanguageProvider";
import PlaneIcon from "./PlaneIcon";

// The archive's name with a small plane mark; links back to the homepage.
export default function BrandLink() {
  const { language } = useLanguage();
  const name = language === "km" ? collectionText.km.name : collection.name;

  return (
    <Link href="/" className={styles.brand} data-direction="back">
      <span className={styles.brandMark} aria-hidden="true">
        <PlaneIcon className={styles.brandIcon} />
      </span>
      <span className={styles.brandName}>{name}</span>
    </Link>
  );
}
