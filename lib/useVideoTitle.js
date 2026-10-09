import { useEffect, useRef } from "react";

import { drawVideoTitle } from "./drawVideoTitle";

// Keeps a canvas sized to its box and redraws the video-filled title every
// frame. Without video (reduced motion, or the browser won't autoplay, e.g.
// Low Power Mode on iPhone) the letters are drawn solid instead.
export function useVideoTitle({ lines, layout, fontVar, weight, spacing }) {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const linesKey = lines.join("|");

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const fontFamily = getComputedStyle(canvas).getPropertyValue(fontVar);
    let frame = 0;
    let alive = true;

    function resize() {
      const box = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(box.width * ratio);
      canvas.height = Math.round(box.height * ratio);
      ctx.setTransform(
        canvas.width / layout.width,
        0,
        0,
        canvas.height / layout.height,
        0,
        0,
      );
    }

    function loop() {
      if (!alive) return;
      if (!document.hidden) {
        drawVideoTitle(ctx, {
          lines: linesKey.split("|"),
          layout,
          fontFamily,
          weight,
          letterSpacing: spacing,
          video: reduced ? null : video,
          fallbackColor: getComputedStyle(canvas).color,
        });
      }
      frame = requestAnimationFrame(loop);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    if (reduced) {
      video.pause();
    } else {
      video.muted = true;
      video.play().catch(() => {});
    }
    // Wait for the web font, or the first frames would use a fallback font.
    document.fonts
      .load(`${weight} 100px ${fontFamily}`, linesKey)
      .catch(() => {})
      .finally(() => {
        if (alive) loop();
      });

    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [linesKey, layout, fontVar, weight, spacing]);

  return { canvasRef, videoRef };
}
