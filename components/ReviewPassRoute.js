"use client";

import { useLanguage } from "./LanguageProvider";
import PlaneIcon from "./PlaneIcon";
import styles from "./ReviewRestricted.module.css";

// The printed part of the /review boarding pass above the message: the
// route (PNH to the Review Area, with a plane on a dashed line) and a row
// of ticket details. Labels on one line, values on the next, as on a pass.
export default function ReviewPassRoute() {
  const { t } = useLanguage();
  const copy = t.reviewRestricted;
  const details = [
    [copy.passengerLabel, copy.passengerValue],
    [copy.boardingLabel, copy.boardingValue],
    [copy.classLabel, copy.classValue],
  ];

  return (
    <>
      <div className={styles.route}>
        <span className={styles.label}>{copy.fromLabel}</span>
        <span aria-hidden="true" />
        <span className={`${styles.label} ${styles.toLabel}`}>
          {copy.toLabel}
        </span>

        <span className={styles.code}>PNH</span>
        <span className={styles.routeLine} aria-hidden="true">
          <span className={styles.routeDot} />
          <PlaneIcon className={styles.routePlane} />
          <span className={styles.routeDot} />
        </span>
        <span className={styles.destination}>{copy.toValue}</span>
      </div>

      <dl className={styles.details}>
        {details.map(([label, value]) => (
          <div key={label} className={styles.detail}>
            <dt className={styles.label}>{label}</dt>
            <dd className={styles.detailValue}>{value}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
