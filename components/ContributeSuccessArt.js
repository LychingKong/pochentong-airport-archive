import styles from "./ContributeSuccess.module.css";
import ContributeSuccessPostcard from "./ContributeSuccessPostcard";
import HeroSky from "./HeroSky";
import LoginTerminal from "./LoginTerminal";

// The picture on the /contribute success screen: a warm sun glow, drifting
// clouds (HeroSky) and a few birds over the old terminal and control tower
// (LoginTerminal); the archive's 3D airliner, trailing a contrail, tows a
// memory postcard on a rope like a banner plane, carrying the new memory
// to the archive. Lines are drawn in percentages so they stretch with the
// window. Decorative only.
const BIRDS = [
  [14, 20, 1],
  [21, 15, 0.8],
  [78, 52, 0.9],
];

export default function ContributeSuccessArt() {
  return (
    <div className={styles.window} aria-hidden="true">
      <span className={styles.sun} />
      <HeroSky />
      <LoginTerminal className={styles.terminal} />

      <svg
        className={styles.birds}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {BIRDS.map(([x, y, size]) => (
          <path
            key={`${x}-${y}`}
            d={`M${x} ${y}q${1.6 * size} ${-1.6 * size} ${3.2 * size} 0q${1.6 * size} ${-1.6 * size} ${3.2 * size} 0`}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      <div className={styles.flight}>
        <svg
          className={styles.overlay}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            className={styles.contrail}
            d="M38 30Q22 24 0 30"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className={styles.rope}
            d="M40 34Q37 44 39.5 50.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <ContributeSuccessPostcard />
        <img
          src="/welcome-plane.webp"
          alt=""
          width="1706"
          height="577"
          decoding="async"
          className={styles.plane}
        />
      </div>
    </div>
  );
}
