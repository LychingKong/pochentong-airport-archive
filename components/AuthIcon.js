// Small line icons for the sign-in/sign-up forms and the /contribute
// landing page, drawn in the text color.
// Decorative only: every field and button has its own text or label.
const PATHS = {
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  lock: "M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3M12 15v2",
  eye: "M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  eyeOff:
    "M3 3l18 18M10.6 6.1A9.6 9.6 0 0 1 12 6c6 0 9.5 6 9.5 6a16 16 0 0 1-3 3.6M6.6 7.6C4 9.3 2.5 12 2.5 12S6 18 12 18a9 9 0 0 0 4.4-1.1M9.9 9.9a3 3 0 0 0 4.2 4.2",
  signIn: "M10 4h8a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-8M3 12h11M10 8l4 4-4 4",
  userPlus:
    "M9.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2.5 21v-.5a6.5 6.5 0 0 1 11-4.7M18.5 14v7M15 17.5h7",
  // Used by the /review restricted screen's two buttons.
  layers: "M12 3l9 5-9 5-9-5zM3 12.5l9 5 9-5M3 16.5l9 5 9-5",
  plus: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8v8M8 12h8",
};

export default function AuthIcon({ name, className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <path
        d={PATHS[name]}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
