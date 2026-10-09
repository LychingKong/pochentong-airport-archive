"use client";

import { usePageTransition } from "../lib/usePageTransition";
import styles from "./PageTransition.module.css";
import PlaneIcon from "./PlaneIcon";

// A plane flies across the screen whenever the page changes: left to right
// going forward, right to left going back.
export default function PageTransition() {
  const { phase, direction } = usePageTransition();

  if (phase === "idle") return null;

  const classes = [styles.overlay, styles[phase], styles[direction]];
  return (
    <div className={classes.join(" ")} aria-hidden="true">
      <PlaneIcon className={styles.plane} />
    </div>
  );
}
