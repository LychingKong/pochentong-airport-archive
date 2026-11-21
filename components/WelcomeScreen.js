"use client";

import { useEffect, useRef } from "react";

import collection from "../collection.config.js";
import { playTakeoffSound } from "../lib/takeoffSound";
import { collectionText } from "../lib/translations";
import { usePageLock } from "../lib/usePageLock";
import { useSoundPreference } from "../lib/useSoundPreference";
import { useWelcomeFlow } from "../lib/useWelcomeFlow";
import { useLanguage } from "./LanguageProvider";
import LanguageToggle from "./LanguageToggle";
import WelcomeProgress from "./WelcomeProgress";
import WelcomeRunway from "./WelcomeRunway";
import styles from "./WelcomeScreen.module.css";
import WelcomeSky from "./WelcomeSky";
import WelcomeSoundToggle from "./WelcomeSoundToggle";
import WelcomeStartButton from "./WelcomeStartButton";

// Full-screen welcome shown once per browser session, over whichever page
// the visitor lands on: the pilot's view down the runway at dusk
// (WelcomeRunway), with the archive's name and "Gathering memories..."
// over the sky while the site loads (at least 5 seconds), then "Click to Start": the
// runway rushes past, a takeoff sound, a plane flying across, and the page
// fades in. The page behind can't be scrolled or
// tabbed to meanwhile. The loading logic is in lib/useWelcomeFlow.js.
export default function WelcomeScreen() {
  const { language, t } = useLanguage();
  // The archive's name: from collection.config.js, or its Khmer version.
  const name = language === "km" ? collectionText.km.name : collection.name;
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
      aria-label={name}
    >
      <WelcomeSky />
      <WelcomeRunway phase={phase} />
      {/* Top-right corner: the language switch and the sound button. */}
      <div className={styles.corner}>
        <LanguageToggle className={styles.lang} />
        <WelcomeSoundToggle on={soundOn} onToggle={toggleSound} />
      </div>
      <div className={styles.content}>
        <h1 className={styles.name}>{name}</h1>
        <p className={styles.tagline}>{t.welcomeTagline}</p>
        <WelcomeProgress progress={progress} />
        <p className={styles.status} aria-live="polite">
          {ready ? t.welcomeReady : t.welcomeLoading}
        </p>
        <WelcomeStartButton
          ref={startRef}
          ready={ready}
          label={t.welcomeStart}
          onClick={handleStart}
        />
      </div>
      <p className={styles.footer}>
        {t.welcomePlace} · {name}
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
