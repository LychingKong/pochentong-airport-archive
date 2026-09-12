"use client";

import collection from "../collection.config.js";
import ArchiveGrid from "../components/ArchiveGrid";
import { useLanguage } from "../components/LanguageProvider";
import entries from "../data/entries.js";
import { collectionText } from "../lib/translations";

const styles = {
  wrap: {
    maxWidth: 1160,
    margin: "0 auto",
    padding: "clamp(56px, 9vw, 96px) clamp(20px, 5vw, 24px) 64px",
  },
  hero: {
    maxWidth: 680,
    marginBottom: "clamp(40px, 6vw, 64px)",
  },
  kicker: {
    fontFamily: "'Courier New', monospace",
    color: "#9C6B3F",
    fontSize: 13,
    letterSpacing: 2,
    margin: 0,
  },
  title: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: "clamp(34px, 5vw, 52px)",
    fontWeight: 600,
    margin: "16px 0 14px",
    lineHeight: 1.15,
    color: "#211F1B",
  },
  description: {
    fontSize: 17,
    color: "#7C7568",
    lineHeight: 1.65,
    margin: 0,
  },
  metaRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "clamp(28px, 5vw, 56px)",
    padding: "24px 0",
    borderTop: "1px solid #E7E3DB",
    borderBottom: "1px solid #E7E3DB",
    marginBottom: "clamp(48px, 7vw, 80px)",
  },
  metaLabel: {
    fontFamily: "'Courier New', monospace",
    fontSize: 11,
    letterSpacing: 1,
    color: "#A39C8C",
    margin: "0 0 6px",
  },
  metaValue: {
    fontSize: 15,
    lineHeight: 1.5,
    margin: 0,
    color: "#3A362F",
    maxWidth: 420,
  },
  footer: {
    marginTop: "clamp(64px, 9vw, 96px)",
    paddingTop: 24,
    borderTop: "1px solid #E7E3DB",
    fontSize: 13,
    color: "#A39C8C",
  },
};

export default function Home() {
  const { language, t } = useLanguage();
  const localizedCollection =
    language === "km" ? { ...collection, ...collectionText.km } : collection;

  return (
    <main style={styles.wrap}>
      <div style={styles.hero}>
        <p style={styles.kicker}>{t.kicker}</p>
        <h1 style={styles.title}>{localizedCollection.name}</h1>
        <p style={styles.description}>{localizedCollection.description}</p>
      </div>

      <div style={styles.metaRow}>
        <div>
          <p style={styles.metaLabel}>{t.curatedByLabel}</p>
          <p style={styles.metaValue}>{localizedCollection.curator}</p>
        </div>
        <div>
          <p style={styles.metaLabel}>{t.sourceLabel}</p>
          <p style={styles.metaValue}>{localizedCollection.source}</p>
        </div>
      </div>

      <ArchiveGrid entries={entries} />

      <footer style={styles.footer}>{t.footer}</footer>
    </main>
  );
}
