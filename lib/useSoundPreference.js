import { useEffect, useState } from "react";

const SOUND_KEY = "pochentong-welcome-sound";

// Reads the saved choice once, outside React. The entry-page takeoff
// (lib/usePageTransition.js) uses it to follow the welcome screen's toggle.
export function isSoundOn() {
  try {
    return localStorage.getItem(SOUND_KEY) !== "off";
  } catch {
    return true; // storage blocked: keep the default
  }
}

// The welcome screen's sound on/off choice, remembered on this device.
// On by default; the sound itself only ever plays after a click.
export function useSoundPreference() {
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    if (!isSoundOn()) setSoundOn(false);
  }, []);

  function toggleSound() {
    setSoundOn((on) => {
      try {
        localStorage.setItem(SOUND_KEY, on ? "off" : "on");
      } catch {
        // storage blocked: the choice still applies for this visit
      }
      return !on;
    });
  }

  return [soundOn, toggleSound];
}
