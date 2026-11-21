"use client";

import BackLink from "./BackLink";
import HeroFlapCount from "./HeroFlapCount";
import { useLanguage } from "./LanguageProvider";
import MyEntriesSort from "./MyEntriesSort";
import ReviewFilters from "./ReviewFilters";
import ReviewStats from "./ReviewStats";
import styles from "./ReviewWorkspace.module.css";

// The top of the /review board: back link, heading with the number still
// waiting, the summary cards, the message after a decision, and the
// status tabs with the sort menu.
// `compact` (nothing pending; "All Caught Up!" is above) leaves out the
// back link and heading, which that panel already covers.
export default function ReviewBoardHeader({
  compact,
  counts,
  notice,
  filter,
  onFilter,
  order,
  onOrder,
}) {
  const { t } = useLanguage();
  const copy = t.reviewWorkspace;

  return (
    <>
      {compact ? null : (
        <>
          <BackLink />
          <header className={styles.head}>
            <div>
              {/* In English the "subtitle" class (theme.css) makes this handwritten. */}
              <p className={`subtitle ${styles.kicker}`}>{copy.kicker}</p>
              <h1 className={styles.title}>{t.reviewTitle}</h1>
            </div>
            {/* How many are waiting, as split-flap tiles like the homepage. */}
            <div className={styles.waiting}>
              <HeroFlapCount count={counts.pending} label={copy.waitingLabel} />
            </div>
          </header>
        </>
      )}

      <ReviewStats counts={counts} />
      {notice ? (
        <p className={styles.notice} role="status">
          {copy[notice]}
        </p>
      ) : null}

      <div className={styles.toolbar}>
        <ReviewFilters counts={counts} active={filter} onChange={onFilter} />
        <MyEntriesSort value={order} onChange={onOrder} />
      </div>
    </>
  );
}
