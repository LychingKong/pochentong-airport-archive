import styles from "./ContributeHeroArt.module.css";

// Part of the journal drawing (ContributeHeroArt): the pen resting on the
// right page as it writes, and a paper plane leaving the book on a dashed
// trail with a few sparkles. An SVG group.
const SPARKLE = "M0-6l1.5 4.5L6 0l-4.5 1.5L0 6l-1.5-4.5L-6 0l4.5-1.5z";

export default function ContributeHeroPen() {
  return (
    <g>
      {/* the pen, tip on the line being written */}
      <g className={styles.pen}>
        <path d="M322 232l52-62 12 10-52 62-16 6z" className={styles.penBody} />
        <path d="M374 170l12 10 6-7-12-10z" className={styles.penCap} />
        <path d="M322 232l12 10-16 6z" className={styles.penTip} />
      </g>

      {/* the paper plane taking the memory to the archive */}
      <path d="M214 96C226 60 268 34 330 22" className={styles.trail} />
      <g className={styles.plane}>
        <path d="M334 6l44 10-34 22-6-12z" className={styles.planeTop} />
        <path d="M338 26l6 12 4-14z" className={styles.planeFold} />
      </g>

      <g transform="translate(398 46)">
        <path d={SPARKLE} className={`${styles.sparkle} ${styles.twinkle}`} />
      </g>
      <g transform="translate(250 30) scale(0.7)">
        <path
          d={SPARKLE}
          className={`${styles.sparkle} ${styles.twinkleLate}`}
        />
      </g>
    </g>
  );
}
