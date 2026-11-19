// Shading for PlaneIllustration: body and wing gradients, the soft ground
// shadow, and a clip shaped like the body (keeps the livery stripe inside it).
export default function PlaneDefs({ fuselage }) {
  return (
    <defs>
      <linearGradient id="plane-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="0.6" stopColor="#f0f2f5" />
        <stop offset="1" stopColor="#c7ced8" />
      </linearGradient>
      <linearGradient id="plane-wing" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f4f6f8" />
        <stop offset="1" stopColor="#ccd3dc" />
      </linearGradient>
      <radialGradient id="plane-shadow">
        <stop offset="0" stopColor="#000" stopOpacity="0.28" />
        <stop offset="1" stopColor="#000" stopOpacity="0" />
      </radialGradient>
      <clipPath id="plane-clip">
        <path d={fuselage} />
      </clipPath>
    </defs>
  );
}
