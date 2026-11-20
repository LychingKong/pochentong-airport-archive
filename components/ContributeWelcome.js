"use client";

import Link from "next/link";

import AuthIcon from "./AuthIcon";
import ContributeCollage from "./ContributeCollage";
import styles from "./ContributeWelcome.module.css";
import { useLanguage } from "./LanguageProvider";
import PlaneIcon from "./PlaneIcon";

// What /contribute shows a visitor who is not signed in: an invitation to
// share a memory, with buttons to sign in or create an account, beside a
// collage of archive photos. Signed-in users get the form instead
// (app/contribute/page.js).
// `photos` (from the page): up to three published entries for the collage.
export default function ContributeWelcome({ photos }) {
  const { t } = useLanguage();
  const copy = t.contributeWelcome;

  return (
    <div className={styles.welcome}>
      <section className={styles.hero}>
        <div className={styles.text}>
          {/* A paper plane's dashed flight path above the headline. */}
          <svg className={styles.path} viewBox="0 0 160 90" aria-hidden="true">
            <path d="M40 86C2 78 -2 38 40 30S110 20 140 8" />
          </svg>
          <PlaneIcon className={styles.pathPlane} />

          <h1 className={styles.title}>
            {copy.titleLead}{" "}
            <span className={styles.highlight}>{copy.titleHighlight}</span>
          </h1>
          <p className={styles.intro}>{copy.intro}</p>

          <div className={styles.actions}>
            <Link href="/login" className={styles.primary}>
              <AuthIcon name="signIn" />
              {copy.signIn}
            </Link>
            <Link href="/signup" className={styles.secondary}>
              <AuthIcon name="userPlus" />
              {t.signupButton}
            </Link>
          </div>
        </div>

        <ContributeCollage photos={photos} />
      </section>
    </div>
  );
}
