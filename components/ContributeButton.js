"use client";

import Link from "next/link";

import { useLanguage } from "./LanguageProvider";
import styles from "./NavButton.module.css";

// The filled main action in the header.
export default function ContributeButton() {
  const { t } = useLanguage();

  return (
    <Link href="/contribute" className={`${styles.button} ${styles.primary}`}>
      {t.contributeButton}
    </Link>
  );
}
