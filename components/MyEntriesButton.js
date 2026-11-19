"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useLanguage } from "./LanguageProvider";
import styles from "./NavButton.module.css";

// A quiet text link in the header; highlighted while on My Entries.
export default function MyEntriesButton() {
  const { t } = useLanguage();
  const current = usePathname() === "/my-entries";

  return (
    <Link
      href="/my-entries"
      className={`${styles.button} ${styles.ghost}`}
      aria-current={current ? "page" : undefined}
    >
      {t.myEntries}
    </Link>
  );
}
