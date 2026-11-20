import styles from "./ContributeCollage.module.css";
import HeroSky from "./HeroSky";
import LoginTerminal from "./LoginTerminal";

// One "photo" in the /contribute collage, drawn from the archive's own
// pieces: a sky, the terminal (LoginTerminal) and the airliner. `mood`
// picks the look in ContributeCollage.module.css:
//   "day"     bright sky with drifting clouds
//   "vintage" the same scene in faded sepia, like an old print
//   "sunset"  an orange evening with the buildings in silhouette
export default function CollagePhoto({ mood }) {
  return (
    <div className={`${styles.photo} ${styles[mood]}`}>
      {mood === "day" ? <HeroSky /> : null}
      <LoginTerminal className={styles.terminal} />
      <img
        src="/welcome-plane.webp"
        alt=""
        width="1706"
        height="577"
        loading="lazy"
        decoding="async"
        className={styles.plane}
      />
    </div>
  );
}
