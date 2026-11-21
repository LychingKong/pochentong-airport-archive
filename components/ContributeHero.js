"use client";

import styles from "./ContributeForm.module.css";
import ContributeHeroArt from "./ContributeHeroArt";
import { useLanguage } from "./LanguageProvider";

// The top of the contribute/edit form: "Now boarding" in handwriting,
// "Share Your Memory" with an orange swoosh, and the intro, with a gate-
// window drawing on the right (hidden on phones). When editing, the edit
// kicker, heading and intro are shown instead.
export default function ContributeHero({ editing }) {
  const { t } = useLanguage();
  const copy = t.contributePass;

  return (
    <header className={styles.hero} data-reveal>
      <div className={styles.heroText}>
        <p className={`subtitle ${styles.heroKicker}`}>
          {editing ? t.editKicker : copy.kicker}
        </p>
        <h1 className={styles.heroTitle}>
          {editing ? (
            t.editTitle
          ) : (
            <>
              {copy.titleLead}{" "}
              <span className={styles.highlight}>{copy.titleHighlight}</span>
            </>
          )}
        </h1>
        <p className={styles.heroIntro}>{editing ? t.editIntro : copy.intro}</p>
      </div>
      <div className={styles.heroArt}>
        <ContributeHeroArt />
      </div>
    </header>
  );
}
