import collection from "../../collection.config.js";
import BackLink from "../../components/BackLink";
import Header from "../../components/Header";
import ReviewQueue from "../../components/ReviewQueue";
import ReviewRestricted from "../../components/ReviewRestricted";
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
  // The restricted screen uses the homepage's padding (no gap above the
  // floating navbar). The reviewer view above is left as it was.
  restrictedWrap: {
    boxSizing: "border-box",
    maxWidth: 1160,
    margin: "0 auto",
    padding: "0 clamp(16px, 4vw, 32px) clamp(48px, 7vw, 80px)",
  },
};

export default async function ReviewPage() {
  const supabase = await createClient();

  // Check the role before any entries are loaded. The database still decides
  // what each reviewer may change (review_entry); this check keeps the page tidy.
  const { data: isReviewer, error } = await supabase.rpc("is_reviewer");
  if (error) console.error("Reviewer check failed:", error);

  // Not a reviewer (or the check failed): show the restricted screen and
  // stop here, before the pending entries are ever queried.
  if (isReviewer !== true) {
    return (
      <main style={styles.restrictedWrap}>
        <Header />
        <ReviewRestricted />
      </main>
    );
  }

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
