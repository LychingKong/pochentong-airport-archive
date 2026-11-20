import { cache } from "react";
import { notFound } from "next/navigation";

import collection from "../../../collection.config.js";
import BackLink from "../../../components/BackLink";
import EntryDetail from "../../../components/EntryDetail";
import EntryGallery from "../../../components/EntryGallery";
import EntryHeader from "../../../components/EntryHeader";
import EntryOwnerActions from "../../../components/EntryOwnerActions";
import EntryPlacard from "../../../components/EntryPlacard";
import Header from "../../../components/Header";
import { createClient } from "../../../lib/supabase/server";
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

// One database lookup per request, shared by the page and its <title> tag.
const loadEntryRows = cache(async (id) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("entries")
    .select("*")
    .eq("id", id);
  return error ? null : data;
});

async function loadCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const dbEntries = await loadEntryRows(id);

    if (!dbEntries || dbEntries.length === 0) {
      return {};
    }

    const entry = transformEntry(dbEntries[0]);
    const title = `${entry.title} — ${collection.name}`;
    return {
      title,
      description: entry.description,
      openGraph: {
        type: "article",
        siteName: collection.name,
        title,
        description: entry.description,
        // A page-level openGraph replaces the inherited one, so re-add the
        // shared logo image (app/opengraph-image.jpg).
        images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630 }],
      },
    };
  } catch {
    return {};
  }
}

export default async function EntryPage({ params }) {
  const { id } = await params;

  try {
    // Look up the entry and the signed-in user at the same time.
    const [dbEntries, user] = await Promise.all([
      loadEntryRows(id),
      loadCurrentUser(),
    ]);

    if (!dbEntries || dbEntries.length === 0) {
      notFound();
    }

    const entry = transformEntry(dbEntries[0]);
    const isOwner = Boolean(user) && user.id === dbEntries[0].owner;

    // Laid out as an exhibit: title, the photo full width, then the museum
    // label beside the story (stacked on tablets and phones).
    return (
      <main className={styles.page}>
        <Header />
        <div className={styles.topRow}>
          <BackLink className={styles.back} />
          {isOwner ? <EntryOwnerActions id={entry.id} /> : null}
        </div>

        <article>
          <EntryHeader entry={entry} />
          <EntryGallery images={entry.images} title={entry.title} />
          <div className={styles.body}>
            <div className={styles.side}>
              <EntryPlacard entry={entry} />
            </div>
            <EntryDetail entry={entry} />
          </div>
        </article>

        <nav className={styles.closing}>
          <BackLink className={styles.back} />
        </nav>
      </main>
    );
  } catch {
    notFound();
  }
}
