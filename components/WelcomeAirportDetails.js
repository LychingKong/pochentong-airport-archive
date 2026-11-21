import styles from "./WelcomeRunwayDetails.module.css";

// Airport details for the welcome runway view (an SVG group inside
// WelcomeRunway, 1600×900, horizon at y 520): lit terminal windows that
// flicker, the control tower's glowing cab with a rotating beacon and a
// red mast light, a hangar and sugar palms on the horizon, and PAPI
// landing lights beside the runway. Still for reduced motion.
const PALMS = [
  [420, 66],
  [452, 52],
  [1450, 72],
  [1494, 58],
];
const FRONDS = [0, 36, 72, 108, 144, 180, 216, 252, 288, 324];

export default function WelcomeAirportDetails() {
  return (
    <g>
      {/* terminal windows and tower glow (dim by day) */}
      <g className={styles.lit}>
        {Array.from({ length: 15 }, (_, i) => (
          <rect
            key={i}
            x={566 + i * 12}
            y="508"
            width="6"
            height="5"
            className={styles.window}
          />
        ))}
        <rect
          x="487"
          y="484"
          width="22"
          height="6"
          className={styles.towerGlass}
        />
      </g>
      {/* red mast light and rotating beacon */}
      <circle cx="498" cy="457" r="2.6" className={styles.blinkRed} />
      <circle cx="498" cy="481" r="3" className={styles.beacon} />

      {/* a hangar and sugar palms on the horizon */}
      <path d="M1240 520v-16q70-26 140 0v16z" className={styles.silhouette} />
      {PALMS.map(([x, h]) => (
        <g key={x} className={styles.silhouetteStroke}>
          <path d={`M${x} 520q3-${h / 2} 0-${h}`} />
          {FRONDS.map((a) => (
            <path
              key={a}
              d={`M${x} ${520 - h}l${(16 * Math.cos((a * Math.PI) / 180)).toFixed(1)} ${(9 * Math.sin((a * Math.PI) / 180)).toFixed(1)}`}
            />
          ))}
        </g>
      ))}

      {/* PAPI: four lights left of the runway, two red, two white */}
      {[0, 1, 2, 3].map((i) => (
        <circle
          key={i}
          cx={574 + i * 9}
          cy="568"
          r="3"
          className={i < 2 ? styles.papiRed : styles.papiWhite}
        />
      ))}
    </g>
  );
}
