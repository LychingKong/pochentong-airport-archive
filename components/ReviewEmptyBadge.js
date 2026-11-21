import styles from "./ReviewEmpty.module.css";

// The round PNH "all clear" stamp in the corner of the /review empty-state
// scene: an orange ring, a navy face, a white check mark that draws itself
// as the page opens, and "PNH" underneath. Decorative only.
export default function ReviewEmptyBadge() {
  return (
    <svg className={styles.badge} viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="48" className={styles.badgeRing} />
      <circle cx="50" cy="50" r="39" className={styles.badgeFace} />
      <path d="M33 46L45 58L67 36" className={styles.check} />
      <text x="50" y="78" className={styles.badgeCode}>
        PNH
      </text>
    </svg>
  );
}
