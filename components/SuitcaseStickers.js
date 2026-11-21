import styles from "./MyEntriesEmpty.module.css";

// Travel stickers on the suitcase in SuitcaseIllustration (drawn inside
// that SVG): a round PNH sticker, as on the archive's logo, and a
// "ភ្នំពេញ" (Phnom Penh) label stuck on at an angle.
const PLANE =
  "M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z";

export default function SuitcaseStickers() {
  return (
    <g>
      {/* round PNH sticker */}
      <circle cx="160" cy="166" r="28" className={styles.stickerRing} />
      <circle cx="160" cy="166" r="22" className={styles.stickerFace} />
      <path
        d={PLANE}
        transform="translate(152 147) rotate(45 8 8) scale(0.66)"
        className={styles.stickerPlane}
      />
      <text x="160" y="180" className={styles.stickerCode}>
        PNH
      </text>

      {/* Phnom Penh label, slightly crooked */}
      <g transform="rotate(-8 170 211)">
        <rect
          x="131"
          y="200"
          width="78"
          height="22"
          rx="4"
          className={styles.label}
        />
        <text x="170" y="215" lang="km" className={styles.labelText}>
          ភ្នំពេញ
        </text>
      </g>

      {/* a small star sticker */}
      <path
        d="M82 140l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"
        className={styles.star}
      />
    </g>
  );
}
