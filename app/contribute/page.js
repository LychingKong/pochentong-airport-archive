import collection from "../../collection.config.js";
import BackLink from "../../components/BackLink";
import ContributeForm from "../../components/ContributeForm";
import ContributeWelcome from "../../components/ContributeWelcome";
import Header from "../../components/Header";
import { createClient } from "../../lib/supabase/server";

export const metadata = {
  title: `Contribute — ${collection.name}`,
};

// Same width and padding as the homepage (app/page.module.css): no space
// above the floating header, which brings its own.
const styles = {
  wrap: {
    boxSizing: "border-box",
    maxWidth: 1160,
    margin: "0 auto",
    padding: "0 clamp(16px, 4vw, 32px) clamp(48px, 7vw, 80px)",
  },
};

// Photos for the welcome page's collage: the three newest published
// entries that have one (read-only, the same rows the homepage shows).
// Any failure just means fewer photos; the collage fills the gaps.
async function loadCollagePhotos(supabase) {
  const { data, error } = await supabase
    .from("entries")
    .select("id, title, title_km, images")
    .eq("status", "published")
    .not("images", "is", null)
    .order("created_at", { ascending: false })
    .limit(3);
  if (error || !data) return [];
  return data
    .map((row) => ({
      id: row.id,
      title: row.title || "",
      titleKm: row.title_km || "",
      image: row.images.split(",")[0].trim(),
    }))
    .filter((photo) => photo.image);
}

export default async function ContributePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Only visitors who are not signed in see the collage.
  const photos = user ? [] : await loadCollagePhotos(supabase);

  return (
    <main style={styles.wrap}>
      <Header />
      <BackLink />
      {/* Signed in: the submission form. Signed out: the welcome page
          inviting visitors to sign in or create an account. */}
      {user ? <ContributeForm /> : <ContributeWelcome photos={photos} />}
    </main>
  );
}
