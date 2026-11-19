"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { createClient } from "../lib/supabase/client";
import { useLanguage } from "./LanguageProvider";
import styles from "./NavButton.module.css";

// Only reviewers see this link. Hiding it is tidiness; review_entry is the gate.
export default function ReviewLink() {
  const { t } = useLanguage();
  const [isReviewer, setIsReviewer] = useState(false);
  const current = usePathname() === "/review";

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
      className={`${styles.button} ${styles.ghost}`}
      aria-current={current ? "page" : undefined}
    >
      {t.reviewLink}
    </Link>
  );
}
