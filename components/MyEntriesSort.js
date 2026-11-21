"use client";

import AuthIcon from "./AuthIcon";
import { useLanguage } from "./LanguageProvider";
import styles from "./MyEntries.module.css";

// The "Newest First / Oldest First" menu on /my-entries. A native <select>
// (keyboard and screen-reader friendly), styled as a pill with a sort icon
// on the left and a chevron on the right.
export default function MyEntriesSort({ value, onChange }) {
  const { t } = useLanguage();
  const copy = t.myEntriesDashboard;

  return (
    <label className={styles.sort}>
      <span className={styles.srOnly}>{copy.sortLabel}</span>
      <AuthIcon name="sort" className={styles.sortIcon} />
      <select
        className={styles.sortSelect}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="newest">{copy.newest}</option>
        <option value="oldest">{copy.oldest}</option>
      </select>
      <AuthIcon name="chevronDown" className={styles.sortChevron} />
    </label>
  );
}
