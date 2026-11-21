"use client";

import { useState } from "react";

import { countByStatus, visibleItems } from "../lib/reviewBoard";
import { useLanguage } from "./LanguageProvider";
import ReviewBoardHeader from "./ReviewBoardHeader";
import ReviewDialog from "./ReviewDialog";
import ReviewEmpty from "./ReviewEmpty";
import ReviewEntryCard from "./ReviewEntryCard";
import styles from "./ReviewWorkspace.module.css";

const messageStyle = { fontSize: 16, color: "var(--color-muted)" };

// The reviewer's board on /review: summary cards, status tabs and a sort
// menu, then the entries (every status) as cards. Once review_entry
// confirms a decision (ReviewDecision), that card's status changes in
// place and the counts follow. With nothing pending, "All Caught Up!"
// shows.
export default function ReviewQueue({ isReviewer, entries }) {
  const { t } = useLanguage();
  // Each entry starts with its real status from the database.
  const [items, setItems] = useState(() =>
    entries.map((entry) => ({ ...entry, reviewStatus: entry.status })),
  );
  const [filter, setFilter] = useState("all");
  const [order, setOrder] = useState("newest");
  const [openId, setOpenId] = useState(null);
  const [notice, setNotice] = useState(null);

  if (!isReviewer) return <p style={messageStyle}>{t.reviewNotReviewer}</p>;

  const counts = countByStatus(items);
  if (counts.pending === 0) return <ReviewEmpty />;

  // Called only after review_entry returned true for this entry.
  function handleReviewed(id, decision, note) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, reviewStatus: decision, review_note: note }
          : item,
      ),
    );
    setOpenId(null);
    setNotice(`${decision}Notice`);
  }

  const shown = visibleItems(items, filter, order);
  const open = items.find((item) => item.id === openId);

  return (
    <section className={styles.board}>
      <ReviewBoardHeader
        counts={counts}
        notice={notice}
        filter={filter}
        onFilter={setFilter}
        order={order}
        onOrder={setOrder}
      />

      {shown.length > 0 ? (
        <ul className={styles.grid}>
          {shown.map((item) => (
            <li key={item.id}>
              <ReviewEntryCard entry={item} onOpen={setOpenId} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.none}>{t.reviewWorkspace.noneForFilter}</p>
      )}

      {open ? (
        <ReviewDialog
          key={open.id}
          entry={open}
          onClose={() => setOpenId(null)}
          onReviewed={handleReviewed}
        />
      ) : null}
    </section>
  );
}
