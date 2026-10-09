"use client";

import styles from "./ContributeForm.module.css";
import { useLanguage } from "./LanguageProvider";

export default function FormSection({ id, number, required, children }) {
  const { t } = useLanguage();
  const { title, hint } = t.sections[id];

  return (
    <section className={styles.section} aria-labelledby={`${id}-heading`}>
      <div>
        <span className={styles.sectionNumber}>{number}</span>
        <h2 id={`${id}-heading`} className={styles.sectionTitle}>
          {title}
          {required ? <span className={styles.required}> *</span> : null}
          {required ? null : (
            <span className={styles.optional}>{t.optional}</span>
          )}
        </h2>
        <p id={`${id}-hint`} className={styles.sectionHint}>
          {hint}
        </p>
      </div>
      <div className={styles.sectionFields}>{children}</div>
    </section>
  );
}
