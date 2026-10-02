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

export default function BackLink() {
  const { t } = useLanguage();

  return (
    <Link href="/" style={style}>
      {t.backToArchive}
    </Link>
  );
}
