"use client";

import { useEffect } from "react";
import Link from "next/link";

import AuthIcon from "./AuthIcon";
import styles from "./ContributeSuccess.module.css";
import ContributeSuccessArt from "./ContributeSuccessArt";
import { useLanguage } from "./LanguageProvider";

// Shown on /contribute after the server confirms a new entry was saved
// (ContributeForm, when form.submitted is true): the airliner towing a
// memory postcard, "Your Memory Has Been Preserved!", a thank-you note, a
// "Pending Review" status strip, and links to My Entries and the archive.
export default function ContributeSuccess() {
  const { t } = useLanguage();
  const copy = t.contributeSuccess;

  // The form was long; bring the confirmation into view at the top.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    window.scrollTo({ top: 0, behavior: reduce.matches ? "auto" : "smooth" });
  }, []);

  return (
    <section className={styles.success} role="status">
      <ContributeSuccessArt />

      <div className={styles.text}>
        {/* In English the "subtitle" class (theme.css) makes this handwritten. */}
        <p className={`subtitle ${styles.kicker}`}>{copy.kicker}</p>
        <h1 className={styles.title}>
          {copy.titleLead}{" "}
          <span className={styles.highlight}>{copy.titleHighlight}</span>
        </h1>
        <p className={styles.message}>{copy.text}</p>

        <p className={styles.statusStrip}>
          <span className={styles.statusLabel}>{copy.statusLabel}</span>
          <span className={styles.statusValue}>
            <span className={styles.statusLight} aria-hidden="true" />
            {copy.statusValue}
          </span>
        </p>

        <div className={styles.actions}>
          <Link href="/my-entries" className={styles.primary}>
            <AuthIcon name="document" />
            {copy.myEntries}
          </Link>
          <Link href="/" className={styles.secondary}>
            <AuthIcon name="layers" />
            {copy.explore}
          </Link>
        </div>
      </div>
    </section>
  );
}
