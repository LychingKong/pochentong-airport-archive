"use client";

import styles from "./ContributeForm.module.css";
import { useLanguage } from "./LanguageProvider";

// One row of the boarding-pass form, like a field on a ticket: a small
// "02 · TITLE" label with * (required) or an Optional chip, the hint, then
// the fields (English and Khmer side by side on wide screens).
export default function FormSection({ id, number, required, children }) {
  const { t } = useLanguage();
  const { title, hint } = t.sections[id];

  return (
    <section className={styles.section} aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className={styles.sectionTitle}>
        <span className={styles.sectionNumber} aria-hidden="true">
          {number}
        </span>
        {title}
        {required ? (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        ) : (
          <span className={styles.optional}>{t.optional}</span>
        )}
      </h2>
      <p id={`${id}-hint`} className={styles.sectionHint}>
        {hint}
      </p>
      <div className={styles.sectionFields}>{children}</div>
    </section>
  );
}
