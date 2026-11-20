"use client";

import Link from "next/link";

import styles from "./BackLink.module.css";
import { useLanguage } from "./LanguageProvider";

// "← Back to homepage" as a small pill (BackLink.module.css), the same on
// every page. A page may pass a className to change only its spacing.
// data-direction="back": going home plays no page-change animation.
export default function BackLink({ className }) {
  const { t } = useLanguage();
  const classes = className ? `${styles.back} ${className}` : styles.back;

  return (
    <Link href="/" className={classes} data-direction="back">
      {t.backToHome}
    </Link>
  );
}
