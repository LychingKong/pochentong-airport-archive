"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "../lib/supabase/client";
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

  const ghost = `${buttons.button} ${buttons.ghost}`;

  return (
    <header className={styles.header}>
      <BrandLink />
      <div className={styles.nav}>
        <ContributeButton />
        {user ? (
          <>
            <MyEntriesButton />
            <ReviewLink />
            <span className={styles.userEmail} title={user.email}>
              {user.email}
            </span>
            <button type="button" onClick={handleLogout} className={ghost}>
              {t.logOut}
            </button>
          </>
        ) : (
          <>
            <a href="/login" className={ghost}>
              {t.login}
            </a>
            <a
              href="/signup"
              className={`${buttons.button} ${buttons.secondary}`}
            >
              {t.signup}
            </a>
          </>
        )}
        <span className={styles.divider} aria-hidden="true" />
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}
