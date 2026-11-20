"use client";

import Link from "next/link";

import { useLanguage } from "./LanguageProvider";

const style = {
  display: "inline-block",
  fontFamily: "'Courier New', monospace",
  fontSize: 13,
  letterSpacing: 1,
  color: "var(--color-accent)",
  textDecoration: "none",
  marginBottom: "clamp(28px, 4vw, 40px)",
};

// Pages can pass a className to restyle the link (the entry page shows it
// as a pill); without one it keeps the plain inline style above.
export default function BackLink({ className }) {
  const { t } = useLanguage();

  return (
    <Link
      href="/"
      className={className}
      style={className ? undefined : style}
      data-direction="back"
    >
      {t.backToHome}
    </Link>
  );
}
