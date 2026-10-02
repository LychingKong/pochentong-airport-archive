"use client";

import styles from "./ContributeForm.module.css";
import { useLanguage } from "./LanguageProvider";

export default function FormFooter({ formError, saving }) {
  const { t } = useLanguage();

  return (
    <div className={styles.footer}>
      {formError ? (
        <p className={styles.formError} role="alert">
          {t.submitErrors[formError] || t.submitErrors.saveFailed}
        </p>
      ) : null}
      <p className={styles.note}>{t.requiredNote}</p>
      <button type="submit" className={styles.button} disabled={saving}>
        {saving ? <span className={styles.spinner} aria-hidden="true" /> : null}
        {saving ? t.submittingEntry : t.submitEntry}
      </button>
    </div>
  );
}
