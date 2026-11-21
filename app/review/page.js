import collection from "../../collection.config.js";
import Header from "../../components/Header";
import ReviewQueue from "../../components/ReviewQueue";
import ReviewRestricted from "../../components/ReviewRestricted";
import { createClient } from "../../lib/supabase/server";

export const metadata = {
  title: `Review — ${collection.name}`,
};

// Same width and padding as the homepage (app/page.module.css): no space
// above the floating navbar, which brings its own. Used by both the
// reviewer view and the restricted screen.
const styles = {
  wrap: {
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
      <main style={styles.wrap}>
        <Header />
        <ReviewRestricted />
      </main>
    );
  }

  let entries = [];
  if (isReviewer === true) {
    // Entries in every status, so the board's Published / Pending / Returned
    // counts and tabs are real. Reviewers may already read all entries (the
    // read policy allows published OR owner OR reviewer); this query only
    // runs after the is_reviewer check above. Oldest first, so the entry
    // that has waited longest comes first.
    const { data } = await supabase
      .from("entries")
      .select(
        "id, title, title_km, description, description_km, story, story_km, tags, tags_km, images, status, review_note, created_at",
      )
      .order("created_at", { ascending: true });
    entries = data ?? [];
  }

  return (
    <main style={styles.wrap}>
      <Header />
      <ReviewQueue isReviewer={isReviewer === true} entries={entries} />
    </main>
  );
}
