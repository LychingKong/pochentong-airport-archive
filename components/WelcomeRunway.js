import WelcomeAirportDetails from "./WelcomeAirportDetails";
import styles from "./WelcomeRunway.module.css";
import WelcomeRunwayDefs from "./WelcomeRunwayDefs";
import WelcomeRunwayLights from "./WelcomeRunwayLights";
import WelcomeRunwayPlane from "./WelcomeRunwayPlane";
import WelcomeSkyDetails from "./WelcomeSkyDetails";

// The welcome screen's backdrop: the pilot's view down the runway at
// dusk. A navy-to-orange sky with a few stars and a setting sun, the
// arched Pochentong terminal and control tower on the horizon, dark grass,
// and the runway in perspective with its centreline and edge lights
// streaming toward you (WelcomeRunwayLights), and the archive's airliner
// lined up on it, seen from behind with its lights on
// (WelcomeRunwayPlane). `time` (morning, sunset or night) picks the
// colours, sun or moon, stars and lights. Moving sky and airport details live in
// WelcomeSkyDetails and WelcomeAirportDetails. On "Click to Start" the plane rolls
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

export default function WelcomeRunway({ phase, time = "sunset" }) {
  const departing = phase === "departing" || phase === "leaving";

  return (
    <div
      className={`${styles.scene} ${styles[time]} ${departing ? styles.rolling : ""}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <WelcomeRunwayDefs />

        <rect width="1600" height="520" fill="url(#runway-sky)" />
        <g className={styles.starField}>
          {STARS.map(([x, y, r]) => (
            <circle key={x} cx={x} cy={y} r={r} className={styles.star} />
          ))}
        </g>
        <g className={styles.sunGroup}>
          <circle cx="1130" cy="505" r="190" fill="url(#runway-sun)" />
          <circle cx="1130" cy="505" r="46" className={styles.sun} />
        </g>
        {/* the moon, shown at night instead of the sun */}
        <g className={styles.moonGroup}>
          <circle cx="1230" cy="150" r="110" fill="url(#runway-moon)" />
          <circle cx="1230" cy="150" r="30" className={styles.moon} />
          <circle cx="1220" cy="142" r="6" className={styles.crater} />
          <circle cx="1240" cy="160" r="4" className={styles.crater} />
        </g>
        <WelcomeSkyDetails />

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

        <WelcomeAirportDetails />
        <WelcomeRunwayLights departing={departing} />
      </svg>
      <WelcomeRunwayPlane />
      <span className={styles.vignette} />
    </div>
  );
}
