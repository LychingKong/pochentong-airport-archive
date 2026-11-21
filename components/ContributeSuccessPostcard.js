import styles from "./ContributeSuccess.module.css";
import PlaneIcon from "./PlaneIcon";

// The memory postcard towed by the airliner on the /contribute success
// screen: cream paper with a small photo glued on (a sky snapshot with a
// plane), a PNH stamp, wavy postmark lines and handwriting lines, with a
// few sparkles around it. It sways gently on its rope. Decorative only.
const SPARKLE = "M0 -7L2 -2L7 0L2 2L0 7L-2 2L-7 0L-2 -2Z";

export default function ContributeSuccessPostcard() {
  return (
    <div className={styles.postcard}>
      <span className={styles.photo}>
        <PlaneIcon className={styles.photoPlane} />
      </span>
      <span className={styles.lines} />
      <svg className={styles.postmark} viewBox="0 0 60 30">
        <path d="M0 6q7.5-6 15 0t15 0 15 0 15 0M0 15q7.5-6 15 0t15 0 15 0 15 0M0 24q7.5-6 15 0t15 0 15 0 15 0" />
      </svg>
      <span className={styles.stamp}>
        <PlaneIcon className={styles.stampPlane} />
        <span className={styles.stampCode}>PNH</span>
      </span>

      <svg className={styles.sparkles} viewBox="-10 -10 120 80">
        <path d={SPARKLE} transform="translate(-2 6)" />
        <path d={SPARKLE} transform="translate(104 58) scale(0.7)" />
        <path d={SPARKLE} transform="translate(96 -4) scale(0.55)" />
      </svg>
    </div>
  );
}
