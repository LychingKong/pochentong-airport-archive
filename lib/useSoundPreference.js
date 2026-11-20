import { useEffect, useState } from "react";

const SOUND_KEY = "pochentong-welcome-sound";

// The welcome screen's sound on/off choice, remembered on this device.
// On by default; the sound itself only ever plays after a click.
export function useSoundPreference() {
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    try {
      if (localStorage.getItem(SOUND_KEY) === "off") setSoundOn(false);
    } catch {
      // storage blocked: keep the default
    }
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
