"use client";

import { useEffect, useState } from "react";

import { playTakeoffSound } from "../lib/takeoffSound";
import { isSoundOn } from "../lib/useSoundPreference";
import TakeoffCaption from "./TakeoffCaption";
import TakeoffExtras from "./TakeoffExtras";
import overlay from "./TakeoffOverlay.module.css";
import welcome from "./WelcomeScreen.module.css";
import WelcomeSky from "./WelcomeSky";

// Played once over the success screen right after a new entry is saved:
// the archive's airliner takes off towing the memory as an airmail
// envelope, through the welcome screen's sky and clouds, with a sunset
// glow, a dashed flight path, speed streaks and airmail confetti
// (TakeoffExtras) and a caption that turns into "Delivered!" with a PNH
// postmark (TakeoffCaption). Then it fades to the confirmation, with the
// takeoff sound if sound is on. Skipped for reduced motion. Decorative:
// screen readers skip it.
const FLIGHT_MS = 4000;
const DELIVERED_MS = 2900;
const FADE_MS = 500;

export default function SubmitTakeoff() {
  const [phase, setPhase] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "done"
      : "waiting",
  );

  useEffect(() => {
    if (phase !== "waiting") return;
    // Start one frame after mounting, so the sky fades in.
    const frame = requestAnimationFrame(() => {
      setPhase("flying");
      if (isSoundOn()) playTakeoffSound(FLIGHT_MS / 1000);
    });
    const timers = [
      setTimeout(() => setPhase("delivered"), DELIVERED_MS),
      setTimeout(() => setPhase("fading"), FLIGHT_MS),
      setTimeout(() => setPhase("done"), FLIGHT_MS + FADE_MS),
    ];
    return () => {
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
    };
    // Runs once: the timers drive the later phases themselves.
  }, []);

  if (phase === "done") return null;
  const started = phase !== "waiting";

  const classes = [
    overlay.overlay,
    started ? `${overlay.started} ${welcome.departing}` : "",
    phase === "fading" ? overlay.fading : "",
  ];

  return (
    <div className={classes.join(" ")} aria-hidden="true">
      <WelcomeSky />
      <TakeoffExtras started={started} />
      <img
        className={`${welcome.flight} ${started ? welcome.flying : ""}`}
        src="/submit-plane.webp"
        // Slower than the welcome takeoff, so the memory can be seen.
        style={{ animationDuration: `${FLIGHT_MS}ms` }}
        alt=""
        width="1100"
        height="506"
      />
      <TakeoffCaption
        started={started}
        delivered={phase === "delivered" || phase === "fading"}
        durationMs={DELIVERED_MS}
      />
    </div>
  );
}
