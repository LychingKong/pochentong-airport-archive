import styles from "./MyEntriesArt.module.css";
import MyEntriesArtPass from "./MyEntriesArtPass";
import MyEntriesArtPhoto from "./MyEntriesArtPhoto";

// The drawing on the right of the /my-entries heading: "your collection".
// Three memory photos (terminal, control tower, a plane at sunset), a PNH
// boarding pass and a round PNH stamp, with a plane leaving on a flowing
// dashed trail and a few twinkling sparkles. The pieces float gently
// (no motion when reduced motion is asked for). Navy on soft fills, from
// theme colors, so dark mode follows. Decorative only.
const PLANE =
  "M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z";
const SPARKLE = "M0-7l1.8 5.2L7 0l-5.2 1.8L0 7l-1.8-5.2L-7 0l5.2-1.8z";
const SPARKLES = [
  ["translate(214 40)", "twinkleA"],
  ["translate(548 24) scale(0.7)", "twinkleB"],
  ["translate(258 176) scale(0.8)", "twinkleC"],
];

export default function MyEntriesHeaderArt() {
  return (
    <svg className={styles.art} viewBox="0 -16 560 236" aria-hidden="true">
      <MyEntriesArtPhoto
        scene="terminal"
        transform="translate(268 60) rotate(-13)"
        float="floatA"
      />
      <MyEntriesArtPhoto
        scene="tower"
        transform="translate(360 22) rotate(-2)"
        float="floatC"
      />
      <MyEntriesArtPhoto
        scene="sky"
        transform="translate(448 36) rotate(11)"
        float="floatA"
      />
      <MyEntriesArtPass transform="translate(300 108) rotate(-3)" />

      {/* a round PNH stamp over the corner of the pass */}
      <g transform="translate(300 186) rotate(-14)">
        <g className={styles.floatC}>
          <circle r="26" className={styles.stampRing} />
          <circle r="20" className={styles.stampInner} />
          <text y="5" className={styles.stampText}>
            PNH
          </text>
        </g>
      </g>

      {/* the plane leaving on a flowing dashed trail */}
      <path d="M96 168Q170 116 226 82" className={styles.trail} />
      <g transform="translate(222 50) rotate(62 12 12) scale(1.7)">
        <path d={PLANE} className={styles.plane} />
      </g>

      {SPARKLES.map(([place, twinkle]) => (
        <g key={place} transform={place}>
          <path
            d={SPARKLE}
            className={`${styles.sparkle} ${styles[twinkle]}`}
          />
        </g>
      ))}
    </svg>
  );
}
