"use client";

import Link from "next/link";

import { useLanguage } from "./LanguageProvider";
import styles from "./NavButton.module.css";

// Outlined sibling of ContributeButton: Contribute is the filled main action,
// this one is secondary.
export default function MyEntriesButton() {
  const { t } = useLanguage();

  return (
    <Link href="/my-entries" className={`${styles.button} ${styles.secondary}`}>
      {t.myEntries}
    </Link>
  );
}
