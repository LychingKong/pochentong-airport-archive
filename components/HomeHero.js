"use client";

import HeroFeatured from "./HeroFeatured";
import HeroFlapCount from "./HeroFlapCount";
import HeroSky from "./HeroSky";
import HeroTitle from "./HeroTitle";
import styles from "./HomeHero.module.css";
import { useLanguage } from "./LanguageProvider";
import PlaneIllustration from "./PlaneIllustration";

// Glide down to the collection instead of jumping. It still stops below
// the sticky header (scroll-margin-top on #collection in page.module.css).
// Visitors who ask for reduced motion keep the instant jump; without
// JavaScript the plain #collection link still works.
function scrollToCollection(event) {
  const target = document.getElementById("collection");
  if (!target) return;
  event.preventDefault();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({
    behavior: reduce ? "auto" : "smooth",
    block: "start",
  });
}

// Homepage hero: title top-left, entry count top-right, then a soft stage
// with an airliner breaking out of its top edge. The description sits in a
// notch cut from the stage's bottom-left; the newest story floats on the right.
// `collection` is already in the selected language (see app/page.js).
export default function HomeHero({ collection, entries }) {
  const { t } = useLanguage();
  const newest = entries[0];

  return (
    <section className={styles.hero}>
      <div className={styles.top} data-reveal>
        <div className={styles.headline}>
          <p className={`subtitle ${styles.kicker}`}>{t.kicker}</p>
          <HeroTitle name={collection.name} lines={collection.nameLines} />
        </div>
        <HeroFlapCount entries={entries} />
      </div>

      <div className={styles.stage} data-reveal>
        <div className={styles.panelWrap}>
          <div className={styles.panel} aria-hidden="true">
            <HeroSky />
          </div>
          <PlaneIllustration className={styles.plane} />
        </div>

        <div className={styles.notch}>
          {/* PNH: Pochentong's airport code */}
          <p className={styles.code}>PNH</p>
          <p className={styles.description}>{collection.description}</p>
          <a
            href="#collection"
            className={styles.jump}
            aria-label={t.collectionSectionTitle}
            onClick={scrollToCollection}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M12 5v14M6 13l6 6 6-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {newest ? <HeroFeatured entry={newest} /> : null}
      </div>
    </section>
  );
}
