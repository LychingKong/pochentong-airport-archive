import styles from "./VideoTitle.module.css";

// Drawing units: the font is 100 per line, and the box fits the longest line.
const WIDTH = 920;
const HEIGHT = 250;
const STRETCH = 1.25;
const FIRST_BASELINE = 100;
const SECOND_BASELINE = 210;

// Scales a line up and down from its baseline, so it grows taller without moving off its line.
const stretchFrom = (baseline) =>
  `translate(0 ${baseline}) scale(1 ${STRETCH}) translate(0 ${-baseline})`;

// The title text is a mask: the video shows only inside the letters.
// The real <h1> stays for screen readers and search engines.
export default function VideoTitle({ name, src }) {
  const [firstLine, ...restWords] = name.split(" ");
  const secondLine = restWords.join(" ");

  return (
    <div className={styles.wrap}>
      <h1 className={styles.srOnly}>{name}</h1>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <mask
            id="title-video-mask"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={WIDTH}
            height={HEIGHT}
          >
            <rect width={WIDTH} height={HEIGHT} fill="black" />
            <g className={styles.glyphs} fill="white">
              <text
                x="0"
                y={FIRST_BASELINE}
                transform={stretchFrom(FIRST_BASELINE)}
              >
                {firstLine}
              </text>
              <text
                x="0"
                y={SECOND_BASELINE}
                transform={stretchFrom(SECOND_BASELINE)}
              >
                {secondLine}
              </text>
            </g>
          </mask>
        </defs>
        <foreignObject
          width={WIDTH}
          height={HEIGHT}
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
