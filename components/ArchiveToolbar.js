"use client";

import styles from "./ArchiveGrid.module.css";
import { useLanguage } from "./LanguageProvider";
import MyEntriesSort from "./MyEntriesSort";
import SearchInput from "./SearchInput";

// The homepage collection's toolbar: the title and live count on the left;
// the search box and the Newest First / Oldest First menu (the same one as
// on /my-entries) on the right. Stacks on phones. ArchiveGrid does the
// searching and sorting.
export default function ArchiveToolbar({
  count,
  query,
  onQuery,
  order,
  onOrder,
}) {
  const { t } = useLanguage();

  return (
    <div className={styles.toolbar} data-reveal>
      <div className={styles.heading}>
        <h2 className={styles.title}>{t.collectionSectionTitle}</h2>
        <span className={styles.count}>
          {count} {count === 1 ? t.entryCountSingular : t.entryCountPlural}
        </span>
      </div>
      <div className={styles.controls}>
        <SearchInput
          value={query}
          onChange={onQuery}
          placeholder={t.searchPlaceholder}
        />
        <MyEntriesSort value={order} onChange={onOrder} />
      </div>
    </div>
  );
}
