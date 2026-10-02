"use client";

import { useEffect, useState } from "react";

import { switchTheme } from "../lib/themeTransition";
import { useLanguage } from "./LanguageProvider";

const style = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 30,
  height: 28,
  padding: 0,
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "var(--color-line)",
  backgroundColor: "transparent",
  color: "var(--color-accent)",
  cursor: "pointer",
};

// The theme in use right now: a saved choice, or else the device setting.
function currentTheme() {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === "light" || chosen === "dark") return chosen;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function ThemeToggle() {
  const { t } = useLanguage();
  const [theme, setTheme] = useState(null);

  useEffect(() => setTheme(currentTheme()), []);

  function toggle(event) {
    const next = currentTheme() === "dark" ? "light" : "dark";
    switchTheme(next, event.currentTarget, setTheme);
  }

  const isDark = theme === "dark";
  const label = isDark ? t.themeToLight : t.themeToDark;

  return (
    <button
      type="button"
      onClick={toggle}
      style={style}
      aria-label={label}
      title={label}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {isDark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : (
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        )}
      </svg>
    </button>
  );
}
