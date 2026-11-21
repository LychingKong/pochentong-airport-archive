"use client";

import { useState } from "react";

import HeroFlapCount from "./HeroFlapCount";
import styles from "./MyEntries.module.css";
import MyEntriesEmpty from "./MyEntriesEmpty";
import MyEntriesOverview from "./MyEntriesOverview";
import MyEntriesSort from "./MyEntriesSort";
import MyEntryCard from "./MyEntryCard";

// The /my-entries page: a heading, the number of entries with a sort menu,
// then every entry this user has submitted as a card that opens it.
// `entries` come from app/my-entries/page.js (only this user's, newest
// first); "Oldest First" just reverses them, no new query. With none, the
// "Your Story Starts Here" empty state shows instead.
export default function MyEntriesList({ entries }) {
  const [order, setOrder] = useState("newest");

  if (entries.length === 0) return <MyEntriesEmpty />;

  const shown = order === "newest" ? entries : [...entries].reverse();

  return (
    <section className={styles.listing}>
      <MyEntriesOverview />

      <div className={styles.toolbar}>
        {/* The count as split-flap departure-board tiles, the same
            component as on the homepage. */}
        <div className={styles.countFlap}>
          <HeroFlapCount entries={entries} />
        </div>
        <MyEntriesSort value={order} onChange={setOrder} />
      </div>

      <ul className={styles.grid}>
        {shown.map((entry) => (
          <li key={entry.id} data-reveal>
            <MyEntryCard entry={entry} />
          </li>
        ))}
      </ul>
    </section>
  );
}
