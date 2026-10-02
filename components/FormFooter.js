"use client";

import styles from "./ContributeForm.module.css";
import { useLanguage } from "./LanguageProvider";

export default function FormFooter({ formError, saving, editing }) {
  const { t } = useLanguage();
  const label = editing ? t.saveChanges : t.submitEntry;
  const busyLabel = editing ? t.savingChanges : t.submittingEntry;

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
        {saving ? busyLabel : label}
      </button>
    </div>
  );
}
