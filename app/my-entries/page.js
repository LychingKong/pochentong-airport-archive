import { redirect } from "next/navigation";

import collection from "../../collection.config.js";
import BackLink from "../../components/BackLink";
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
  // Each card shows the cover photo, status, title, description and
  // submission date.
  const { data: entries } = await supabase
    .from("entries")
    .select(
      "id, title, title_km, description, description_km, images, status, created_at",
    )
    .eq("owner", user.id)
    .order("created_at", { ascending: false });

  // Dates are formatted here on the server (dd-mm-yyyy, as on entry pages),
  // so the server and the browser always show the same day.
  const list = (entries ?? []).map((entry) => ({
    ...entry,
    date: formatDate(entry.created_at),
  }));

  return (
    <main style={styles.wrap}>
      <Header />
      <BackLink />
      <MyEntriesList entries={list} />
    </main>
  );
}

function formatDate(isoDate) {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}-${month}-${date.getFullYear()}`;
}
