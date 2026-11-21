"use client";

import Link from "next/link";

import { formatReviewDate } from "../lib/reviewFields";
import AuthIcon from "./AuthIcon";
import { useLanguage } from "./LanguageProvider";
import styles from "./ReviewWorkspace.module.css";

// The bottom of a /review card (ReviewEntryCard): the submission date and
// the action. Pending entries open the review panel (Review: orange, the
// reviewer's to-do); published ones link to their page (View: a quiet
// outlined button); returned ones have no action.
export default function ReviewCardFooter({ entry, status, onOpen }) {
  const copy = useLanguage().t.reviewWorkspace;

  return (
    <div className={styles.cardFooter}>
      <span className={styles.cardDate}>
        <AuthIcon name="calendar" />
        {copy.submitted} {formatReviewDate(entry.created_at)}
      </span>
      {status === "pending" ? (
        <button
          type="button"
          className={`${styles.cardAction} ${styles.actionReview}`}
          onClick={() => onOpen(entry.id)}
        >
          <AuthIcon name="clipboardCheck" />
          {copy.review}
        </button>
      ) : null}
      {status === "published" ? (
        <Link
          href={`/entries/${entry.id}`}
          className={`${styles.cardAction} ${styles.actionView}`}
        >
          <AuthIcon name="eye" />
          {copy.view}
        </Link>
      ) : null}
    </div>
  );
}
