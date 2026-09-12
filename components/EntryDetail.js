"use client";

import { getLocalizedEntryField } from "../lib/translations";
import { useLanguage } from "./LanguageProvider";

export default function EntryDetail({ entry }) {
  const { language, t } = useLanguage();

  const title = getLocalizedEntryField(entry, "title", language);
  const contributor = getLocalizedEntryField(entry, "contributor", language);
  const date = getLocalizedEntryField(entry, "date", language);
  const tags = getLocalizedEntryField(entry, "tags", language);
  const story = getLocalizedEntryField(entry, "story", language);
  const description = getLocalizedEntryField(entry, "description", language);

  const paragraphs = (story || description || "")
    .split(/\n\n+/)
    .filter(Boolean);

  const styles = {
    title: {
      fontFamily: "Georgia, 'Times New Roman', serif",
      fontSize: "clamp(28px, 4vw, 40px)",
      fontWeight: 600,
      lineHeight: 1.15,
      margin: "0 0 14px",
      color: "#211F1B",
    },
    meta: {
      fontFamily: "'Courier New', monospace",
      fontSize: 13,
      letterSpacing: 0.5,
      color: "#A39C8C",
      margin: "0 0 20px",
    },
    tags: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      margin: "0 0 28px",
    },
    tag: {
      fontFamily: "'Courier New', monospace",
      fontSize: 11,
      letterSpacing: 1,
      textTransform: "uppercase",
      color: "#9C6B3F",
      backgroundColor: "#F5EFE4",
      border: "1px solid #E7E3DB",
      borderRadius: 999,
      padding: "6px 12px",
    },
    story: {
      fontSize: 16,
      lineHeight: 1.8,
      color: "#3A362F",
      margin: "0 0 18px",
    },
  };

  return (
    <div>
      <h1 style={styles.title}>{title || t.untitledEntry}</h1>
      <p style={styles.meta}>
        {contributor}
        {contributor && date ? "  ·  " : ""}
        {date}
      </p>
      {tags && tags.length > 0 ? (
        <div style={styles.tags}>
          {tags.map((tag, index) => (
            <span style={styles.tag} key={index}>
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      {paragraphs.map((paragraph, index) => (
        <p style={styles.story} key={index}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}
