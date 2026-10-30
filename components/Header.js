"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "../lib/supabase/client";
import ContributeButton from "./ContributeButton";
import headerStyles from "./Header.module.css";
import { useLanguage } from "./LanguageProvider";
import MyEntriesButton from "./MyEntriesButton";
import ReviewLink from "./ReviewLink";
import ThemeToggle from "./ThemeToggle";

const styles = {
  languageButton: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    letterSpacing: 1,
    padding: "6px 10px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--color-line)",
    backgroundColor: "transparent",
    color: "var(--color-accent)",
    cursor: "pointer",
    textTransform: "uppercase",
  },
  languageButtonActive: {
    backgroundColor: "var(--color-accent)",
    color: "var(--color-on-accent)",
    borderColor: "var(--color-accent)",
  },
  userEmail: {
    fontSize: 14,
    color: "var(--color-muted)",
    margin: 0,
  },
  authLink: {
    fontSize: 14,
    color: "var(--color-accent)",
    textDecoration: "none",
    marginLeft: 16,
  },
  authLinkHover: {
    textDecoration: "underline",
  },
  logoutButton: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 14,
    fontWeight: 600,
    padding: "8px 16px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--color-accent)",
    backgroundColor: "transparent",
    color: "var(--color-accent)",
    cursor: "pointer",
  },
  logoutButtonHover: {
    backgroundColor: "var(--color-accent)",
    color: "var(--color-on-accent)",
  },
};

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [linkHovered, setLinkHovered] = useState(null);
  const [buttonHovered, setButtonHovered] = useState(false);

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

  return (
    <div className={headerStyles.header}>
      <div className={headerStyles.headerContent}>
        <button
          onClick={() => setLanguage("en")}
          style={{
            ...styles.languageButton,
            ...(language === "en" ? styles.languageButtonActive : {}),
          }}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage("km")}
          style={{
            ...styles.languageButton,
            ...(language === "km" ? styles.languageButtonActive : {}),
          }}
        >
          KH
        </button>

        <ThemeToggle />

        <ContributeButton />

        {user ? (
          <>
            <MyEntriesButton />
            <ReviewLink />
            <p style={styles.userEmail}>{user.email}</p>
            <button
              onClick={handleLogout}
              style={{
                ...styles.logoutButton,
                ...(buttonHovered ? styles.logoutButtonHover : {}),
              }}
              onMouseEnter={() => setButtonHovered(true)}
              onMouseLeave={() => setButtonHovered(false)}
            >
              {t.logOut}
            </button>
          </>
        ) : (
          <>
            <a
              href="/login"
              style={{
                ...styles.authLink,
                ...(linkHovered === "login" ? styles.authLinkHover : {}),
              }}
              onMouseEnter={() => setLinkHovered("login")}
              onMouseLeave={() => setLinkHovered(null)}
            >
              {t.login}
            </a>
            <a
              href="/signup"
              style={{
                ...styles.authLink,
                ...(linkHovered === "signup" ? styles.authLinkHover : {}),
              }}
              onMouseEnter={() => setLinkHovered("signup")}
              onMouseLeave={() => setLinkHovered(null)}
            >
              {t.signup}
            </a>
          </>
        )}
      </div>
    </div>
  );
}
