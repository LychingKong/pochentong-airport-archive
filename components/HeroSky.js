import styles from "./HeroSky.module.css";
import PlaneIcon from "./PlaneIcon";

// Slow clouds and a small plane drifting behind the hero airliner.
// Each cloud: vertical position, width, seconds per crossing, and a
// negative delay so they start spread out instead of in a line.
const CLOUDS = [
  { top: "8%", left: "70%", width: 150, seconds: 70, delay: -12 },
  { top: "30%", left: "35%", width: 90, seconds: 52, delay: -30 },
  { top: "58%", left: "10%", width: 130, seconds: 86, delay: -64 },
  { top: "18%", left: "5%", width: 70, seconds: 46, delay: -6 },
];

const CLOUD_PATH =
  "M28 46C14 46 6 39 6 31C6 22 14 17 23 18C26 9 34 4 45 4C57 4 65 11 68 20C72 16 78 14 85 15C97 17 104 25 104 33C112 34 116 39 116 42C116 45 113 46 108 46Z";

export default function HeroSky() {
  return (
    <div className={styles.sky} aria-hidden="true">
      {CLOUDS.map((cloud) => (
        <svg
          key={cloud.top + cloud.left}
          className={styles.cloud}
          viewBox="0 0 120 50"
          style={{
            top: cloud.top,
            left: cloud.left,
            width: cloud.width,
            animationDuration: `${cloud.seconds}s`,
            animationDelay: `${cloud.delay}s`,
          }}
        >
          <path d={CLOUD_PATH} fill="currentColor" />
        </svg>
      ))}

      <div className={styles.flight}>
        <div className={styles.craft}>
          <span className={styles.trail} />
          <PlaneIcon className={styles.miniPlane} />
        </div>
      </div>
    </div>
  );
}
