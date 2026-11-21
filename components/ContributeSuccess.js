"use client";

import { useEffect } from "react";
import Link from "next/link";

import AuthIcon from "./AuthIcon";
import styles from "./ContributeSuccess.module.css";
import ContributeSuccessArt from "./ContributeSuccessArt";
import { useLanguage } from "./LanguageProvider";
import SuccessTracker from "./SuccessTracker";

// Shown on /contribute after the server confirms a new entry was saved
// (ContributeForm, when form.submitted is true): the airliner towing a
// memory postcard, "Your Memory Has Been Preserved!", a thank-you note, a
// status tracker (Submitted → Pending Review → Published, SuccessTracker), "Contribute Again" (brings back an empty
// form, onContributeAgain) and a link to My Entries.
export default function ContributeSuccess({ onContributeAgain }) {
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

        <SuccessTracker />

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primary}
            onClick={onContributeAgain}
          >
            <AuthIcon name="plus" />
            {copy.again}
          </button>
          <Link href="/my-entries" className={styles.secondary}>
            <AuthIcon name="document" />
            {copy.myEntries}
          </Link>
        </div>
      </div>
    </section>
  );
}
