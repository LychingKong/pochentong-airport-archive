import styles from "./NoResults.module.css";
import NoResultsMagnifier from "./NoResultsMagnifier";
import NoResultsPhotos from "./NoResultsPhotos";

// Foreground of the "no results" picture: a plant and a suitcase with a PNH
// tag, then the old photos and magnifying glass from their own files.
// SVG parts only; NoResultsIllustration puts it inside the <svg>.
const LEAVES = [
  [141, 236, 0, 36],
  [128, 248, -32, 34],
  [154, 246, 28, 34],
  [122, 266, -62, 28],
  [160, 264, 58, 28],
];

export default function NoResultsItems() {
  return (
    <>
      <ellipse className={styles.shadow} cx="320" cy="345" rx="210" ry="16" />

      {LEAVES.map(([cx, cy, angle, ry]) => (
        <ellipse
          key={`${cx}-${cy}`}
          className={styles.leaf}
          cx={cx}
          cy={cy}
          rx="10"
          ry={ry}
          transform={`rotate(${angle} ${cx} ${cy})`}
        />
      ))}
      <path className={styles.pot} d="M112 290H170L161 342H121Z" />

      {/* suitcase with its luggage tag */}
      <path
        className={styles.handle}
        d="M236 252V238Q236 228 246 228H266Q276 228 276 238V252"
      />
      <rect
        className={styles.case}
        x="196"
        y="250"
        width="120"
        height="94"
        rx="12"
      />
      <path className={styles.caseLine} d="M226 256V338M286 256V338" />
      <g transform="rotate(-12 238 300)">
        <path className={styles.tagString} d="M232 262L238 280" />
        <rect
          className={styles.tag}
          x="220"
          y="278"
          width="36"
          height="44"
          rx="6"
        />
        <text className={styles.tagText} x="238" y="304" textAnchor="middle">
          PNH
        </text>
      </g>

      <NoResultsPhotos />
      <NoResultsMagnifier />
    </>
  );
}
