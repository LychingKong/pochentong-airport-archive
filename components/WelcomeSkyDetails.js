import styles from "./WelcomeRunwayDetails.module.css";

// Sky details for the welcome runway view (an SVG group inside
// WelcomeRunway, 1600×900, horizon at y 520): extra twinkling stars, an
// occasional shooting star, sunset-tinted clouds drifting slowly, a small
// flock of birds, a distant plane crossing with a blinking light, and a
// warm haze breathing along the horizon. Still for reduced motion.
const STARS = [
  [90, 40],
  [260, 150],
  [330, 30],
  [520, 95],
  [760, 40],
  [880, 160],
  [960, 30],
  [1120, 140],
  [1340, 40],
  [1540, 150],
  [1580, 30],
  [700, 210],
];
const CLOUDS = [
  [120, 400, 1.2, "cloudA"],
  [880, 360, 1, "cloudB"],
  [1320, 430, 0.8, "cloudA"],
];
const PLANE =
  "M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z";
const BIRD = "M0 0q5-5 10 0q5-5 10 0";

export default function WelcomeSkyDetails() {
  return (
    <g>
      <g className={styles.starField}>
        {STARS.map(([x, y], i) => (
          <circle
            key={x}
            cx={x}
            cy={y}
            r={0.9 + (i % 3) * 0.4}
            className={styles.star}
          />
        ))}
        <path d="M1180 60l200 70" className={styles.shootingStar} />
      </g>

      {CLOUDS.map(([x, y, s, drift]) => (
        <g key={x} className={styles[drift]}>
          <g
            transform={`translate(${x} ${y}) scale(${s})`}
            className={styles.cloud}
          >
            <ellipse cx="90" cy="20" rx="90" ry="9" />
            <ellipse cx="60" cy="12" rx="44" ry="11" />
            <ellipse cx="120" cy="10" rx="36" ry="9" />
          </g>
        </g>
      ))}

      {/* a distant plane crossing high up, with its contrail */}
      <g className={styles.farFlight}>
        <path d="M-260 95H-14" className={styles.contrail} />
        <path
          d={PLANE}
          transform="translate(-14 83) scale(1) rotate(90 12 12)"
          className={styles.farPlane}
        />
        <circle cx="-2" cy="95" r="2.2" className={styles.blinkRed} />
      </g>

      <g className={styles.flock}>
        {[
          [0, 0],
          [26, 10],
          [52, -4],
        ].map(([x, y]) => (
          <g key={x} transform={`translate(${x} ${y})`}>
            <path d={BIRD} className={styles.bird} />
          </g>
        ))}
      </g>

      <rect y="440" width="1600" height="100" className={styles.haze} />
    </g>
  );
}
