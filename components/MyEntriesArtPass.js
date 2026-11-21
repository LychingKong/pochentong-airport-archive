import styles from "./MyEntriesArt.module.css";

// The boarding pass in the /my-entries header drawing: a navy top strip,
// PNH → a star (to the archive), seat and gate marks, a punched hole, a
// dashed tear line and a barcode stub. Decorative only.
const BARS = [0, 5, 8, 14, 18, 21, 27, 32, 36, 41, 44];

export default function MyEntriesArtPass({ transform }) {
  return (
    <g transform={transform}>
      <g className={styles.floatB}>
        <rect width="228" height="92" rx="9" className={styles.card} />
        <path
          d="M0 9a9 9 0 0 1 9-9h210a9 9 0 0 1 9 9v13H0Z"
          className={styles.band}
        />
        <circle cx="14" cy="11" r="3" className={styles.bandDot} />
        <path d="M24 11H70" className={styles.bandLine} />

        <text x="16" y="60" className={styles.code}>
          PNH
        </text>
        <path d="M86 52H112" className={styles.trailStatic} />
        <path
          d="M124 44l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5z"
          className={styles.star}
        />

        <path d="M16 74H46M56 74H86M96 74H130" className={styles.rule} />
        <circle cx="160" cy="46" r="4" className={styles.hole} />
        <path d="M160 28V84" className={styles.tear} />
        {BARS.map((x) => (
          <path key={x} d={`M${174 + x} 36V78`} className={styles.bar} />
        ))}
      </g>
    </g>
  );
}
