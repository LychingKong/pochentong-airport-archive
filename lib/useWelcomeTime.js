import { useEffect, useState } from "react";

const TIME_KEY = "pochentong-welcome-time";
export const WELCOME_TIMES = ["morning", "sunset", "night"];

// The welcome screen's time of day (morning, sunset or night), remembered
// on this device. Sunset by default; a blocked storage just means the
// choice isn't kept for next time.
export function useWelcomeTime() {
  const [time, setTimeState] = useState("sunset");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(TIME_KEY);
      if (WELCOME_TIMES.includes(saved)) setTimeState(saved);
    } catch {
      // storage blocked: keep sunset
    }
  }, []);

  function setTime(next) {
    setTimeState(next);
    try {
      localStorage.setItem(TIME_KEY, next);
    } catch {
      // storage blocked: the choice still applies for this visit
    }
  }

  return [time, setTime];
}
