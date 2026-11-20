import HeroSky from "./HeroSky";
import styles from "./LoginScene.module.css";
import LoginTerminal from "./LoginTerminal";

// The picture half of the sign-in and sign-up pages: a sky with the homepage's drifting
// clouds, the archive's airliner (public/welcome-plane.webp) climbing out,
// and the old terminal below. An orange band traces its curved edge.
// Purely decorative, so screen readers skip it.
export default function LoginScene() {
  return (
    <div className={styles.scene} aria-hidden="true">
      <div className={styles.band} />
      <div className={styles.sky}>
        <HeroSky />
        <LoginTerminal className={styles.terminal} />
        <img
          src="/welcome-plane.webp"
          alt=""
          width="1706"
          height="577"
          fetchPriority="high"
          decoding="async"
          className={styles.plane}
        />
      </div>
    </div>
  );
}
