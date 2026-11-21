"use client";

import Link from "next/link";

import AuthIcon from "./AuthIcon";
import { useLanguage } from "./LanguageProvider";
import ReviewPassHeader from "./ReviewPassHeader";
import ReviewPassRoute from "./ReviewPassRoute";
import ReviewPassStub from "./ReviewPassStub";
import styles from "./ReviewRestricted.module.css";

// What /review shows anyone who is not a reviewer (signed out, or signed
// in without the role): a boarding pass for the "Review Area" with the
// message on its main part and an ACCESS DENIED stamp on the tear-off stub.
// Purely a message: app/review/page.js decides who sees it on the server,
// and never loads pending entries for them.
export default function ReviewRestricted() {
  const { t } = useLanguage();
  const copy = t.reviewRestricted;

  return (
    <section className={styles.wrap}>
      <article className={styles.pass}>
        <ReviewPassHeader />

        <div className={styles.main}>
          <ReviewPassRoute />

          <h1 className={styles.title}>
            {copy.titleLead}{" "}
            <span className={styles.highlight}>{copy.titleHighlight}</span>
          </h1>
          <p className={styles.explain}>{copy.text}</p>

          <div className={styles.actions}>
            <Link href="/" className={styles.primary}>
              <AuthIcon name="layers" />
              {copy.archiveButton}
            </Link>
            <Link href="/contribute" className={styles.secondary}>
              <AuthIcon name="plus" />
              {copy.contributeButton}
            </Link>
          </div>
        </div>

        <ReviewPassStub />
      </article>
    </section>
  );
}
