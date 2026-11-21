"use client";

import AuthIcon from "./AuthIcon";
import { useLanguage } from "./LanguageProvider";
import styles from "./ReviewWorkspace.module.css";

// The status tabs on the /review board: All Entries, Published, Pending,
// Returned, each with an icon and its count. aria-pressed marks the one on.
const TABS = [
  { key: "all", label: "all", icon: null },
  { key: "published", label: "published", icon: "check" },
  { key: "pending", label: "pending", icon: "clock" },
  { key: "returned", label: "returned", icon: "undo" },
];

export default function ReviewFilters({ counts, active, onChange }) {
  const { t } = useLanguage();
  const copy = t.reviewWorkspace;

  return (
    <div className={styles.filters} role="group" aria-label={copy.filterLabel}>
      {TABS.map(({ key, label, icon }) => (
        <button
          key={key}
          type="button"
          className={styles.filter}
          aria-pressed={active === key}
          onClick={() => onChange(key)}
        >
          {icon ? <AuthIcon name={icon} /> : null}
          {copy[label]} ({counts[key]})
        </button>
      ))}
    </div>
  );
}
