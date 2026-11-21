import { useEffect, useState } from "react";

// sessionStorage key: set once the welcome screen has been passed in this
// browser session. The layout's early script reads it too (app/layout.js).
export const WELCOME_KEY = "pochentong-welcome-seen";

const MIN_MS = 2000; // show the loading screen at least this long
const MAX_WAIT_MS = 15000; // never wait longer than this for the page

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Resolves when the page and its fonts have really finished loading, or
// after MAX_WAIT_MS if something (a slow image) never finishes.
function waitForPage() {
  const loaded =
    document.readyState === "complete"
      ? Promise.resolve()
      : new Promise((done) =>
          window.addEventListener("load", done, { once: true }),
        );
  const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
  const cap = new Promise((done) => setTimeout(done, MAX_WAIT_MS));
  return Promise.race([Promise.all([loaded, fonts]), cap]);
}

// Phases: loading -> ready -> departing (plane flies) -> leaving (fades)
// -> hidden. Visitors who already passed it this session start "hidden".
export function useWelcomeFlow() {
  const [phase, setPhase] = useState("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(WELCOME_KEY) === "1";
    } catch {
      // storage blocked: just show the screen
    }
    if (seen) {
      setPhase("hidden");
      return;
    }

    // The bar follows the clock to the 2-second minimum, but stops at 90%
    // until the page is really ready.
    let ready = false;
    let frame;
    const startedAt = performance.now();
    waitForPage().then(() => {
      ready = true;
    });
    const tick = () => {
      const time = Math.min((performance.now() - startedAt) / MIN_MS, 1);
      setProgress(ready ? time : Math.min(time, 0.9));
      if (ready && time >= 1) {
        setPhase("ready");
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  // "Click to Start": the plane flies, the screen fades, then it is gone
  // for the rest of the session. Reduced motion: a quick fade only.
  function start() {
    if (phase !== "ready") return;
    const reduce = prefersReducedMotion();
    setPhase("departing");
    setTimeout(() => setPhase("leaving"), reduce ? 0 : 1800);
    setTimeout(
      () => {
        try {
          sessionStorage.setItem(WELCOME_KEY, "1");
        } catch {
          // storage blocked: it may show again on reload, which is fine
        }
        setPhase("hidden");
      },
      reduce ? 300 : 2700,
    );
  }

  return { phase, progress, start };
}
