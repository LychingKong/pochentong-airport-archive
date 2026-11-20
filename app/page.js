"use client";

import { useEffect, useState } from "react";

import collection from "../collection.config.js";
import ArchiveCredits from "../components/ArchiveCredits";
import ArchiveGrid from "../components/ArchiveGrid";
import Header from "../components/Header";
import HomeHero from "../components/HomeHero";
import { useLanguage } from "../components/LanguageProvider";
import PlaneIcon from "../components/PlaneIcon";
import { createClient } from "../lib/supabase/client";
import { collectionText } from "../lib/translations";
import styles from "./page.module.css";

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

// Remembers the last list while the tab is open, so coming back to the home
// page shows it at once and refreshes it in the background.
let cachedEntries = null;

export default function Home() {
  const { language, t } = useLanguage();
  const [entries, setEntries] = useState(cachedEntries ?? []);
  const [isLoading, setIsLoading] = useState(cachedEntries === null);

  useEffect(() => {
    async function fetchEntries() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("entries")
          .select("*")
          .eq("status", "published")
          .order("created_at", { ascending: false });

        if (error) throw error;

        const transformed = data.map(transformEntry);
        cachedEntries = transformed;
        setEntries(transformed);
      } catch (err) {
        console.error("Failed to fetch entries:", err);
        if (cachedEntries === null) setEntries([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEntries();
  }, []);

  const localizedCollection =
    language === "km" ? { ...collection, ...collectionText.km } : collection;

  return (
    <main className={styles.page}>
      <Header />

      <HomeHero collection={localizedCollection} entries={entries} />

      <ArchiveCredits
        curator={localizedCollection.curator}
        source={localizedCollection.source}
      />

      {isLoading ? (
        <p className={styles.loading} role="status">
          {t.loadingEntries}
        </p>
      ) : (
        // id="collection" is where the hero's orange arrow scrolls to.
        <div id="collection" className={styles.collection}>
          <ArchiveGrid entries={entries} />
        </div>
      )}

      <footer className={styles.footer} data-reveal>
        <span className={styles.footerMark} aria-hidden="true">
          <PlaneIcon className={styles.footerIcon} />
        </span>
        <p className={styles.footerText}>{t.footer}</p>
      </footer>
    </main>
  );
}
