import styles from "./NoResults.module.css";

// Background of the "no results" picture: a rounded terminal window looking
// out on a parked plane, the control tower and clouds. SVG parts only;
// NoResultsIllustration puts it inside the <svg>.
const WINDOW =
  "M80 300C52 228 64 120 150 80C236 40 320 74 396 50C478 24 556 72 562 164C568 238 548 290 534 300Z";

const CLOUD =
  "M28 46C14 46 6 39 6 31C6 22 14 17 23 18C26 9 34 4 45 4C57 4 65 11 68 20C72 16 78 14 85 15C97 17 104 25 104 33C112 34 116 39 116 42C116 45 113 46 108 46Z";

export default function NoResultsWindow() {
  return (
    <>
      <defs>
        <clipPath id="no-results-window">
          <path d={WINDOW} />
        </clipPath>
      </defs>
      <path d={WINDOW} className={styles.sky} />

      <g clipPath="url(#no-results-window)">
        <path
          className={styles.cloud}
          d={CLOUD}
          transform="translate(196 72) scale(0.9)"
        />
        <path
          className={styles.cloud}
          d={CLOUD}
          transform="translate(372 98) scale(0.65)"
        />

        {/* terminal building and control tower, far away */}
        <rect
          className={styles.distant}
          x="380"
          y="215"
          width="190"
          height="34"
          rx="6"
        />
        <rect
          className={styles.distant}
          x="470"
          y="160"
          width="12"
          height="60"
        />
        <rect
          className={styles.distant}
          x="456"
          y="148"
          width="40"
          height="16"
          rx="4"
        />

        {/* parked plane */}
        <path className={styles.distant} d="M98 192L80 150H102L132 192Z" />
        <rect
          className={styles.distant}
          x="90"
          y="190"
          width="200"
          height="34"
          rx="17"
        />
        <rect className={styles.stripe} x="96" y="211" width="188" height="3" />
        <path className={styles.glass} d="M262 198L280 200L285 206H264Z" />

        <rect className={styles.sill} x="0" y="262" width="600" height="40" />
        <path
          className={styles.frame}
          d="M180 0V300M310 0V300M440 0V300M0 120H600M0 262H600"
        />
      </g>
    </>
  );
}
