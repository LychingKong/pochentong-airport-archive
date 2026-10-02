import { notFound, redirect } from "next/navigation";

import collection from "../../../../collection.config.js";
import BackLink from "../../../../components/BackLink";
import ContributeForm from "../../../../components/ContributeForm";
import Header from "../../../../components/Header";
import LoginPrompt from "../../../../components/LoginPrompt";
import { TEXT_FIELDS } from "../../../../lib/entryValidation";
import { createClient } from "../../../../lib/supabase/server";

export const metadata = {
  title: `Edit entry — ${collection.name}`,
};

const styles = {
  wrap: {
    maxWidth: 1160,
    margin: "0 auto",
    padding: "clamp(56px, 9vw, 96px) clamp(20px, 5vw, 24px) 64px",
  },
};

export default async function EditEntryPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main style={styles.wrap}>
        <Header />
        <BackLink />
        <LoginPrompt />
      </main>
    );
  }

  const { data: row } = await supabase
    .from("entries")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!row) notFound();
  if (row.owner !== user.id) redirect(`/entries/${id}`);

  // Only what the form needs: the text fields, the id, and the cover photo.
  const entry = {
    id: row.id,
    cover: (row.images || "").split(",")[0].trim() || null,
    ...Object.fromEntries(TEXT_FIELDS.map((name) => [name, row[name] ?? ""])),
  };

  return (
    <main style={styles.wrap}>
      <Header />
      <BackLink />
      <ContributeForm entry={entry} />
    </main>
  );
}
