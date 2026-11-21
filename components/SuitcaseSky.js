import styles from "./MyEntriesEmpty.module.css";

// The sky behind the suitcase in SuitcaseIllustration (drawn inside that
// SVG): two clouds and a small plane taking off on a dashed trail.
const CLOUD =
  "M28 46C14 46 6 39 6 31C6 22 14 17 23 18C26 9 34 4 45 4C57 4 65 11 68 20C72 16 78 14 85 15C97 17 104 25 104 33C112 34 116 39 116 42C116 45 113 46 108 46Z";
const PLANE =
  "M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z";

export default function SuitcaseSky() {
  return (
    <g>
      <path
        d={CLOUD}
        transform="translate(18 40) scale(0.5)"
        className={styles.cloud}
      />
      <path
        d={CLOUD}
        transform="translate(236 78) scale(0.38)"
        className={styles.cloud}
      />
      <path d="M36 98Q120 92 236 30" className={styles.trail} />
      <g className={styles.plane}>
        <path
          d={PLANE}
          transform="translate(232 12) rotate(62 12 12) scale(1.3)"
          className={styles.planeShape}
        />
      </g>
    </g>
  );
}
