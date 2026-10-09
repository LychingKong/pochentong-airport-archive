"use client";

import Link from "next/link";

import styles from "./ContributeForm.module.css";
import { useLanguage } from "./LanguageProvider";

export default function LoginPrompt() {
  const { t } = useLanguage();

  return (
    <div className={styles.pageHead}>
      <p className={`subtitle ${styles.kicker}`}>{t.contributeKicker}</p>
      <h1 className={styles.title}>{t.contributeTitle}</h1>
      <p className={styles.intro}>{t.contributeLoginPrompt}</p>
      <p>
        <Link href="/login" className={styles.button}>
          {t.contributeLoginLink}
        </Link>
      </p>
    </div>
  );
}
