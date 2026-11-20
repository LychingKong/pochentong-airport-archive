import styles from "./Auth.module.css";
import AuthIcon from "./AuthIcon";

// One labelled input with an icon inside its left edge. `trailing` is an
// optional button inside the right edge (the password show/hide eye).
// Every other prop (type, value, onChange, required...) goes to the <input>.
export default function AuthField({ id, label, icon, trailing, ...input }) {
  const controlClass = `${styles.control} ${trailing ? styles.hasTrailing : ""}`;

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={controlClass}>
        <AuthIcon name={icon} className={styles.icon} />
        <input id={id} className={styles.input} {...input} />
        {trailing ? <div className={styles.trailing}>{trailing}</div> : null}
      </div>
    </div>
  );
}
