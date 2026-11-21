import AuthIcon from "./AuthIcon";
import styles from "./ContributeSuccess.module.css";
import { useLanguage } from "./LanguageProvider";

// The status on the /contribute success screen, as a three-step tracker:
// Submitted (done, green check), Pending Review (now, amber clock with a
// soft pulse) and Published (still to come). The line between the steps
// is filled up to the current one.
const STEPS = [
  { state: "done", icon: "check" },
  { state: "now", icon: "clock" },
  { state: "next", icon: null },
];

export default function SuccessTracker() {
  const { t } = useLanguage();
  const copy = t.contributeSuccess;

  return (
    <ol className={styles.tracker} aria-label={copy.statusLabel}>
      {STEPS.map(({ state, icon }, index) => (
        <li
          key={state}
          className={`${styles.step} ${styles[`step_${state}`]}`}
          aria-current={state === "now" ? "step" : undefined}
        >
          <span className={styles.stepDot} aria-hidden="true">
            {icon ? <AuthIcon name={icon} /> : null}
          </span>
          <span className={styles.stepName}>{copy.steps[index]}</span>
        </li>
      ))}
    </ol>
  );
}
