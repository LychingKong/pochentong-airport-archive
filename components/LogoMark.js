import styles from "./LogoMark.module.css";

// The archive's round logo badge for the header: the same scene as the PNH
// logo (dusk sky, control tower, terminal and a departing plane) inside a
// circle. The full PNH logo is the favicon and share image in app/.
// Decorative: the archive's name sits beside it. The ids are fixed because
// the header shows one logo per page.
const CLOUD =
  "M28 46C14 46 6 39 6 31C6 22 14 17 23 18C26 9 34 4 45 4C57 4 65 11 68 20C72 16 78 14 85 15C97 17 104 25 104 33C112 34 116 39 116 42C116 45 113 46 108 46Z";
const PLANE =
  "M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z";

export default function LogoMark({ className }) {
  return (
    <svg
      className={`${styles.logo} ${className ?? ""}`}
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className={styles.skyTop} />
          <stop offset="1" className={styles.skyBottom} />
        </linearGradient>
        <clipPath id="logo-circle">
          <circle cx="50" cy="50" r="50" />
        </clipPath>
      </defs>

      <g clipPath="url(#logo-circle)">
        <rect width="100" height="100" fill="url(#logo-sky)" />
        <path
          className={styles.tan}
          d={CLOUD}
          transform="translate(6 42) scale(0.28)"
        />
        <path
          className={styles.tan}
          d={CLOUD}
          transform="translate(68 46) scale(0.22)"
        />

        {/* control tower */}
        <path className={styles.trail} d="M30 19V26" />
        <rect
          className={styles.tan}
          x="25"
          y="26"
          width="10"
          height="4"
          rx="1.5"
        />
        <rect
          className={styles.tan}
          x="21"
          y="30"
          width="18"
          height="9"
          rx="2"
        />
        <rect className={styles.glass} x="23" y="33" width="14" height="2.5" />
        <rect className={styles.tan} x="26" y="39" width="8" height="24" />

        {/* terminal, rising toward the left, with two rows of windows */}
        <path className={styles.roof} d="M0 60L100 66V69L0 63Z" />
        <path className={styles.tan} d="M0 63L100 69V100H0Z" />
        <path className={styles.windows} d="M0 70.5L100 76.5M0 78.5L100 84.5" />

        {/* departing plane and its contrail */}
        <path className={styles.trail} d="M40 56Q58 50 67 32" />
        <path
          className={styles.tan}
          d={PLANE}
          transform="translate(64 16) scale(0.75) rotate(65 12 12)"
        />
      </g>
    </svg>
  );
}
