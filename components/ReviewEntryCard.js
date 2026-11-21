"use client";

import Link from "next/link";

import { formatReviewDate, pickField } from "../lib/reviewFields";
import AuthIcon from "./AuthIcon";
import { useLanguage } from "./LanguageProvider";
import styles from "./ReviewWorkspace.module.css";

// One entry on the /review board: photo, status badge, title and short
// description (plus the reviewer's note on returned ones), then the
// submission date and the action. Pending entries open the review panel
// (Review); published ones link to their page (View); returned ones have
// no action.
const ICONS = { published: "check", pending: "clock", returned: "undo" };

export default function ReviewEntryCard({ entry, onOpen }) {
  const { language, t } = useLanguage();
  const copy = t.reviewWorkspace;
  const status = entry.reviewStatus;
  const image = (entry.images || "").split(",")[0].trim();

  return (
    <article className={styles.card}>
      <img
        src={image || "/placeholder-image.png"}
        alt=""
        loading="lazy"
        className={styles.cardImg}
      />

      <div className={styles.cardBody}>
        <span className={`${styles.badge} ${styles[`tone_${status}`]}`}>
          <AuthIcon name={ICONS[status]} />
          {copy[status]}
        </span>
        <h2 className={styles.cardTitle}>
          {pickField(entry, "title", language) || t.untitledEntry}
        </h2>
        <p className={styles.cardDesc}>
          {pickField(entry, "description", language)}
        </p>
        {status === "returned" && entry.review_note ? (
          <p className={styles.cardNote}>
            <strong>{t.reviewerNoteLabel}</strong> {entry.review_note}
          </p>
        ) : null}
      </div>

      <div className={styles.cardFooter}>
        <span className={styles.cardDate}>
          <AuthIcon name="calendar" />
          {copy.submitted} {formatReviewDate(entry.created_at)}
        </span>
        {status === "pending" ? (
          <button
            type="button"
            className={styles.cardAction}
            onClick={() => onOpen(entry.id)}
          >
            <AuthIcon name="eye" />
            {copy.review}
          </button>
        ) : null}
        {status === "published" ? (
          <Link href={`/entries/${entry.id}`} className={styles.cardAction}>
            <AuthIcon name="eye" />
            {copy.view}
          </Link>
        ) : null}
      </div>
    </article>
  );
}
