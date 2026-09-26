import { notFound } from "next/navigation";

import collection from "../../../collection.config.js";
import BackLink from "../../../components/BackLink";
import EntryDetail from "../../../components/EntryDetail";
import EntryGallery from "../../../components/EntryGallery";
import Header from "../../../components/Header";
import { createClient } from "../../../lib/supabase/server";

function transformEntry(dbEntry) {
  return {
    id: dbEntry.id,
    title: dbEntry.title || "",
    description: dbEntry.description || "",
    date: dbEntry.date || "",
    story: dbEntry.story || "",
    tags: dbEntry.tags ? dbEntry.tags.split(",").map((t) => t.trim()) : [],
    images: dbEntry.images ? dbEntry.images.split(",").map((img) => img.trim()) : [],
    contributor: "",
    translations: {
      km: {
        title: dbEntry.title_km || "",
        description: dbEntry.description_km || "",
        date: dbEntry.date || "",
        story: dbEntry.story_km || "",
        tags: dbEntry.tags_km
          ? dbEntry.tags_km.split(",").map((t) => t.trim())
          : [],
        contributor: "",
      },
    },
  };
}

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const supabase = await createClient();
    const { data: dbEntries } = await supabase
      .from("entries")
      .select("*")
      .eq("id", id);

    if (!dbEntries || dbEntries.length === 0) {
      return {};
    }

    const entry = transformEntry(dbEntries[0]);
    return {
      title: `${entry.title} — ${collection.name}`,
      description: entry.description,
    };
  } catch (err) {
    return {};
  }
}

const styles = {
  wrap: {
    maxWidth: 1160,
    margin: "0 auto",
    padding: "clamp(56px, 9vw, 96px) clamp(20px, 5vw, 24px) 64px",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
    gap: "clamp(32px, 5vw, 64px)",
    alignItems: "start",
  },
};

export default async function EntryPage({ params }) {
  const { id } = await params;

  try {
    const supabase = await createClient();
    const { data: dbEntries, error } = await supabase
      .from("entries")
      .select("*")
      .eq("id", id);

    if (error) {
      notFound();
    }

    if (!dbEntries || dbEntries.length === 0) {
      notFound();
    }

    const entry = transformEntry(dbEntries[0]);

    return (
      <main style={styles.wrap}>
        <Header />
        <BackLink />

        <div style={styles.layout}>
          <EntryGallery images={entry.images} title={entry.title} />
          <EntryDetail entry={entry} />
        </div>
      </main>
    );
  } catch (err) {
    notFound();
  }
}
