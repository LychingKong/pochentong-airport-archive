"use client";

import { useState } from "react";
import Link from "next/link";

import { useLanguage } from "./LanguageProvider";

const styles = {
  button: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 14,
    fontWeight: 600,
    padding: "8px 16px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--color-accent)",
    backgroundColor: "var(--color-accent)",
    color: "var(--color-on-accent)",
    textDecoration: "none",
    whiteSpace: "nowrap",
  },
  hover: {
    backgroundColor: "var(--color-accent-hover)",
    borderColor: "var(--color-accent-hover)",
  },
};

export default function ContributeButton() {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/contribute"
      style={{ ...styles.button, ...(hovered ? styles.hover : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {t.contributeButton}
    </Link>
  );
}
