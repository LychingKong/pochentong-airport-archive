import AuthIcon from "./AuthIcon";
import { useLanguage } from "./LanguageProvider";
import styles from "./SubmitTakeoff.module.css";

// The caption of the after-submit takeoff (SubmitTakeoff): "Sending your
// memory to the archive…" with a progress bar that fills over
// `durationMs`; then a check, "Delivered to the archive!", and a round
// PNH · RECEIVED postmark stamped above it.
export default function TakeoffCaption({ started, delivered, durationMs }) {
  const { t } = useLanguage();
  const copy = t.contributePass;

  return (
    <div className={`${styles.captionWrap} ${started ? styles.shown : ""}`}>
      <div className={`${styles.stamp} ${delivered ? styles.stamped : ""}`}>
        <span className={styles.stampCode}>PNH</span>
        <span className={styles.stampText}>{copy.received}</span>
      </div>
      <p className={`${styles.caption} ${delivered ? styles.captionDone : ""}`}>
        <span className={styles.captionIcon}>
          <AuthIcon name={delivered ? "check" : "send"} />
        </span>
        {delivered ? copy.delivered : copy.sending}
      </p>
      <span className={styles.progress}>
        <span
          className={styles.progressFill}
          style={{ animationDuration: `${durationMs}ms` }}
        />
      </span>
    </div>
  );
}
