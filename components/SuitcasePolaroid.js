import styles from "./MyEntriesEmpty.module.css";

// A blank polaroid peeking out of the suitcase in SuitcaseIllustration
// (drawn behind the case, inside that SVG): an empty photo with a "+",
// waiting for the visitor's first memory. It slides up out of the case
// as the page opens (see .polaroid in the CSS).
export default function SuitcasePolaroid() {
  return (
    <g className={styles.polaroid}>
      <g transform="rotate(-10 117 96)">
        <rect
          x="84"
          y="54"
          width="66"
          height="78"
          rx="4"
          className={styles.polaroidFrame}
        />
        <rect
          x="90"
          y="60"
          width="54"
          height="46"
          rx="2"
          className={styles.polaroidPhoto}
        />
        <circle cx="117" cy="83" r="11" className={styles.plusCircle} />
        <path d="M117 77V89M111 83H123" className={styles.plusMark} />
      </g>
    </g>
  );
}
