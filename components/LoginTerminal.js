import styles from "./LoginScene.module.css";

// A flat drawing of the airport at the bottom of the sign-in scene: the
// apron, a long two-storey terminal with glass bands, and the control
// tower on the right. Colors live in LoginScene.module.css. The pattern id
// is fixed because the page shows one terminal.
export default function LoginTerminal({ className }) {
  return (
    <svg className={className} viewBox="0 0 800 260">
      <defs>
        {/* Thin cream posts that split the glass bands into panes. */}
        <pattern
          id="login-mullions"
          width="30"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <rect width="4" height="10" className={styles.wall} />
        </pattern>
      </defs>

      {/* apron, with a painted taxi line */}
      <rect y="214" width="800" height="46" className={styles.apron} />
      <path d="M0 240H800" className={styles.taxiLine} />

      {/* terminal: roof, walls, two glass bands with posts */}
      <rect x="20" y="104" width="640" height="14" className={styles.roof} />
      <rect x="32" y="118" width="616" height="96" className={styles.wall} />
      <rect x="50" y="134" width="580" height="26" className={styles.glass} />
      <rect x="50" y="174" width="580" height="26" className={styles.glass} />
      <rect
        x="50"
        y="134"
        width="580"
        height="66"
        fill="url(#login-mullions)"
      />

      {/* control tower */}
      <path d="M713 6V26" className={styles.antenna} />
      <rect
        x="690"
        y="24"
        width="46"
        height="9"
        rx="3"
        className={styles.roof}
      />
      <rect
        x="682"
        y="33"
        width="62"
        height="28"
        rx="4"
        className={styles.glass}
      />
      <rect x="686" y="61" width="54" height="8" className={styles.roof} />
      <rect x="700" y="69" width="26" height="145" className={styles.wall} />
    </svg>
  );
}
