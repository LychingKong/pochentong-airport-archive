import { useEffect } from "react";

// While `active`, everything beside `overlayRef` (the rest of the page)
// can't be clicked, tabbed to or read by screen readers (`inert`), and the
// page can't scroll. Used by the welcome screen; undone when it closes.
export function usePageLock(overlayRef, active) {
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!active || !overlay) return;
    const behind = [...overlay.parentElement.children].filter(
      (el) => el !== overlay && el.tagName !== "SCRIPT",
    );
    behind.forEach((el) => el.setAttribute("inert", ""));
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      behind.forEach((el) => el.removeAttribute("inert"));
      root.style.overflow = overflow;
    };
  }, [overlayRef, active]);
}
