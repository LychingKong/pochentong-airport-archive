import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { advanceTrail, createTrail } from "./navigationTrail";
import { playTakeoffSound } from "./takeoffSound";
import { isSoundOn } from "./useSoundPreference";

// Most page changes cross-fade: the current page fades out to the page
// color (FADE_COVER_MS), the new page is loaded, then it fades in
// (FADE_IN_MS). Matches PageTransition.module.css.
const FADE_COVER_MS = 180;
const FADE_IN_MS = 320;

// Opening an entry plays the big takeoff instead of the fade. The
// page loads underneath; the sky starts fading TAKEOFF_MS after the click
// (by then the airliner is nearly across) and is gone TAKEOFF_FADE_MS later.
const ENTRY_PAGE = /^\/entries\/[^/]+$/;
const TAKEOFF_MS = 2000;
const TAKEOFF_FADE_MS = 500;
// Wait for the sky to cover the old page before switching pages, so the
// swap is never glimpsed (matches the fade-in in TakeoffOverlay.module.css).
const TAKEOFF_COVER_MS = 350;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Drives the page-change animation: "leaving" while an in-app link is
// clicked, "arriving" once the new page is showing. Kind is "takeoff" for
// links to an entry, else "fade". Going back gets no animation at all:
// links marked data-direction="back" (the logo, "Back to homepage") and the
// browser's Back button simply switch pages.
export function usePageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState("idle");
  const [kind, setKind] = useState("fade");
  const clickTarget = useRef(null);
  const clickKind = useRef("fade");
  const clickedAt = useRef(0);
  const fromHistoryButtons = useRef(false);
  const goingBack = useRef(false); // a back link was clicked: no arrival
  const trail = useRef(createTrail(pathname));

  useEffect(() => {
    function onClick(event) {
      if (clickTarget.current || event.defaultPrevented || event.button !== 0)
        return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      const link = event.target.closest?.("a[href]");
      if (!link || link.target === "_blank" || link.hasAttribute("download"))
        return;
      const url = new URL(link.href);
      if (url.origin !== window.location.origin) return;
      const here = window.location.pathname + window.location.search;
      if (url.pathname + url.search === here) return;
      if (prefersReducedMotion()) return;
      if (link.dataset.direction === "back") {
        goingBack.current = true; // the link navigates by itself, unanimated
        return;
      }

      event.preventDefault();
      clickTarget.current = url.pathname + url.search + url.hash;
      clickKind.current = ENTRY_PAGE.test(url.pathname) ? "takeoff" : "fade";
      clickedAt.current = performance.now();
      setKind(clickKind.current);
      setPhase("leaving");
      const target = clickTarget.current;
      if (clickKind.current === "takeoff") {
        // The welcome screen's jet whoosh, unless its speaker was turned off.
        // Played here, inside the click, because browsers only allow sound
        // right after one.
        if (isSoundOn()) playTakeoffSound();
        setTimeout(() => router.push(target), TAKEOFF_COVER_MS);
      } else {
        // Switch pages once the old one has faded out completely.
        setTimeout(() => router.push(target), FADE_COVER_MS);
      }
    }
    function onHistoryButton() {
      fromHistoryButtons.current = true;
    }
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onHistoryButton);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onHistoryButton);
    };
  }, [router]);

  useEffect(() => {
    if (trail.current.paths[trail.current.position] === pathname) return;
    const moved = advanceTrail(
      trail.current,
      pathname,
      fromHistoryButtons.current,
    );
    fromHistoryButtons.current = false;
    const finish = () => {
      clickTarget.current = null;
      clickKind.current = "fade";
      setKind("fade");
      setPhase("idle");
    };
    const backNoClick = moved === "back" && !clickTarget.current;
    if (prefersReducedMotion() || goingBack.current || backNoClick) {
      goingBack.current = false;
      finish();
      return;
    }
    if (clickKind.current === "takeoff") {
      // Let the airliner finish crossing before the sky fades to the entry.
      const flown = performance.now() - clickedAt.current;
      const wait = Math.max(0, TAKEOFF_MS - flown);
      const fade = setTimeout(() => setPhase("arriving"), wait);
      const done = setTimeout(finish, wait + TAKEOFF_FADE_MS);
      return () => {
        clearTimeout(fade);
        clearTimeout(done);
      };
    }
    setPhase("arriving");
    const done = setTimeout(finish, FADE_IN_MS);
    return () => clearTimeout(done);
  }, [pathname]);

  return { phase, kind };
}
