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
  // Used by the /review restricted screen and the /my-entries empty state.
  layers: "M12 3l9 5-9 5-9-5zM3 12.5l9 5 9-5M3 16.5l9 5 9-5",
  plus: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8v8M8 12h8",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7.5V12l3 2",
  // Used by the /my-entries listing.
  document: "M7 3h7l5 5v13H7zM14 3v5h5M10 12h6M10 16h6M10 8h2",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  sort: "M8 20V4M4 8l4-4 4 4M16 4v16M12 16l4 4 4-4",
  chevronDown: "M6 9l6 6 6-6",
  // Used by the /review board (statuses, Publish / Return, close).
  check: "M5 12.5l4.5 4.5L19 7.5",
  undo: "M9 14L4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11",
  close: "M6 6l12 12M18 6L6 18",
  // A paper plane: the Submit Memory button on /contribute.
  send: "M21 3L3 10.5l7.5 3L21 3zM21 3l-7.5 18-3-7.5",
  // A speech bubble: the reviewer's note on a returned entry.
  comment: "M4 5h16v11H9l-5 4zM8 9h8M8 12h5",
  // A bin: the Delete button on the entry page (EntryOwnerActions).
  trash: "M4 7h16M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13M10 11v5.5M14 11v5.5",
  // A pencil: "Edit entry" under the reviewer's note (and the entry
  // page's Edit button).
  pencil: "M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4",
  // A clipboard with a tick: the Review button on /review cards.
  clipboardCheck: "M9 4h6v3H9zM7 5.5H5.5V21h13V5.5H17M9 14l2 2 4-4.5",
  // Two diagonal arrows: the zoom badge on the /review photo (the same
  // shape as the entry page's zoom badge in EntryGallery).
  expand: "M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7",
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
