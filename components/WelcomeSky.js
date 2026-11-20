import styles from "./WelcomeScreen.module.css";

// Clouds and sky behind (and partly in front of) the welcome screen's
// plane. Each cloud: [left %, top %, width vmin, seconds, delay seconds].
//   drift: a few faint clouds that sway slowly while the site loads
//   back:  clouds streaming past behind the plane during the takeoff
//   front: larger, faster clouds passing in front of it, for depth
// The motion itself is in WelcomeScreen.module.css. Decorative only.
const DRIFT = [
  [6, 16, 34, 22, -6],
  [64, 9, 26, 26, -14],
  [72, 70, 30, 20, -3],
];

const BACK = [
  [72, -12, 40, 2.1, 0],
  [98, 18, 30, 1.9, 0.2],
  [52, -28, 34, 2.2, 0.4],
  [104, 46, 44, 2.3, 0.6],
  [82, 4, 26, 1.8, 0.85],
  [100, -6, 36, 2.1, 1.05],
];

const FRONT = [
  [88, -24, 70, 1.6, 0.3],
  [112, 14, 82, 1.7, 0.75],
  [78, -36, 60, 1.5, 1.15],
];

function Cloud({ className, spec: [left, top, width, seconds, delay] }) {
  return (
    <span
      className={className}
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: `${width}vmin`,
        animationDuration: `${seconds}s`,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

export default function WelcomeSky() {
  const cloud = (layer) => `${styles.cloud} ${styles[layer]}`;

  return (
    <div className={styles.sky} aria-hidden="true">
      <div className={styles.skyGlow} />
      {DRIFT.map((spec) => (
        <Cloud key={`d${spec}`} className={cloud("cloudDrift")} spec={spec} />
      ))}
      {BACK.map((spec) => (
        <Cloud key={`b${spec}`} className={cloud("cloudBack")} spec={spec} />
      ))}
      {FRONT.map((spec) => (
        <Cloud key={`f${spec}`} className={cloud("cloudFront")} spec={spec} />
      ))}
    </div>
  );
}
