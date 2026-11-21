import styles from "./WelcomeRunway.module.css";

// The colours of the welcome runway view (WelcomeRunway): sky, grass,
// tarmac, the horizon haze and the sun's and moon's glow, as SVG
// gradients. Each stop's colour is a CSS variable, set per time of day
// (morning, sunset, night) in WelcomeRunway.module.css. The ids are fixed
// (one welcome screen per page).
const stops = (names, offsets) =>
  names.map((name, i) => (
    <stop key={name} offset={offsets[i]} className={styles[name]} />
  ));

export default function WelcomeRunwayDefs() {
  return (
    <defs>
      <linearGradient id="runway-sky" x1="0" y1="0" x2="0" y2="1">
        {stops(["sky1", "sky2", "sky3", "sky4"], [0, 0.55, 0.9, 1])}
      </linearGradient>
      <linearGradient id="runway-ground" x1="0" y1="0" x2="0" y2="1">
        {stops(["ground1", "ground2"], [0, 1])}
      </linearGradient>
      <linearGradient id="runway-tarmac" x1="0" y1="0" x2="0" y2="1">
        {stops(["tarmac1", "tarmac2"], [0, 1])}
      </linearGradient>
      <linearGradient id="runway-haze" x1="0" y1="0" x2="0" y2="1">
        {stops(["hazeEdge", "hazeMid", "hazeEdge2"], [0, 0.8, 1])}
      </linearGradient>
      <radialGradient id="runway-sun">
        {stops(["glow1", "glow2", "glow3"], [0, 0.35, 1])}
      </radialGradient>
      <radialGradient id="runway-moon">
        <stop offset="0" stopColor="#dfe8ff" stopOpacity="0.5" />
        <stop offset="1" stopColor="#dfe8ff" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}
