"use client";

import Link from "next/link";

import collection from "../collection.config.js";
import { collectionText } from "../lib/translations";
import styles from "./Header.module.css";
import { useLanguage } from "./LanguageProvider";
import LogoMark from "./LogoMark";

// The PNH logo and the archive's name; links back to the homepage.
export default function BrandLink() {
  const { language } = useLanguage();
  const name = language === "km" ? collectionText.km.name : collection.name;

  return (
    <Link href="/" className={styles.brand} data-direction="back">
      <LogoMark className={styles.logo} />
      <span className={styles.brandName}>{name}</span>
    </Link>
  );
}
