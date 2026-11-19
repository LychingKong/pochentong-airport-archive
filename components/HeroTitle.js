import styles from "./HeroTitle.module.css";
import PlaneIcon from "./PlaneIcon";

// Uses the given lines when there are any (Khmer has no spaces, so its two
// lines are set by hand in translations.js); otherwise the first word goes
// on line 1 and the rest on line 2.
function splitLines(name, lines) {
  if (lines) return lines;
  const [first, ...rest] = name.split(" ");
  return [first, rest.join(" ")];
}

// The homepage title: two bold lines, with a plane badge and a location-pin
// badge after the first line (decorative, so screen readers skip them).
export default function HeroTitle({ name, lines }) {
  const [first, second] = splitLines(name, lines);

  return (
    <h1 className={styles.title}>
      <span className={styles.line}>
        {first}
        <span className={styles.badges} aria-hidden="true">
          <span className={`${styles.badge} ${styles.badgePlane}`}>
            <PlaneIcon className={styles.planeIcon} />
          </span>
          <span className={`${styles.badge} ${styles.badgePin}`}>
            <svg className={styles.pinIcon} viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"
              />
            </svg>
          </span>
        </span>
      </span>
      <span className={styles.line}>{second}</span>
    </h1>
  );
}
