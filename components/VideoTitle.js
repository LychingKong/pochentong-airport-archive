"use client";

import { useTitleMask } from "../lib/useTitleMask";
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

// A video plays inside a box that is masked to the shape of the title
// letters. The real <h1> stays for screen readers and search engines.
export default function VideoTitle({ name, src, language, lines }) {
  const khmer = language === "km";
  const layout = LAYOUTS[khmer ? "km" : "en"];
  const { stageRef, videoRef, maskUrl } = useTitleMask({
    lines: splitLines(name, lines),
    layout,
    fontVar: khmer ? "--font-khmer" : "--font-heading",
    weight: khmer ? 700 : 800,
    spacing: khmer ? 0 : -3,
  });

  const stageStyle = { aspectRatio: `${layout.width} / ${layout.height}` };
  if (maskUrl) {
    stageStyle.maskImage = `url(${maskUrl})`;
    stageStyle.WebkitMaskImage = `url(${maskUrl})`;
  } else {
    stageStyle.visibility = "hidden";
  }

  return (
    <div className={styles.wrap}>
      <h1 className={styles.srOnly}>{name}</h1>
      <div ref={stageRef} className={styles.stage} style={stageStyle}>
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
    </div>
  );
}
