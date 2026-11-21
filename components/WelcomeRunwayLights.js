"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./WelcomeRunway.module.css";

// The moving part of the runway view (WelcomeRunway): centreline dashes
// and edge lights drawn in perspective, streaming toward the viewer. They
// roll slowly while the site loads and race past once the takeoff starts.
// Still (one fixed frame) when reduced motion is asked for.
const HORIZON = 520;
const DROP = 380; // from the horizon to the bottom of the view
const CX = 800;
const HALF = 1024; // the runway's half-width one depth unit away
const FAR = 40; // the farthest depth drawn

// A point `side` half-widths from the centre at depth `d`.
const at = (d, side) => [CX + (side * HALF) / d, HORIZON + DROP / d];
// Repeating depths, shifted toward the viewer by `offset`.
const depths = (count, gap, offset) =>
  Array.from(
    { length: count },
    (_, i) => 0.6 + ((((i * gap - offset) % FAR) + FAR) % FAR),
  );

export default function WelcomeRunwayLights({ departing }) {
  const [offset, setOffset] = useState(0);
  const speed = useRef(0.7);

  useEffect(() => {
    speed.current = departing ? 14 : 0.7;
  }, [departing]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame;
    let last = performance.now();
    const tick = (now) => {
      setOffset((value) => value + (speed.current * (now - last)) / 1000);
      last = now;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <g>
      {depths(14, 3, offset).map((d) => {
        const [a, b, c, e] = [
          at(d, -0.014),
          at(d, 0.014),
          at(d + 1.6, 0.014),
          at(d + 1.6, -0.014),
        ];
        return (
          <polygon
            key={`c${d}`}
            points={[a, b, c, e].join(" ")}
            className={styles.dash}
          />
        );
      })}
      {depths(16, 2.5, offset).flatMap((d) =>
        [-1.06, 1.06].map((side) => {
          const [x, y] = at(d, side);
          return (
            <circle
              key={`l${side}${d}`}
              cx={x}
              cy={y}
              r={12 / d}
              className={styles.light}
            />
          );
        }),
      )}
    </g>
  );
}
