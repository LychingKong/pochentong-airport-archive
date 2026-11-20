"use client";

import { getLocalizedEntryField } from "../lib/translations";
import styles from "./EntryExhibit.module.css";
import { useLanguage } from "./LanguageProvider";
import PlaneIcon from "./PlaneIcon";

// The story itself. A blank line in the story starts a new paragraph; single
// line breaks are kept (white-space: pre-wrap). With no story, the
// description is shown instead. The first paragraph is set larger as a lead.
export default function EntryDetail({ entry }) {
  const { language, t } = useLanguage();

  const story = getLocalizedEntryField(entry, "story", language);
  const description = getLocalizedEntryField(entry, "description", language);

  const paragraphs = (story || description || "")
    .split(/\n\n+/)
    .filter(Boolean);

  if (paragraphs.length === 0) return null;

  return (
    <section className={styles.story}>
      {/* In English the "subtitle" class (theme.css) makes this handwritten. */}
      <p className={`subtitle ${styles.storyLabel}`} data-reveal>
        {t.sections.story.title}
      </p>
      {paragraphs.map((paragraph, index) => (
        <p
          className={index === 0 ? styles.lead : styles.paragraph}
          key={index}
          data-reveal
        >
          {paragraph}
        </p>
      ))}
      {/* A small plane between two lines marks the end of the story. */}
      <div className={styles.end} aria-hidden="true" data-reveal>
        <span className={styles.endLine} />
        <span className={styles.endMark}>
          <PlaneIcon className={styles.endIcon} />
        </span>
        <span className={styles.endLine} />
      </div>
    </section>
  );
}
