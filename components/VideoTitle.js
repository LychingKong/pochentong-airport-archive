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

// The title text is a mask: the video shows only inside the letters.
// The real <h1> stays for screen readers and search engines.
export default function VideoTitle({ name, src, language, lines }) {
  const { width, height, baselines, stretch } =
    LAYOUTS[language === "km" ? "km" : "en"];
  const titleLines = splitLines(name, lines);

  // Scales a line up from its baseline, so it grows taller without moving off its line.
  const stretchFrom = (baseline) =>
    `translate(0 ${baseline}) scale(1 ${stretch}) translate(0 ${-baseline})`;

  return (
    <div className={styles.wrap}>
      <h1 className={styles.srOnly}>{name}</h1>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${width} ${height}`}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <mask
            id="title-video-mask"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={width}
            height={height}
          >
            <rect width={width} height={height} fill="black" />
            <g className={styles.glyphs} fill="white">
              {titleLines.map((line, index) => (
                <text
                  key={index}
                  x="0"
                  y={baselines[index]}
                  transform={stretchFrom(baselines[index])}
                >
                  {line}
                </text>
              ))}
            </g>
          </mask>
        </defs>
        <foreignObject
          width={width}
          height={height}
          mask="url(#title-video-mask)"
        >
          <div className={styles.media}>
            <video
              className={styles.video}
              src={src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}
