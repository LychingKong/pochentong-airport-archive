import styles from "./NoResults.module.css";
import NoResultsItems from "./NoResultsItems";
import NoResultsWindow from "./NoResultsWindow";

// Same plane shape as PlaneIcon, drawn inside this SVG.
const PLANE =
  "M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z";

// The picture above "No entries found": a terminal window, a suitcase, old
// photos and a magnifying glass, with a small plane flying off along a
// dashed trail. Decorative only: screen readers skip it.
export default function NoResultsIllustration({ className }) {
  return (
    <svg className={className} viewBox="0 0 600 400" aria-hidden="true">
      <NoResultsWindow />
      <NoResultsItems />
      <path className={styles.trail} d="M90 386C200 360 320 394 466 370" />
      <path
        className={styles.trailPlane}
        d={PLANE}
        transform="translate(472 346) rotate(70 12 12)"
      />
    </svg>
  );
}
