import collection from "../../collection.config.js";
import BackLink from "../../components/BackLink";
import ContributeForm from "../../components/ContributeForm";
import Header from "../../components/Header";
import LoginPrompt from "../../components/LoginPrompt";
import { createClient } from "../../lib/supabase/server";

export const metadata = {
  title: `Contribute — ${collection.name}`,
};

const styles = {
  wrap: {
    maxWidth: 1160,
    margin: "0 auto",
    padding: "clamp(56px, 9vw, 96px) clamp(20px, 5vw, 24px) 64px",
  },
};

export default async function ContributePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main style={styles.wrap}>
      <Header />
      <BackLink />
      {user ? <ContributeForm /> : <LoginPrompt />}
    </main>
  );
}
