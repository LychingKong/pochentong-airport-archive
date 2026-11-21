import { redirect } from "next/navigation";

import collection from "../../collection.config.js";
import Header from "../../components/Header";
import MyEntriesList from "../../components/MyEntriesList";
import { createClient } from "../../lib/supabase/server";

export const metadata = {
  title: `My Entries — ${collection.name}`,
};

// Same width and padding as the homepage (app/page.module.css): no space
// above the floating navbar, which brings its own.
const styles = {
  wrap: {
    boxSizing: "border-box",
    maxWidth: 1160,
    margin: "0 auto",
    padding: "0 clamp(16px, 4vw, 32px) clamp(48px, 7vw, 80px)",
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
      <MyEntriesList entries={entries ?? []} />
    </main>
  );
}
