"use client";

import { useState } from "react";

import { createClient } from "../lib/supabase/client";
import { useLanguage } from "./LanguageProvider";
import ReturnNote from "./ReturnNote";
import styles from "./ReviewCard.module.css";

// Dates read dd-mm-yyyy, the same as the rest of the archive.
function formatDate(isoDate) {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}-${month}-${date.getFullYear()}`;
}

// Khmer falls back to English when the Khmer field is empty.
function pick(entry, field, language) {
  const khmer = entry[`${field}_km`];
  return language === "km" && khmer ? khmer : entry[field];
}

export default function ReviewCard({ entry, onReviewed }) {
  const { language, t } = useLanguage();
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const [note, setNote] = useState("");
  const [returning, setReturning] = useState(false);

  const title = pick(entry, "title", language);
  const description = pick(entry, "description", language);
  const story = pick(entry, "story", language);
  const tags = pick(entry, "tags", language);
  const image = entry.images
    ? entry.images.split(",")[0].trim()
    : "/placeholder-image.png";

  async function decide(decision, reviewNote = null) {
    setBusy(true);
    setFailed(false);
    const supabase = createClient();
    // Only a return sends a note; review_entry clears it on publish anyway.
    const { data, error } = await supabase.rpc("review_entry", {
      entry_id: entry.id,
      decision,
      note: reviewNote,
    });

    // review_entry returns false, without an error, when it refuses. Only
    // true means the entry was reviewed, so the check has to be data === true.
    if (error || data !== true) {
      console.error("Review not saved:", entry.id, error ?? data);
      setFailed(true);
      setBusy(false);
      return;
    }
    onReviewed(entry.id);
  }

  return (
    <article className={styles.card}>
      <img src={image} alt="" className={styles.image} />
      <div>
        <h2 className={styles.title}>{title || t.untitledEntry}</h2>
        {description ? <p className={styles.body}>{description}</p> : null}
        {story ? <p className={styles.story}>{story}</p> : null}
        {tags ? <p className={styles.meta}>{tags}</p> : null}
        <p className={styles.meta}>{formatDate(entry.created_at)}</p>
        {returning ? (
          <ReturnNote
            note={note}
            onNoteChange={setNote}
            onConfirm={() => decide("returned", note.trim() || null)}
            onCancel={() => setReturning(false)}
            busy={busy}
          />
        ) : (
          <div className={styles.actions}>
            <button
              type="button"
              disabled={busy}
              className={`${styles.button} ${styles.publish}`}
              onClick={() => decide("published")}
            >
              {t.publishEntry}
            </button>
            <button
              type="button"
              disabled={busy}
              className={styles.button}
              onClick={() => setReturning(true)}
            >
              {t.returnEntry}
            </button>
          </div>
        )}
        {failed ? (
          <p role="alert" className={styles.error}>
            {t.reviewFailed}
          </p>
        ) : null}
      </div>
    </article>
  );
}
