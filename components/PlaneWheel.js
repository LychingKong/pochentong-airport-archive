// One landing-gear tyre for PlaneIllustration, with an orange hub.
export default function PlaneWheel({ x, y, r }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#1b1f27" />
      <circle cx={x} cy={y} r={r * 0.42} fill="#e8641e" />
      <circle cx={x} cy={y} r={r * 0.14} fill="#fff" />
    </g>
  );
}
