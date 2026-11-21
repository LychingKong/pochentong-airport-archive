"use client";

import { useState } from "react";
import Link from "next/link";

import AuthIcon from "./AuthIcon";
import { useLanguage } from "./LanguageProvider";
import styles from "./MyEntries.module.css";
import MyEntryBadges from "./MyEntryBadges";
import MyEntryNoteDialog from "./MyEntryNoteDialog";

// One entry on /my-entries: the photo on the left; on the right a status
// badge (Pending Review / Published / Returned), the title, a short
// description (a returned one with a reviewer's note gets a small message
// button with a red dot that opens the note in a popup), and a footer with
// the submission date and an arrow. The title link stretches over the
// whole card, so a click anywhere opens the entry; the message button sits
// above it (a button cannot go inside a link).
export default function MyEntryCard({ entry }) {
  const { language, t } = useLanguage();
  const km = language === "km";

  const title = (km && entry.title_km) || entry.title || t.untitledEntry;
  const description = (km && entry.description_km) || entry.description;
  const cover =
    (entry.images || "").split(",")[0].trim() || "/placeholder-image.png";
  const hasNote = entry.status === "returned" && Boolean(entry.review_note);
  const [noteOpen, setNoteOpen] = useState(false);

  return (
    <article className={styles.card}>
      <div className={styles.photo}>
        <img src={cover} alt="" loading="lazy" className={styles.photoImg} />
      </div>

      <div className={styles.body}>
        <MyEntryBadges
          status={entry.status}
          hasNote={hasNote}
          onOpenNote={() => setNoteOpen(true)}
        />
        <h2 className={styles.cardTitle}>
          <Link href={`/entries/${entry.id}`} className={styles.cardLink}>
            {title}
          </Link>
        </h2>
        {description ? <p className={styles.desc}>{description}</p> : null}

        <div className={styles.footer}>
          <span className={styles.date}>
            <AuthIcon name="calendar" className={styles.dateIcon} />
            {entry.date}
          </span>
          <span className={styles.arrowWrap} aria-hidden="true">
            <AuthIcon name="arrowRight" className={styles.arrow} />
          </span>
        </div>
      </div>

      {noteOpen ? (
        <MyEntryNoteDialog
          entry={entry}
          title={title}
          onClose={() => setNoteOpen(false)}
        />
      ) : null}
    </article>
  );
}
