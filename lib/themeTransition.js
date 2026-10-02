import { flushSync } from "react-dom";

// Must match the key read by the script in app/layout.js.
export const THEME_KEY = "pochentong-theme";

function applyTheme(next, onApplied) {
  document.documentElement.dataset.theme = next;
  try {
    window.localStorage.setItem(THEME_KEY, next);
  } catch {
    // Storage blocked (e.g. private browsing): still switches for this visit.
  }
  onApplied(next);
}

// Switches the theme with a circle that grows out of `origin` (the toggle
// button). Browsers without View Transitions get a plain color fade, and
// people who asked for reduced motion get an instant switch.
export function switchTheme(next, origin, onApplied) {
  const root = document.documentElement;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    applyTheme(next, onApplied);
    return;
  }

  if (!document.startViewTransition) {
    root.classList.add("theme-fade");
    applyTheme(next, onApplied);
    setTimeout(() => root.classList.remove("theme-fade"), 400);
    return;
  }

  const { left, top, width, height } = origin.getBoundingClientRect();
  const x = left + width / 2;
  const y = top + height / 2;
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  // flushSync makes React redraw the icon inside the snapshot, not after it.
  const transition = document.startViewTransition(() => {
    flushSync(() => applyTheme(next, onApplied));
  });

  transition.ready
    .then(() => {
      root.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 550,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    })
    .catch(() => {
      // The animation was skipped (e.g. tab hidden); the theme still switched.
    });
}
