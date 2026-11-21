"use client";

import { useState } from "react";

import { pickField } from "../lib/reviewFields";
import AuthIcon from "./AuthIcon";
import { useLanguage } from "./LanguageProvider";
import MyEntryNoteDialog from "./MyEntryNoteDialog";
import NoteButton from "./NoteButton";
import ReviewCardFooter from "./ReviewCardFooter";
import styles from "./ReviewWorkspace.module.css";

// One entry on the /review board: photo, status badge, title and short
// description (returned ones with a note get the message button, which
// opens the note in the same popup as /my-entries), then the
// submission date and the action. Pending entries open the review panel
// (Review); published ones link to their page (View); returned ones have
// no action.
const ICONS = { published: "check", pending: "clock", returned: "undo" };

export default function ReviewEntryCard({ entry, onOpen }) {
  const { language, t } = useLanguage();
  const copy = t.reviewWorkspace;
  const status = entry.reviewStatus;
  const image = (entry.images || "").split(",")[0].trim();
  const title = pickField(entry, "title", language) || t.untitledEntry;
  const hasNote = status === "returned" && Boolean(entry.review_note);
  const [noteOpen, setNoteOpen] = useState(false);

  return (
    <article className={styles.card}>
      <img
        src={image || "/placeholder-image.png"}
        alt=""
        loading="lazy"
        className={styles.cardImg}
      />

      <div className={styles.cardBody}>
        <div className={styles.badgeRow}>
          <span className={`${styles.badge} ${styles[`tone_${status}`]}`}>
            <AuthIcon name={ICONS[status]} />
            {copy[status]}
          </span>
          {hasNote ? <NoteButton onClick={() => setNoteOpen(true)} /> : null}
        </div>
        <h2 className={styles.cardTitle}>{title}</h2>
        <p className={styles.cardDesc}>
          {pickField(entry, "description", language)}
        </p>
      </div>

      <ReviewCardFooter entry={entry} status={status} onOpen={onOpen} />

      {noteOpen ? (
        <MyEntryNoteDialog
          entry={entry}
          title={title}
          forReviewer
          onClose={() => setNoteOpen(false)}
        />
      ) : null}
    </article>
  );
}
