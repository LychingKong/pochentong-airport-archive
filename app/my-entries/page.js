import { redirect } from "next/navigation";

import collection from "../../collection.config.js";
import BackLink from "../../components/BackLink";
import Header from "../../components/Header";
import MyEntriesList from "../../components/MyEntriesList";
import { createClient } from "../../lib/supabase/server";

export const metadata = {
  title: `My Entries — ${collection.name}`,
};

const styles = {
  wrap: {
    maxWidth: 1160,
    margin: "0 auto",
    padding: "clamp(56px, 9vw, 96px) clamp(20px, 5vw, 24px) 64px",
  },
};

export default async function MyEntriesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Only this user's entries, in any status. Row-level security allows it.
  const { data: entries } = await supabase
    .from("entries")
    .select("id, title, title_km, status, review_note")
    .eq("owner", user.id)
    .order("created_at", { ascending: false });

  return (
    <main style={styles.wrap}>
      <Header />
      <BackLink />
      <MyEntriesList entries={entries ?? []} />
    </main>
  );
}
