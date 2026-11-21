"use client";

import Link from "next/link";

import AuthIcon from "./AuthIcon";
import styles from "./EntryNoteNextStep.module.css";
import { useLanguage } from "./LanguageProvider";

// Under the reviewer's note (EntryReviewNote on the entry page and the
// /my-entries popup): tells the owner to edit the entry, with a button to
// the edit page. Saving an owner's edit sets the entry back to pending
// (app/api/entries/[id]/route.js), so it is reviewed again.
export default function EntryNoteNextStep({ id }) {
  const { t } = useLanguage();
  const copy = t.entryReviewNote;

  return (
    <div className={styles.box}>
      <div className={styles.text}>
        <p className={styles.title}>{copy.nextTitle}</p>
        <p className={styles.body}>{copy.nextText}</p>
      </div>
      <Link href={`/entries/${id}/edit`} className={styles.edit}>
        <AuthIcon name="pencil" className={styles.icon} />
        {copy.editButton}
      </Link>
    </div>
  );
}
