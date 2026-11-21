import styles from "./WelcomeRunway.module.css";
import WelcomeRunwayLights from "./WelcomeRunwayLights";

// The welcome screen's backdrop: the pilot's view down the runway at
// dusk. A navy-to-orange sky with a few stars and a setting sun, the
// arched Pochentong terminal and control tower on the horizon, dark grass,
// and the runway in perspective with its centreline and edge lights
// streaming toward you (WelcomeRunwayLights), and the archive's airliner
// lined up on it, seen from behind. On "Click to Start" the plane rolls
// away and lifts off toward the horizon, the runway rushes past and the
// view tilts, then it fades into the welcome screen's sky for the usual
// takeoff. Decorative only.
// The ids are fixed (one welcome screen per page).
const STARS = [
  [180, 90, 1.6],
  [420, 60, 1.2],
  [640, 130, 1.4],
  [1010, 80, 1.2],
  [1280, 120, 1.7],
  [1460, 70, 1.3],
];
const ARCHES =
  "M560 520V500q12-12 24 0q12-12 24 0q12-12 24 0q12-12 24 0q12-12 24 0q12-12 24 0q12-12 24 0q12-12 24 0V520z";

export default function WelcomeRunway({ phase }) {
  const departing = phase === "departing" || phase === "leaving";

  return (
    <div
      className={`${styles.scene} ${departing ? styles.rolling : ""}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="runway-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0b2545" />
            <stop offset="0.55" stopColor="#2c4c7a" />
            <stop offset="0.9" stopColor="#f2a56b" />
            <stop offset="1" stopColor="#ffd3a1" />
          </linearGradient>
          <linearGradient id="runway-ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3d4a3c" />
            <stop offset="1" stopColor="#141c17" />
          </linearGradient>
          <linearGradient id="runway-tarmac" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5a5f68" />
            <stop offset="1" stopColor="#24272d" />
          </linearGradient>
          <radialGradient id="runway-sun">
            <stop offset="0" stopColor="#ffe2b8" />
            <stop offset="0.35" stopColor="#ffbf80" stopOpacity="0.7" />
            <stop offset="1" stopColor="#ff9a55" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1600" height="520" fill="url(#runway-sky)" />
        {STARS.map(([x, y, r]) => (
          <circle key={x} cx={x} cy={y} r={r} className={styles.star} />
        ))}
        <circle cx="1130" cy="505" r="190" fill="url(#runway-sun)" />
        <circle cx="1130" cy="505" r="46" className={styles.sun} />

        {/* the terminal's arched roofs and the control tower */}
        <path d={ARCHES} className={styles.skyline} />
        <path
          d="M498 470v-12M486 482h24l4 10h-32zM484 492h28v8h-28zM492 500h12v20h-12z"
          className={styles.skyline}
        />

        <rect y="520" width="1600" height="380" fill="url(#runway-ground)" />
        <path d="M796 520h8L1828 1062H-228z" fill="url(#runway-tarmac)" />
        <path
          d="M797 520L-228 1062M803 520L1828 1062"
          className={styles.edge}
        />

        <WelcomeRunwayLights departing={departing} />
      </svg>
      {/* The archive's airliner, seen from behind, lined up on the runway;
          on Start it rolls away and lifts off toward the horizon. */}
      <span className={styles.planeShadow} />
      <img
        className={styles.plane}
        src="/runway-plane.webp"
        alt=""
        width="900"
        height="395"
      />
      <span className={styles.vignette} />
    </div>
  );
}
