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
import MenuToggle from "./MenuToggle";
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

  // Phones only: the ☰ menu panel. Escape closes it.
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event) =>
      event.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  // A floating capsule bar: brand left, page links centred, tools right.
  // On phones: logo, Contribute, account and ☰; the links and switches
  // move into the panel ☰ opens (see Header.module.css).
  const barClass = `${styles.bar} ${menuOpen ? styles.open : ""}`;
  return (
    <header className={styles.header}>
      <div className={barClass}>
        <BrandLink />

        {/* Page links (signed in). Signed out, the panel offers Sign In. */}
        <nav
          id="header-menu"
          className={styles.nav}
          onClick={() => setMenuOpen(false)}
        >
          {user ? (
            <>
              <MyEntriesButton />
              <ReviewLink />
            </>
          ) : (
            <a
              href="/login"
              className={`${buttons.button} ${buttons.ghost} ${styles.menuOnly}`}
            >
              {t.login}
            </a>
          )}
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
                className={`${buttons.button} ${buttons.secondary} ${styles.barOnly}`}
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
          <MenuToggle
            open={menuOpen}
            onToggle={() => setMenuOpen((open) => !open)}
          />
        </div>
      </div>
    </header>
  );
}
