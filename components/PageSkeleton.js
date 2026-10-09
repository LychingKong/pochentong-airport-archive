import styles from "./PageSkeleton.module.css";

// Shown at once while a server-rendered page is loading.
export default function PageSkeleton() {
  return (
    <main className={styles.wrap} aria-busy="true">
      <div className={styles.layout}>
        <div className={`${styles.block} ${styles.image}`} />
        <div>
          <div className={styles.bar} style={{ width: "70%", height: 34 }} />
          <div className={styles.bar} style={{ width: "40%" }} />
          <div className={styles.bar} />
          <div className={styles.bar} />
          <div className={styles.bar} style={{ width: "85%" }} />
        </div>
      </div>
    </main>
  );
}
