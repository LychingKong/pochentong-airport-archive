"use client";

import { usePageTransition } from "../lib/usePageTransition";
import styles from "./PageTransition.module.css";
import PlaneIcon from "./PlaneIcon";
import TakeoffOverlay from "./TakeoffOverlay";

// Plays when moving forward to another page. Opening an entry gets the big
// takeoff (sky, clouds and the airliner from the welcome screen); other
// pages get a small plane flying across. Going back has no animation.
export default function PageTransition() {
  const { phase, kind } = usePageTransition();

  if (phase === "idle") {
    // Loads the airliner in advance, so the first takeoff isn't blank.
    return (
      <img src="/welcome-plane.webp" alt="" width="1706" height="577" hidden />
    );
  }

  if (kind === "takeoff") return <TakeoffOverlay phase={phase} />;

  const classes = [styles.overlay, styles[phase]];
  return (
    <div className={classes.join(" ")} aria-hidden="true">
      <PlaneIcon className={styles.plane} />
    </div>
  );
}
