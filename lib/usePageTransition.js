import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { advanceTrail, createTrail } from "./navigationTrail";

const FLY_MS = 350;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Drives the plane: "leaving" while an in-app link is clicked, "arriving"
// once the new page is showing. Direction is "back" for links marked
// data-direction="back" and for the browser's Back button, else "forward".
export function usePageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState("idle");
  const [direction, setDirection] = useState("forward");
  const clickTarget = useRef(null);
  const clickDirection = useRef(null);
  const fromHistoryButtons = useRef(false);
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

      event.preventDefault();
      clickTarget.current = url.pathname + url.search + url.hash;
      clickDirection.current =
        link.dataset.direction === "back" ? "back" : "forward";
      setDirection(clickDirection.current);
      setPhase("leaving");
      router.push(clickTarget.current);
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
      clickDirection.current = null;
      setPhase("idle");
    };
    if (prefersReducedMotion()) {
      finish();
      return;
    }
    setDirection(clickDirection.current || moved);
    setPhase("arriving");
    const done = setTimeout(finish, FLY_MS);
    return () => clearTimeout(done);
  }, [pathname]);

  return { phase, direction };
}
