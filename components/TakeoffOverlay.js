"use client";

import { useEffect, useState } from "react";

import styles from "./TakeoffOverlay.module.css";
import welcome from "./WelcomeScreen.module.css";
import WelcomeSky from "./WelcomeSky";

// The welcome screen's takeoff (blue sky, clouds streaming past, the big
// airliner), replayed while an entry's page opens. It reuses the welcome
// screen's styles, so the two always match. `phase` comes from
// lib/usePageTransition.js: "leaving" while flying, "arriving" while the
// sky fades away to show the entry. Decorative: screen readers skip it.
export default function TakeoffOverlay({ phase }) {
  // Start one frame after mounting, so the sky fades in instead of
  // appearing at full strength.
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setStarted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const classes = [
    styles.overlay,
    started ? `${styles.started} ${welcome.departing}` : "",
    phase === "arriving" ? styles.fading : "",
  ];

  return (
    <div className={classes.join(" ")} aria-hidden="true">
      <WelcomeSky />
      <img
        className={`${welcome.flight} ${started ? welcome.flying : ""}`}
        src="/welcome-plane.webp"
        alt=""
        width="1706"
        height="577"
      />
    </div>
  );
}
