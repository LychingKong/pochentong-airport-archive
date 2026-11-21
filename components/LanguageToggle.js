"use client";

import { useLanguage } from "./LanguageProvider";
import styles from "./LanguageToggle.module.css";

const OPTIONS = [
  { code: "en", label: "EN" },
  { code: "km", label: "ខ្មែរ" },
];

// The EN / ខ្មែរ switch in the header (and the welcome screen's corner,
// which restyles it through `className`). setLanguage also saves the
// choice (see LanguageProvider), exactly as the old EN / KH buttons did.
export default function LanguageToggle({ className }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`${styles.group} ${className ?? ""}`}
      role="group"
      aria-label="Language"
    >
      {OPTIONS.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          lang={code}
          className={styles.option}
          aria-pressed={language === code}
          onClick={() => setLanguage(code)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
