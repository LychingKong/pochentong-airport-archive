import styles from "./ContributeHeroArt.module.css";
import ContributeHeroPen from "./ContributeHeroPen";

// The drawing beside the "Share Your Memory" heading: an open memory
// journal. On the left page, a photo of the old terminal taped in above a
// few handwritten lines; on the right page, lines of writing with a pen
// finishing the last one (ContributeHeroPen); a PNH boarding pass tucked
// in as a bookmark; and a paper plane leaving the book on a dashed trail,
// taking the memory to the archive. Decorative only.
const WRITING = "M0 0q6-5 12 0t12 0t12 0t12 0t12 0t12 0t12 0t12 0t12 0t12 0";

export default function ContributeHeroArt() {
  return (
    <svg className={styles.art} viewBox="0 0 440 300" aria-hidden="true">
      <ellipse cx="214" cy="278" rx="170" ry="12" className={styles.shadow} />

      {/* the boarding pass bookmark, tucked in behind the right page */}
      <g transform="translate(300 40) rotate(8)">
        <rect width="54" height="86" rx="6" className={styles.pass} />
        <rect width="54" height="18" rx="6" className={styles.passBand} />
        <text x="27" y="44" className={styles.passText}>
          PNH
        </text>
        <path d="M10 56h34M10 64h22" className={styles.passLine} />
      </g>

      {/* the journal: navy cover, two cream pages, the spine */}
      <path
        d="M30 96l184 14 184-14v176l-184 12-184-12z"
        className={styles.cover}
      />
      <path d="M40 88l174 16v170L40 262z" className={styles.page} />
      <path d="M388 88l-174 16v170l174-12z" className={styles.page} />
      <path d="M214 104v170" className={styles.spine} />

      {/* left page: a taped photo of the terminal, then handwriting */}
      <g transform="translate(62 104) rotate(-4)">
        <rect width="118" height="86" rx="3" className={styles.photoCard} />
        <rect x="7" y="7" width="104" height="60" className={styles.photoSky} />
        <circle cx="86" cy="50" r="10" className={styles.photoSun} />
        <path
          d="M7 67V54q9-10 18 0q9-10 18 0q9-10 18 0q9-10 18 0q9-10 17 0q9-10 15 0V67z"
          className={styles.photoBuilding}
        />
        <rect x="38" y="-8" width="40" height="14" className={styles.tape} />
      </g>
      {[208, 226, 244].map((y, i) => (
        <path
          key={y}
          d={WRITING}
          transform={`translate(66 ${y}) scale(${i === 2 ? 0.7 : 1} 1)`}
          className={styles.writing}
        />
      ))}

      {/* right page: lines of writing, the last one being written */}
      {[126, 146, 166, 186, 206].map((y) => (
        <path
          key={y}
          d={WRITING}
          transform={`translate(238 ${y})`}
          className={styles.writing}
        />
      ))}
      <path
        d={WRITING}
        transform="translate(238 226) scale(0.8 1)"
        className={`${styles.writing} ${styles.writingNow}`}
      />
      <ContributeHeroPen />
    </svg>
  );
}
