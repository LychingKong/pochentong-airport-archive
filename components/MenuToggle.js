"use client";

import styles from "./Header.module.css";
import { useLanguage } from "./LanguageProvider";

// The ☰ / ✕ button that opens the header's menu panel on phones. Hidden on
// larger screens (Header.module.css), where everything fits in the bar.
export default function MenuToggle({ open, onToggle }) {
  const { t } = useLanguage();

  return (
    <button
      type="button"
      className={styles.menuToggle}
      aria-expanded={open}
      aria-controls="header-menu"
      aria-label={open ? t.menuClose : t.menuOpen}
      onClick={onToggle}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {open ? (
          <path d="M6 6l12 12M18 6L6 18" />
        ) : (
          <path d="M4 7h16M4 12h16M4 17h16" />
        )}
      </svg>
    </button>
  );
}
