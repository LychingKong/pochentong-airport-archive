import styles from "./SubmitTakeoff.module.css";

// The extra layers of the after-submit takeoff (SubmitTakeoff): a warm
// sunset glow in the top-right, white speed streaks rushing past, and
// airmail confetti (orange, navy and white paper bits and sparkles)
// tumbling from behind the envelope. Positions and timings are fixed lists, so it looks the
// same every time.
// Each piece: [left %, top %, drift x vw, drift y vh, spin deg, delay s, kind]
const CONFETTI = [
  [12, 78, -10, 30, 260, 0.5, "orange"],
  [18, 70, -6, 34, -200, 0.7, "navy"],
  [24, 66, -14, 26, 320, 0.9, "white"],
  [30, 58, -8, 32, -280, 1.1, "orange"],
  [36, 52, -12, 28, 220, 1.3, "navy"],
  [42, 46, -6, 30, -300, 1.5, "white"],
  [48, 40, -10, 24, 260, 1.7, "orange"],
  [54, 34, -14, 30, -220, 1.9, "navy"],
  [60, 30, -8, 26, 300, 2.1, "spark"],
  [66, 26, -12, 22, -260, 2.3, "orange"],
  [22, 74, -16, 20, 0, 0.8, "spark"],
  [40, 50, -10, 22, 0, 1.4, "spark"],
];
// Each streak: [top %, delay s, length vw]
const STREAKS = [
  [18, 0.4, 26],
  [34, 0.9, 18],
  [52, 0.6, 30],
  [68, 1.3, 22],
  [26, 1.8, 20],
  [60, 2.2, 28],
];

export default function TakeoffExtras({ started }) {
  return (
    <div className={`${styles.extras} ${started ? styles.go : ""}`}>
      <span className={styles.flare} />
      {STREAKS.map(([top, delay, length]) => (
        <span
          key={`${top}-${delay}`}
          className={styles.streak}
          style={{
            top: `${top}%`,
            width: `${length}vw`,
            animationDelay: `${delay}s`,
          }}
        />
      ))}
      {CONFETTI.map(([left, top, dx, dy, spin, delay, kind]) => (
        <span
          key={`${left}-${top}`}
          className={`${styles.bit} ${styles[`bit_${kind}`]}`}
          style={{
            left: `${left}%`,
            top: `${top}%`,
            "--dx": `${dx}vw`,
            "--dy": `${dy}vh`,
            "--spin": `${spin}deg`,
            animationDelay: `${delay}s`,
          }}
        />
      ))}
    </div>
  );
}
