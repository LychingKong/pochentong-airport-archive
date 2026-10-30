"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { createClient } from "../lib/supabase/client";
import { useLanguage } from "./LanguageProvider";

// Only reviewers see this link. Hiding it is tidiness; review_entry is the gate.
const styles = {
  button: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 14,
    fontWeight: 600,
    padding: "8px 16px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--color-accent)",
    backgroundColor: "transparent",
    color: "var(--color-accent)",
    textDecoration: "none",
    whiteSpace: "nowrap",
  },
  hover: {
    backgroundColor: "var(--color-accent)",
    color: "var(--color-on-accent)",
  },
};

export default function ReviewLink() {
  const { t } = useLanguage();
  const [isReviewer, setIsReviewer] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    async function checkReviewer() {
      const supabase = createClient();
      const { data } = await supabase.rpc("is_reviewer");
      setIsReviewer(data === true);
    }

    checkReviewer();
  }, []);

  if (!isReviewer) return null;

  return (
    <Link
      href="/review"
      style={{ ...styles.button, ...(hovered ? styles.hover : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {t.reviewLink}
    </Link>
  );
}
