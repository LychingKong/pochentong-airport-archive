"use client";

import { useState } from "react";

import { formatReviewDate, pickField } from "../lib/reviewFields";
import AuthIcon from "./AuthIcon";
import { useLanguage } from "./LanguageProvider";
import ReviewDecision from "./ReviewDecision";
import ReviewGallery from "./ReviewGallery";
import styles from "./ReviewWorkspace.module.css";

// The selected entry in full on the right of the /review workspace: photo
// gallery, title, submission date, description, tags, the complete story
// (a blank line starts a new paragraph; single line breaks are kept), and
// the decision bar. It dims while a decision is being saved.
export default function ReviewPreview({ entry, onReviewed }) {
  const { language, t } = useLanguage();
  const copy = t.reviewWorkspace;
  const [saving, setSaving] = useState(false);

  const title = pickField(entry, "title", language) || t.untitledEntry;
  const description = pickField(entry, "description", language);
  const story = pickField(entry, "story", language) || "";
  const tags = (pickField(entry, "tags", language) || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const paragraphs = story.split(/\n\n+/).filter(Boolean);

  return (
    <article
      id="review-preview"
      className={`${styles.preview} ${saving ? styles.saving : ""}`}
      aria-busy={saving}
    >
      <ReviewGallery images={entry.images} title={title} />

      <div className={styles.previewBody}>
        <p className={styles.previewMeta}>
          <AuthIcon name="calendar" className={styles.metaIcon} />
          {copy.submitted} {formatReviewDate(entry.created_at)}
        </p>
        <h2 className={styles.previewTitle}>{title}</h2>
        {description ? <p className={styles.lead}>{description}</p> : null}

        {tags.length > 0 ? (
          <ul className={styles.tags} aria-label={copy.tagsLabel}>
            {tags.map((tag, index) => (
              <li key={index} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
        ) : null}

        {paragraphs.length > 0 ? (
          <section className={styles.story}>
            <h3 className={styles.sectionLabel}>{copy.storyLabel}</h3>
            {paragraphs.map((paragraph, index) => (
              <p key={index} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </section>
        ) : null}
      </div>

      <ReviewDecision
        entryId={entry.id}
        onSavingChange={setSaving}
        onReviewed={onReviewed}
      />
    </article>
  );
}
