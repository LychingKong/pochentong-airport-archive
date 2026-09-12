import { notFound } from "next/navigation";

import collection from "../../../collection.config.js";
import BackLink from "../../../components/BackLink";
import EntryDetail from "../../../components/EntryDetail";
import EntryGallery from "../../../components/EntryGallery";
import entries from "../../../data/entries.js";

export function generateStaticParams() {
  return entries.map((entry) => ({ id: String(entry.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const entry = entries.find((item) => String(item.id) === id);

  if (!entry) return {};

  return {
    title: `${entry.title} — ${collection.name}`,
    description: entry.description,
  };
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
  const entry = entries.find((item) => String(item.id) === id);

  if (!entry) {
    notFound();
  }

  return (
    <main style={styles.wrap}>
      <BackLink />

      <div style={styles.layout}>
        <EntryGallery images={entry.images} title={entry.title} />
        <EntryDetail entry={entry} />
      </div>
    </main>
  );
}
