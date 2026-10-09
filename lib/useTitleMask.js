import { useEffect, useRef, useState } from "react";

import { drawTitleMask } from "./drawTitleMask";

// Builds the letter mask once the web font is ready, and starts the video.
// Until the mask exists the title stays hidden, so the whole video box is
// never shown. Reduced motion: the video is paused (and hidden by CSS).
export function useTitleMask({ lines, layout, fontVar, weight, spacing }) {
  const stageRef = useRef(null);
  const videoRef = useRef(null);
  const [maskUrl, setMaskUrl] = useState(null);
  const linesKey = lines.join("|");

  useEffect(() => {
    let alive = true;
    const fontFamily = getComputedStyle(stageRef.current).getPropertyValue(
      fontVar,
    );
    setMaskUrl(null);
    document.fonts
      .load(`${weight} 100px ${fontFamily}`, linesKey)
      .catch(() => {})
      .finally(() => {
        if (!alive) return;
        setMaskUrl(
          drawTitleMask({
            lines: linesKey.split("|"),
            layout,
            fontFamily,
            weight,
            letterSpacing: spacing,
          }),
        );
      });
    return () => {
      alive = false;
    };
  }, [linesKey, layout, fontVar, weight, spacing]);

  useEffect(() => {
    const video = videoRef.current;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      video.pause();
      return;
    }
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  return { stageRef, videoRef, maskUrl };
}
