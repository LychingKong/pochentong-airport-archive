"use client";

import { useState } from "react";
import Link from "next/link";

import { useLanguage } from "./LanguageProvider";

// Outlined sibling of ContributeButton: Contribute is the filled main action,
// this one is secondary and matches the Log Out button beside it.
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

export default function MyEntriesButton() {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/my-entries"
      style={{ ...styles.button, ...(hovered ? styles.hover : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {t.myEntries}
    </Link>
  );
}
