import styles from "./WelcomeRunway.module.css";
import details from "./WelcomeRunwayDetails.module.css";

// The archive's airliner on the welcome runway, seen from behind, with its
// lights on: red on the left wingtip, green on the right, a blinking red
// beacon and a white strobe flashing on the tail. On "Click to Start" it
// rolls away and lifts off (the .rolling rules in WelcomeRunway.module.css).
const LIGHTS = [
  ["navRed", 1, 68],
  ["navGreen", 99, 68],
  ["strobe", 50, 2],
  ["beaconLight", 50, 57],
];

export default function WelcomeRunwayPlane() {
  return (
    <>
      <span className={styles.planeShadow} />
      <div className={styles.plane}>
        <img
          className={styles.planeImg}
          src="/runway-plane.webp"
          alt=""
          width="900"
          height="395"
        />
        {LIGHTS.map(([kind, x, y]) => (
          <span
            key={kind}
            className={`${details.planeLight} ${details[kind]}`}
            style={{ left: `${x}%`, top: `${y}%` }}
          />
        ))}
      </div>
    </>
  );
}
