"use client";

import { useEffect, useState } from "react";

import collection from "../collection.config.js";
import ArchiveGrid from "../components/ArchiveGrid";
import Header from "../components/Header";
import { useLanguage } from "../components/LanguageProvider";
import { createClient } from "../lib/supabase/client";
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
  loadingPlaceholder: {
    fontSize: 15,
    color: "#7C7568",
    lineHeight: 1.6,
    padding: "32px 0",
  },
};

function formatDate(isoDate) {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function transformEntry(dbEntry) {
  return {
    id: dbEntry.id,
    title: dbEntry.title || "",
    description: dbEntry.description || "",
    date: formatDate(dbEntry.created_at),
    story: dbEntry.story || "",
    tags: dbEntry.tags ? dbEntry.tags.split(",").map((t) => t.trim()) : [],
    images: dbEntry.images
      ? dbEntry.images.split(",").map((img) => img.trim())
      : [],
    contributor: dbEntry.contributor || "",
    translations: {
      km: {
        title: dbEntry.title_km || "",
        description: dbEntry.description_km || "",
        date: formatDate(dbEntry.created_at),
        story: dbEntry.story_km || "",
        tags: dbEntry.tags_km
          ? dbEntry.tags_km.split(",").map((t) => t.trim())
          : [],
        contributor: dbEntry.contributor_km || "",
      },
    },
  };
}

export default function Home() {
  const { language, t } = useLanguage();
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEntries() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("entries")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        const transformed = data.map(transformEntry);
        setEntries(transformed);
      } catch (err) {
        console.error("Failed to fetch entries:", err);
        setEntries([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEntries();
  }, []);

  const localizedCollection =
    language === "km" ? { ...collection, ...collectionText.km } : collection;

  return (
    <main style={styles.wrap}>
      <Header />
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

      {isLoading ? (
        <div style={styles.loadingPlaceholder}>Loading entries...</div>
      ) : (
        <ArchiveGrid entries={entries} />
      )}

      <footer style={styles.footer}>{t.footer}</footer>
    </main>
  );
}
