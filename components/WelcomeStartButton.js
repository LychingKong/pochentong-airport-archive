import { forwardRef } from "react";

import PlaneIcon from "./PlaneIcon";
import styles from "./WelcomeScreen.module.css";

// The welcome screen's "Click to Start": a white pill with an orange badge
// holding a little plane, the label and an arrow. Once ready it calls for
// attention: two orange rings ripple out, a light sweeps across, the plane
// bobs and the arrow nudges forward (still for reduced motion). While
// loading it keeps its space but stays hidden and disabled.
const WelcomeStartButton = forwardRef(function WelcomeStartButton(
  { ready, label, onClick },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={`${styles.start} ${ready ? styles.startReady : styles.startHidden}`}
      onClick={onClick}
      disabled={!ready}
    >
      <span className={styles.startRing} aria-hidden="true" />
      <span
        className={`${styles.startRing} ${styles.startRingLate}`}
        aria-hidden="true"
      />
      <span className={styles.startShine} aria-hidden="true" />
      <span className={styles.startBadge} aria-hidden="true">
        <PlaneIcon className={styles.startPlane} />
      </span>
      <span className={styles.startLabel}>{label}</span>
      <svg className={styles.startArrow} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>
  );
});

export default WelcomeStartButton;
