"use client";

import { collectionText } from "../lib/translations";
import { useLanguage } from "./LanguageProvider";
import styles from "./WelcomeScreen.module.css";

// The welcome screen's title and tagline. In Khmer, which has no spaces,
// the name is set on two hand-picked lines so it never breaks inside
// ពោធិ៍ចិនតុង.
export default function WelcomeTitle({ name }) {
  const { language, t } = useLanguage();

  return (
    <>
      <h1 className={styles.name}>
        {language === "km"
          ? collectionText.km.welcomeLines.map((line) => (
              <span key={line} className={styles.nameLine}>
                {line}
              </span>
            ))
          : name}
      </h1>
      <p className={styles.tagline}>{t.welcomeTagline}</p>
    </>
  );
}
