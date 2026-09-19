"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "./LanguageProvider";
import { createClient } from "../lib/supabase/client";

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "clamp(40px, 6vw, 64px)",
    paddingBottom: 16,
    borderBottom: "1px solid #E7E3DB",
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
  languageButton: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    letterSpacing: 1,
    padding: "6px 10px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E7E3DB",
    backgroundColor: "transparent",
    color: "#9C6B3F",
    cursor: "pointer",
    textTransform: "uppercase",
  },
  languageButtonActive: {
    backgroundColor: "#9C6B3F",
    color: "#FFF",
    borderColor: "#9C6B3F",
  },
  userEmail: {
    fontSize: 14,
    color: "#7C7568",
    margin: 0,
  },
  authLink: {
    fontSize: 14,
    color: "#9C6B3F",
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
    borderColor: "#9C6B3F",
    backgroundColor: "transparent",
    color: "#9C6B3F",
    cursor: "pointer",
  },
  logoutButtonHover: {
    backgroundColor: "#9C6B3F",
    color: "#FFF",
  },
};

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [linkHovered, setLinkHovered] = useState(null);
  const [buttonHovered, setButtonHovered] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      setUser(currentUser);
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
    <div style={styles.header}>
      <div />
      <div style={styles.headerContent}>
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

        {user ? (
          <>
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
              Log Out
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
              Sign In
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
              Sign Up
            </a>
          </>
        )}
      </div>
    </div>
  );
}
