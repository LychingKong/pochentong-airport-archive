import { useState } from "react";

import { createClient } from "./supabase/client";

// Sends a reviewer's decision for one entry to the review_entry database
// function (the same call ReviewCard used to make). `busy` is the decision
// being saved ("published" | "returned") or null; `failed` turns on when
// the save did not go through. onReviewed(entryId, decision, note) is called
// only when review_entry returns true.
export function useReviewDecision(entryId, { onSavingChange, onReviewed }) {
  const [busy, setBusy] = useState(null);
  const [failed, setFailed] = useState(false);

  async function decide(decision, reviewNote = null) {
    setBusy(decision);
    onSavingChange(true);
    setFailed(false);
    const supabase = createClient();
    // Only a return sends a note; review_entry clears it on publish anyway.
    const { data, error } = await supabase.rpc("review_entry", {
      entry_id: entryId,
      decision,
      note: reviewNote,
    });

    // review_entry returns false, without an error, when it refuses. Only
    // true means the entry was reviewed, so the check has to be data === true.
    if (error || data !== true) {
      console.error("Review not saved:", entryId, error ?? data);
      setFailed(true);
      setBusy(null);
      onSavingChange(false);
      return;
    }
    onReviewed(entryId, decision, reviewNote);
  }

  return { busy, failed, decide };
}
