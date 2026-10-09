"use client";

import { useVideoTitle } from "../lib/useVideoTitle";
import styles from "./VideoTitle.module.css";

// Drawing units per language: the font is 100 per line, and the box fits the
// longest line. Khmer needs more height for its tall marks above and below.
const LAYOUTS = {
  en: { width: 920, height: 250, baselines: [100, 210], stretch: 1.25 },
  km: { width: 900, height: 330, baselines: [140, 280], stretch: 1.1 },
};

// Uses the given lines when there are any (Khmer); otherwise puts the first
// word on line 1 and the rest on line 2.
function splitLines(name, lines) {
  if (lines) return lines;
  const [first, ...rest] = name.split(" ");
  return [first, rest.join(" ")];
}

// The title letters are drawn on a canvas with the video playing inside them.
// The real <h1> stays for screen readers and search engines.
export default function VideoTitle({ name, src, language, lines }) {
  const khmer = language === "km";
  const layout = LAYOUTS[khmer ? "km" : "en"];
  const { canvasRef, videoRef } = useVideoTitle({
    lines: splitLines(name, lines),
    layout,
    fontVar: khmer ? "--font-khmer" : "--font-heading",
    weight: khmer ? 700 : 800,
    spacing: khmer ? 0 : -3,
  });

  return (
    <div className={styles.wrap}>
      <h1 className={styles.srOnly}>{name}</h1>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        style={{ aspectRatio: `${layout.width} / ${layout.height}` }}
        aria-hidden="true"
      />
      <video
        ref={videoRef}
        className={styles.video}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
    </div>
  );
}
