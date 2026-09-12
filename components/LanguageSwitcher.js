"use client";

import { useLanguage } from "./LanguageProvider";

const styles = {
  bar: {
    maxWidth: 1160,
    margin: "0 auto",
    padding: "20px clamp(20px, 5vw, 24px) 0",
    display: "flex",
    justifyContent: "flex-end",
  },
  group: {
    display: "inline-flex",
    border: "1px solid #E7E3DB",
    borderRadius: 999,
    overflow: "hidden",
  },
};

function buttonStyle(active) {
  return {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    letterSpacing: 0.5,
    padding: "6px 14px",
    border: "none",
    cursor: "pointer",
    backgroundColor: active ? "#211F1B" : "transparent",
    color: active ? "#FAF9F6" : "#7C7568",
  };
}

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div style={styles.bar}>
      <div style={styles.group} role="group" aria-label="Language switch">
        <button
          type="button"
          style={buttonStyle(language === "en")}
          onClick={() => setLanguage("en")}
          aria-pressed={language === "en"}
        >
          EN
        </button>
        <button
          type="button"
          style={buttonStyle(language === "km")}
          onClick={() => setLanguage("km")}
          aria-pressed={language === "km"}
        >
          ខ្មែរ
        </button>
      </div>
    </div>
  );
}
