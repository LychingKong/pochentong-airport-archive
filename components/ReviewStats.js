"use client";

import AuthIcon from "./AuthIcon";
import { useLanguage } from "./LanguageProvider";
import styles from "./ReviewWorkspace.module.css";

// The four summary cards on the /review board: Total, Published, Pending,
// Returned. Each has its own soft color, an icon, the count, and a faint
// airport drawing in the corner (tower, plane, terminal).
const TOWER = "M44 8v6M36 14h16l2 8H34zM33 22h22v8H33zM39 30h10v42H39z";
const PLANE =
  "M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z";
const TERMINAL = "M4 40L84 34v6L4 46zM8 46l72-6v32H8zM14 52h60M14 62h60";

const CARDS = [
  { key: "all", label: "total", icon: "layers", art: TOWER },
  {
    key: "published",
    label: "published",
    icon: "check",
    art: PLANE,
    plane: true,
  },
  { key: "pending", label: "pending", icon: "clock", art: TERMINAL },
  { key: "returned", label: "returned", icon: "undo", art: TERMINAL },
];

export default function ReviewStats({ counts }) {
  const { t } = useLanguage();
  const copy = t.reviewWorkspace;

  return (
    <ul className={styles.stats}>
      {CARDS.map(({ key, label, icon, art, plane }) => (
        <li key={key} className={`${styles.stat} ${styles[`tone_${key}`]}`}>
          <span className={styles.statIcon} aria-hidden="true">
            <AuthIcon name={icon} />
          </span>
          <span className={styles.statText}>
            <span className={styles.statLabel}>{copy[label]}</span>
            <span className={styles.statCount}>{counts[key]}</span>
          </span>
          <svg
            className={styles.statArt}
            viewBox={plane ? "0 0 24 24" : "0 0 88 76"}
            aria-hidden="true"
          >
            <path d={art} transform={plane ? "rotate(80 12 12)" : undefined} />
          </svg>
        </li>
      ))}
    </ul>
  );
}
