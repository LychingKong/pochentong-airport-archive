"use client";

import { primeTakeoffSound } from "../lib/takeoffSound";
import { isSoundOn } from "../lib/useSoundPreference";
import AuthIcon from "./AuthIcon";
import styles from "./ContributeForm.module.css";
import { useLanguage } from "./LanguageProvider";

// The submit area at the bottom of the boarding pass's stub: the
// form-level error (after a failed submit), the orange submit button
// (disabled with a spinner while saving), "Clear form" ("Reset changes"
// when editing; greyed out until something changes, and it asks first),
// and the required-fields note.
export default function FormFooter({
  formError,
  saving,
  editing,
  changed,
  onClear,
}) {
  const { t } = useLanguage();
  const copy = t.contributePass;
  const label = editing ? t.saveChanges : copy.submit;
  const busyLabel = editing ? t.savingChanges : copy.submitting;

  function handleClear() {
    const question = editing ? copy.resetConfirm : copy.clearConfirm;
    if (window.confirm(question)) onClear();
  }

  return (
    <div className={styles.footer}>
      {formError ? (
        <p className={styles.formError} role="alert">
          {t.submitErrors[formError] || t.submitErrors.saveFailed}
        </p>
      ) : null}
      <button
        type="submit"
        className={styles.submit}
        disabled={saving}
        aria-busy={saving}
        // Unlock the takeoff sound inside this click; it plays once the
        // new entry is saved (SubmitTakeoff).
        onClick={() => {
          if (!editing && isSoundOn()) primeTakeoffSound();
        }}
      >
        {saving ? (
          <span className={styles.spinner} aria-hidden="true" />
        ) : (
          <AuthIcon name="send" className={styles.submitIcon} />
        )}
        {saving ? busyLabel : label}
      </button>
      <button
        type="button"
        className={styles.cancel}
        onClick={handleClear}
        disabled={saving || !changed}
      >
        <AuthIcon name="undo" className={styles.clearIcon} />
        {editing ? copy.reset : copy.clear}
      </button>
      <p className={styles.note}>{t.requiredNote}</p>
    </div>
  );
}
