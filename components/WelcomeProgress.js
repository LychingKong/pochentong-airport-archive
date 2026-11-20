import PlaneIcon from "./PlaneIcon";
import styles from "./WelcomeScreen.module.css";

// The welcome screen's loading bar: a hairline that fills in orange, a
// small navy plane at its tip and the percentage beside it. `progress`
// runs from 0 to 1 (see lib/useWelcomeFlow.js).
export default function WelcomeProgress({ progress }) {
  const percent = Math.round(progress * 100);

  return (
    <div className={styles.progressRow}>
      <div
        className={styles.progress}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <div className={styles.progressFill} style={{ width: `${percent}%` }} />
        <span
          className={styles.progressPlane}
          style={{ left: `${percent}%` }}
          aria-hidden="true"
        >
          <PlaneIcon className={styles.progressPlaneIcon} />
        </span>
      </div>
      <span className={styles.percent} aria-hidden="true">
        {percent}%
      </span>
    </div>
  );
}
