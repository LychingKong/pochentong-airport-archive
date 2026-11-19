import styles from "./NoResults.module.css";

// The magnifying glass with a question mark in the "no results" picture.
// It sways gently (see .magnifier in NoResults.module.css). SVG parts only.
export default function NoResultsMagnifier() {
  return (
    <g className={styles.magnifier}>
      <path className={styles.lensHandle} d="M448 248L486 286" />
      <circle className={styles.lens} cx="420" cy="220" r="40" />
      <text className={styles.question} x="420" y="237" textAnchor="middle">
        ?
      </text>
      <path
        className={styles.spark}
        d="M454 170L462 158M468 184L480 178M440 162L442 148"
      />
    </g>
  );
}
