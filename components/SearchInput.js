"use client";

import { useLanguage } from "./LanguageProvider";
import styles from "./SearchInput.module.css";

// Only the look lives here; ArchiveGrid does the filtering.
export default function SearchInput({ value, onChange, placeholder }) {
  const { t } = useLanguage();

  return (
    <div className={styles.wrap}>
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className={styles.input}
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className={styles.clear}
          aria-label={t.clearSearchLabel}
        >
          ×
        </button>
      ) : null}
    </div>
  );
}
