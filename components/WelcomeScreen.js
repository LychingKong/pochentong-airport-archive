"use client";

import { useEffect, useRef } from "react";

import collection from "../collection.config.js";
import { playTakeoffSound } from "../lib/takeoffSound";
import { usePageLock } from "../lib/usePageLock";
import { useSoundPreference } from "../lib/useSoundPreference";
import { useWelcomeFlow } from "../lib/useWelcomeFlow";
import { useLanguage } from "./LanguageProvider";
import WelcomeProgress from "./WelcomeProgress";
import styles from "./WelcomeScreen.module.css";
import WelcomeSky from "./WelcomeSky";
import WelcomeSoundToggle from "./WelcomeSoundToggle";

// Full-screen welcome shown once per browser session, over whichever page
// the visitor lands on. "Gathering memories..." while the site loads (at
// least 5 seconds), then "Click to Start": a takeoff sound, a plane flying
// across, and the page fades in. The page behind can't be scrolled or
// tabbed to meanwhile. The loading logic is in lib/useWelcomeFlow.js.
export default function WelcomeScreen() {
  const { t } = useLanguage();
  const { phase, progress, start } = useWelcomeFlow();
  const [soundOn, toggleSound] = useSoundPreference();
  const overlayRef = useRef(null);
  const startRef = useRef(null);
  const visible = phase !== "hidden";
  const ready = phase === "ready";

  usePageLock(overlayRef, visible);

  useEffect(() => {
    // Focus the button for keyboard users, without drawing the focus
    // ring for everyone (it appears once they press Tab).
    if (ready) startRef.current?.focus({ focusVisible: false });
  }, [ready]);

  if (!visible) return null;

  function handleStart() {
    if (soundOn) playTakeoffSound();
    start();
  }

  const flying = phase === "departing" || phase === "leaving";
  return (
    <div
      ref={overlayRef}
      data-welcome-overlay=""
      className={`${styles.overlay} ${styles[phase] ?? ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={collection.name}
    >
      <WelcomeSky />
      <WelcomeSoundToggle on={soundOn} onToggle={toggleSound} />
      <div className={styles.content}>
        <img
          className={styles.logo}
          src="/welcome-logo.png"
          alt={collection.name}
          width="1057"
          height="472"
        />
        <WelcomeProgress progress={progress} />
        <p className={styles.status} aria-live="polite">
          {ready ? t.welcomeReady : t.welcomeLoading}
        </p>
        <button
          ref={startRef}
          type="button"
          className={`${styles.start} ${ready ? "" : styles.startHidden}`}
          onClick={handleStart}
          disabled={!ready}
        >
          {t.welcomeStart}
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
      <p className={styles.footer}>
        {t.welcomePlace} · {collection.name}
      </p>
      {/* The airliner is in the page from the start (hidden), so the image
          has loaded long before "Click to Start"; it flies once clicked. */}
      <img
        className={`${styles.flight} ${flying ? styles.flying : ""}`}
        src="/welcome-plane.webp"
        alt=""
        width="1706"
        height="577"
        aria-hidden="true"
      />
    </div>
  );
}
