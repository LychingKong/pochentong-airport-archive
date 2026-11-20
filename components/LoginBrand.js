"use client";

import Link from "next/link";

import collection from "../collection.config.js";
import { collectionText } from "../lib/translations";
import styles from "./Auth.module.css";
import { useLanguage } from "./LanguageProvider";
import LogoMark from "./LogoMark";

// The round PNH logo, the archive's name and the kicker as a tagline.
// Links home like the header's logo (data-direction="back": no animation).
export default function LoginBrand() {
  const { language, t } = useLanguage();
  const name = language === "km" ? collectionText.km.name : collection.name;

  return (
    <Link href="/" className={styles.brand} data-direction="back">
      <LogoMark className={styles.brandLogo} />
      <span className={styles.brandText}>
        <span className={styles.brandName}>{name}</span>
        <span className={styles.tagline}>{t.kicker}</span>
      </span>
    </Link>
  );
}
