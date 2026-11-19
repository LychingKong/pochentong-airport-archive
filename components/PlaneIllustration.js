import PlaneDefs from "./PlaneDefs";
import PlaneWheel from "./PlaneWheel";

// A white airliner in side view, facing right, in the archive's navy and
// runway-orange livery. Pure SVG, so no image file or package is needed.
// Decorative only: screen readers skip it.
const NAVY = "#0b2545";
const ORANGE = "#e8641e";
const GLASS = "#1c2a40";

const FUSELAGE =
  "M70 178C70 166 92 152 140 150L800 150C868 150 930 168 958 196C966 205 962 218 950 224C930 234 900 240 860 240L250 240C170 240 110 222 80 200C72 194 70 186 70 178Z";

const WINDOWS = Array.from({ length: 24 }, (_, i) => 300 + i * 21);

// Outlines of the front and rear doors: [x, height].
const DOORS = [
  [818, 50],
  [262, 46],
];

export default function PlaneIllustration({ className }) {
  return (
    <svg className={className} viewBox="0 0 1000 400" aria-hidden="true">
      <PlaneDefs fuselage={FUSELAGE} />

      <ellipse cx="540" cy="372" rx="430" ry="20" fill="url(#plane-shadow)" />

      {/* tail fin and tailplane */}
      <path
        d="M290 151L175 36C168 29 160 26 150 26L118 26C104 26 98 36 104 48L150 151Z"
        fill={NAVY}
      />
      <path d="M246 151L150 52L166 52L262 151Z" fill={ORANGE} />
      <path
        d="M200 196L96 168C84 165 78 174 86 181L170 214Z"
        fill="url(#plane-wing)"
      />

      {/* landing gear struts (drawn before the body so it covers their tops) */}
      <rect x="556" y="232" width="9" height="100" rx="3" fill="#9aa3b0" />
      <rect x="864" y="230" width="8" height="88" rx="3" fill="#9aa3b0" />

      {/* body, livery stripe, windows, doors, cockpit */}
      <path d={FUSELAGE} fill="url(#plane-body)" />
      <g clipPath="url(#plane-clip)">
        <rect x="60" y="203" width="920" height="6" fill={ORANGE} />
        <rect x="60" y="209" width="920" height="3" fill={NAVY} />
      </g>
      {WINDOWS.map((x) => (
        <rect
          key={x}
          x={x}
          y="172"
          width="9"
          height="13"
          rx="4"
          fill={GLASS}
          opacity="0.85"
        />
      ))}
      {DOORS.map(([x, height]) => (
        <rect
          key={x}
          x={x}
          y="166"
          width="19"
          height={height}
          rx="5"
          fill="none"
          stroke="#c3cad4"
          strokeWidth="2"
        />
      ))}
      <path
        d="M902 172L930 176C938 180 944 186 946 192L906 190Z"
        fill={GLASS}
      />

      {/* wing, pylon and engine */}
      <path
        d="M600 214L384 330C378 337 372 340 362 340L336 340C326 340 322 334 328 328L470 220Z"
        fill="url(#plane-wing)"
      />
      <path d="M540 244L522 264L566 264L580 238Z" fill="#b9c1cc" />
      <path
        d="M470 262L586 262C600 262 608 272 608 282C608 292 600 302 586 302L470 302C460 302 452 292 452 282C452 272 460 262 470 262Z"
        fill={NAVY}
      />
      <ellipse cx="602" cy="282" rx="7" ry="18" fill="#05101f" />
      <path d="M452 270L432 276L432 288L452 294Z" fill="#7d8796" />

      <PlaneWheel x={546} y={344} r={22} />
      <PlaneWheel x={578} y={344} r={22} />
      <PlaneWheel x={868} y={334} r={16} />
    </svg>
  );
}
