"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "../lib/supabase/client";
import AccountMenu from "./AccountMenu";
import BrandLink from "./BrandLink";
import ContributeButton from "./ContributeButton";
import styles from "./Header.module.css";
import { useLanguage } from "./LanguageProvider";
import LanguageToggle from "./LanguageToggle";
import MyEntriesButton from "./MyEntriesButton";
import buttons from "./NavButton.module.css";
import ReviewLink from "./ReviewLink";
import ThemeToggle from "./ThemeToggle";

// Brand on the left; actions, then the language and theme switches.
export default function Header() {
  const { t } = useLanguage();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      // getSession reads the saved login on this device (no network call), so
      // the header appears right away on every page.
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  // A floating capsule bar: brand left, page links centred, tools right.
  // On phones it becomes two rows (see Header.module.css).
  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <BrandLink />

        {/* Page links for signed-in visitors; empty when signed out. */}
        <nav className={styles.nav}>
          {user ? (
            <>
              <MyEntriesButton />
              <ReviewLink />
            </>
          ) : null}
        </nav>

        <div className={styles.right}>
          <div className={styles.tools}>
            <LanguageToggle />
            <ThemeToggle />
          </div>
          {/* Signed out: one Sign In button (the sign-in page links to
              sign-up for new visitors), then Contribute. */}
          <div className={styles.cta}>
            {user ? null : (
              <a
                href="/login"
                className={`${buttons.button} ${buttons.secondary}`}
              >
                {t.login}
              </a>
            )}
            <ContributeButton />
          </div>
          {/* Signed in: the account circle with the email and Log Out. */}
          {user ? (
            <div className={styles.account}>
              <AccountMenu email={user.email} onLogout={handleLogout} />
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
