import styles from "./MyEntriesEmpty.module.css";

// The blank luggage tag hanging from the suitcase handle in
// SuitcaseIllustration (drawn inside that SVG): empty lines for a story
// still to be written. It sways gently (see .tag in the CSS).
export default function SuitcaseTag() {
  return (
    <g className={styles.tag}>
      <path d="M180 100Q196 112 200 132" className={styles.string} />
      <g transform="rotate(14 222 160)">
        <rect
          x="196"
          y="128"
          width="52"
          height="70"
          rx="8"
          className={styles.tagCard}
        />
        <rect
          x="196"
          y="128"
          width="52"
          height="14"
          rx="7"
          className={styles.tagStripe}
        />
        <circle cx="222" cy="135" r="3.5" className={styles.tagHole} />
        <path
          d="M206 160H238M206 172H238M206 184H228"
          className={styles.tagLines}
        />
      </g>
    </g>
  );
}
