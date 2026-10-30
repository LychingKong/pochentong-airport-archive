import collection from "../../collection.config.js";
import BackLink from "../../components/BackLink";
import Header from "../../components/Header";
import ReviewQueue from "../../components/ReviewQueue";
import { createClient } from "../../lib/supabase/server";

export const metadata = {
  title: `Review — ${collection.name}`,
};

const styles = {
  wrap: {
    maxWidth: 1160,
    margin: "0 auto",
    padding: "clamp(56px, 9vw, 96px) clamp(20px, 5vw, 24px) 64px",
  },
};

export default async function ReviewPage() {
  const supabase = await createClient();

  // Check the role before any entries are loaded. The database still decides
  // what each reviewer may change (review_entry); this check keeps the page tidy.
  const { data: isReviewer, error } = await supabase.rpc("is_reviewer");
  if (error) console.error("Reviewer check failed:", error);

  let entries = [];
  if (isReviewer === true) {
    // Oldest first, so the entry that has waited longest is at the top.
    const { data } = await supabase
      .from("entries")
      .select(
        "id, title, title_km, description, description_km, story, story_km, tags, tags_km, images, created_at",
      )
      .eq("status", "pending")
      .order("created_at", { ascending: true });
    entries = data ?? [];
  }

  return (
    <main style={styles.wrap}>
      <Header />
      <BackLink />
      <ReviewQueue isReviewer={isReviewer === true} entries={entries} />
    </main>
  );
}
