"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { uiText } from "../lib/translations";

const STORAGE_KEY = "pochentong-language";

const LanguageContext = createContext(null);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export default function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("en");

  // Restore the visitor's saved language after mount (kept out of the
  // initial render so server and first client render match, avoiding a
  // hydration mismatch).
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "km") {
        setLanguageState(stored);
      }
    } catch {
      // localStorage unavailable (e.g. private browsing) — keep default.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "km" ? "km" : "en";
  }, [language]);

  function setLanguage(next) {
    setLanguageState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage unavailable — language still updates for this session.
    }
  }

  const value = {
    language,
    setLanguage,
    t: uiText[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
