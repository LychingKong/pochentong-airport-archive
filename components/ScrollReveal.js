"use client";

import { useEffect } from "react";

// Elements that arrive together (a row of cards) start this far apart.
const STAGGER_MS = 90;
const MAX_STAGGER_STEPS = 5;

// Site-wide scroll reveal, mounted once in app/layout.js. Any element marked
// data-reveal fades and rises into place the first time it scrolls into
// view (the animation itself is in app/theme.css). Elements already on
// screen when a page opens reveal straight away, so the first screen gets
// an entrance too. It also picks up content that appears later (the
// homepage cards load after the page, other pages arrive by navigation).
export default function ScrollReveal() {
  useEffect(() => {
    // Tells the early script in layout.js that the reveal is running, so it
    // doesn't switch hiding off as a safety measure.
    document.documentElement.dataset.scrollReveal = "ready";

    const observer = new IntersectionObserver(
      (entries) => {
        const arrived = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top ||
              a.boundingClientRect.left - b.boundingClientRect.left,
          );
        arrived.forEach((entry, index) => {
          const step = Math.min(index, MAX_STAGGER_STEPS);
          entry.target.style.setProperty(
            "--reveal-delay",
            `${step * STAGGER_MS}ms`,
          );
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        });
      },
      // Reveal once an element is a little way above the bottom edge.
      { rootMargin: "0px 0px -8% 0px" },
    );

    function watchNewElements() {
      document
        .querySelectorAll("[data-reveal]:not([data-revealed])")
        .forEach((element) => observer.observe(element));
    }

    watchNewElements();
    const changes = new MutationObserver(watchNewElements);
    changes.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      changes.disconnect();
    };
  }, []);

  return null;
}
