import styles from "./MyEntriesEmpty.module.css";
import SuitcaseStickers from "./SuitcaseStickers";

// The vintage suitcase in SuitcaseIllustration (drawn inside that SVG):
// handle, navy case with a lid seam and two brass latches, stitched leather
// straps with buckles, brass corner caps, and the travel stickers.
// One corner cap shape, mirrored into all four corners.
const CAP = "M0 26V16A16 16 0 0 1 16 0h10v8H16a8 8 0 0 0-8 8v10z";
const CORNERS = [
  "translate(64 108)",
  "translate(256 108) scale(-1 1)",
  "translate(64 228) scale(1 -1)",
  "translate(256 228) scale(-1 -1)",
];

export default function SuitcaseBody() {
  return (
    <g>
      <path
        d="M134 112V96a10 10 0 0 1 10-10h32a10 10 0 0 1 10 10v16"
        className={styles.handle}
      />
      <rect
        x="64"
        y="108"
        width="192"
        height="120"
        rx="16"
        className={styles.case}
      />
      {/* a soft highlight along the top, and the seam where the lid closes */}
      <path d="M78 113H242" className={styles.caseShine} />
      <path d="M64 128H256" className={styles.seam} />

      {[98, 208].map((x) => (
        <g key={x}>
          <rect
            x={x}
            y="108"
            width="14"
            height="120"
            className={styles.strap}
          />
          <path
            d={`M${x + 3} 112V224M${x + 11} 112V224`}
            className={styles.stitch}
          />
          <rect
            x={x - 2}
            y="168"
            width="18"
            height="12"
            rx="2"
            className={styles.buckle}
          />
        </g>
      ))}

      {/* two brass latches on the seam */}
      <path
        d="M136 122h12v12h-12zM172 122h12v12h-12z"
        className={styles.latch}
      />

      {CORNERS.map((transform) => (
        <path
          key={transform}
          d={CAP}
          transform={transform}
          className={styles.cap}
        />
      ))}

      <SuitcaseStickers />
    </g>
  );
}
