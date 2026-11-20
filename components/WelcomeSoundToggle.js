"use client";

import { useLanguage } from "./LanguageProvider";
import styles from "./WelcomeScreen.module.css";

// Speaker button in the welcome screen's corner. Its label says the
// current state ("Sound on" / "Sound off"); the choice is remembered.
export default function WelcomeSoundToggle({ on, onToggle }) {
  const { t } = useLanguage();
  const label = on ? t.welcomeSoundOn : t.welcomeSoundOff;

  return (
    <button
      type="button"
      className={styles.soundToggle}
      onClick={onToggle}
      aria-label={label}
      title={label}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 9h4l5-4v14l-5-4H4z" />
        {on ? (
          <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />
        ) : (
          <path d="M17 9l5 6M22 9l-5 6" />
        )}
      </svg>
    </button>
  );
}
