import styles from "./MyEntriesEmpty.module.css";
import SuitcaseBody from "./SuitcaseBody";
import SuitcasePolaroid from "./SuitcasePolaroid";
import SuitcaseSky from "./SuitcaseSky";
import SuitcaseTag from "./SuitcaseTag";

// The /my-entries empty-state picture: a vintage suitcase with travel
// stickers, a blank polaroid peeking out and a blank luggage tag (a story
// still to be written), while a small plane takes off between clouds.
// As the page opens the suitcase drops in, then the polaroid slides up.
// Decorative only; colors and motion live in MyEntriesEmpty.module.css.
export default function SuitcaseIllustration() {
  return (
    <svg className={styles.art} viewBox="0 0 320 250" aria-hidden="true">
      <SuitcaseSky />
      <ellipse cx="160" cy="234" rx="114" ry="9" className={styles.shadow} />

      {/* drawn first, so it sits behind the case */}
      <SuitcasePolaroid />

      <g className={styles.caseGroup}>
        <SuitcaseBody />
        <SuitcaseTag />
      </g>
    </svg>
  );
}
