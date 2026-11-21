import HeroSky from "./HeroSky";
import LoginTerminal from "./LoginTerminal";
import styles from "./ReviewEmpty.module.css";
import ReviewEmptyBadge from "./ReviewEmptyBadge";

// The "all caught up" picture on /review, built from the same pieces as
// the sign-in page's sky: a sky gradient with drifting clouds (HeroSky),
// the terminal and control tower (LoginTerminal), and the archive's 3D
// airliner climbing away, cleared for departure. The round PNH "all clear"
// badge sits in the corner like a stamp. Decorative only.
export default function ReviewEmptyArt() {
  return (
    <div className={styles.window} aria-hidden="true">
      <HeroSky />
      <LoginTerminal className={styles.terminal} />
      <img
        src="/welcome-plane.webp"
        alt=""
        width="1706"
        height="577"
        decoding="async"
        className={styles.plane}
      />
      <ReviewEmptyBadge />
    </div>
  );
}
