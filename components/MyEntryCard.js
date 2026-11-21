"use client";

import Link from "next/link";

import AuthIcon from "./AuthIcon";
import { useLanguage } from "./LanguageProvider";
import styles from "./MyEntries.module.css";

// One entry on /my-entries: the photo on the left; on the right a status
// badge (Pending Review / Published / Returned), the title, a short
// description, and a footer with the submission date and an arrow. The
// whole card is one link to the entry.
const STATUS_ICONS = { pending: "clock", published: "check", returned: "undo" };

export default function MyEntryCard({ entry }) {
  const { language, t } = useLanguage();
  const km = language === "km";

  const title = (km && entry.title_km) || entry.title || t.untitledEntry;
  const description = (km && entry.description_km) || entry.description;
  const cover =
    (entry.images || "").split(",")[0].trim() || "/placeholder-image.png";

  return (
    <Link href={`/entries/${entry.id}`} className={styles.card}>
      <div className={styles.photo}>
        <img src={cover} alt="" loading="lazy" className={styles.photoImg} />
      </div>

      <div className={styles.body}>
        {/* The real status from the database (see app/my-entries/page.js). */}
        {STATUS_ICONS[entry.status] ? (
          <span
            className={`${styles.badge} ${styles[`status_${entry.status}`]}`}
          >
            <AuthIcon
              name={STATUS_ICONS[entry.status]}
              className={styles.badgeIcon}
            />
            {t.myEntriesDashboard.status[entry.status]}
          </span>
        ) : null}
        <h2 className={styles.cardTitle}>{title}</h2>
        {description ? <p className={styles.desc}>{description}</p> : null}

        <div className={styles.footer}>
          <span className={styles.date}>
            <AuthIcon name="calendar" className={styles.dateIcon} />
            {entry.date}
          </span>
          <span className={styles.arrowWrap} aria-hidden="true">
            <AuthIcon name="arrowRight" className={styles.arrow} />
          </span>
        </div>
      </div>
    </Link>
  );
}
