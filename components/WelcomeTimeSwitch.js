"use client";

import { WELCOME_TIMES } from "../lib/useWelcomeTime";
import { useLanguage } from "./LanguageProvider";
import styles from "./WelcomeScreen.module.css";

// The welcome screen's Morning / Sunset / Night switch: three icon
// buttons (sun, setting sun, moon) that change the runway scenery.
const ICONS = {
  morning:
    "M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zM12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8",
  sunset:
    "M7 16a5 5 0 0 1 10 0M3 16h18M5 20h14M12 4v3.5M5.6 9.6l1.8 1.8M18.4 9.6l-1.8 1.8",
  night: "M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z",
};

export default function WelcomeTimeSwitch({ time, onChange }) {
  const { t } = useLanguage();
  const copy = t.welcomeTime;

  return (
    <div className={styles.timeSwitch} role="group" aria-label={copy.label}>
      {WELCOME_TIMES.map((option) => (
        <button
          key={option}
          type="button"
          className={styles.timeOption}
          aria-pressed={time === option}
          aria-label={copy[option]}
          title={copy[option]}
          onClick={() => onChange(option)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d={ICONS[option]} />
          </svg>
        </button>
      ))}
    </div>
  );
}
