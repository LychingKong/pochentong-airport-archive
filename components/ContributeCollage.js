import CollagePrint from "./CollagePrint";
import styles from "./ContributeCollage.module.css";
import PlaneIcon from "./PlaneIcon";

// Where each print sits, front to back, and the drawn scene it falls back
// to when there is no photo for it. The newest entry gets the big print.
const SLOTS = [
  { slot: "main", fallback: "day" },
  { slot: "back", fallback: "vintage" },
  { slot: "small", fallback: "sunset" },
];

// The picture beside the /contribute headline: up to three real photos
// from published entries as tilted prints (each opens its entry), a PNH
// postage stamp and wavy postmark lines.
export default function ContributeCollage({ photos = [] }) {
  return (
    <div className={styles.collage}>
      {SLOTS.map(({ slot, fallback }, index) => (
        <CollagePrint
          key={slot}
          slot={slot}
          photo={photos[index]}
          fallbackMood={fallback}
        />
      ))}

      <svg className={styles.postmark} viewBox="0 0 120 60" aria-hidden="true">
        <path d="M0 12q10-8 20 0t20 0 20 0 20 0 20 0 20 0" />
        <path d="M0 26q10-8 20 0t20 0 20 0 20 0 20 0 20 0" />
        <path d="M0 40q10-8 20 0t20 0 20 0 20 0 20 0 20 0" />
        <path d="M0 54q10-8 20 0t20 0 20 0 20 0 20 0 20 0" />
      </svg>

      <div className={styles.stamp} aria-hidden="true">
        <div className={styles.stampInner}>
          <PlaneIcon className={styles.stampPlane} />
          <span className={styles.stampCode}>PNH</span>
        </div>
      </div>
    </div>
  );
}
