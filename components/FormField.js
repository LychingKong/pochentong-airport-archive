"use client";

import { fieldUsage } from "../lib/entryValidation";
import { formatFieldError } from "../lib/translations";
import styles from "./ContributeForm.module.css";
import { useLanguage } from "./LanguageProvider";

export default function FormField({
  name,
  section,
  value,
  onChange,
  error,
  rows,
  disabled,
}) {
  const { t } = useLanguage();
  const isKhmer = name.endsWith("_km");
  const { used, max, unit } = fieldUsage(name, value);
  const errorId = `${name}-error`;

  const inputProps = {
    id: name,
    name,
    value,
    onChange: (e) => onChange(name, e.target.value),
    className: styles.input,
    lang: isKhmer ? "km" : "en",
    disabled,
    // Screen readers hear the section title plus the language, e.g. "Title, Khmer".
    "aria-labelledby": `${section}-heading ${name}-label`,
    "aria-describedby": error
      ? `${section}-hint ${errorId}`
      : `${section}-hint`,
    "aria-invalid": error ? "true" : "false",
  };

  return (
    <div className={styles.field}>
      <div className={styles.fieldTop}>
        <label id={`${name}-label`} htmlFor={name} className={styles.label}>
          {isKhmer ? t.langKhmer : t.langEnglish}
        </label>
        <span
          className={used > max ? styles.counterOver : styles.counter}
          aria-hidden="true"
        >
          {used.toLocaleString("en")} / {max.toLocaleString("en")}{" "}
          {t.counterUnits[unit]}
        </span>
      </div>
      {rows ? (
        <textarea {...inputProps} rows={rows} />
      ) : (
        <input {...inputProps} type="text" />
      )}
      {error ? (
        <p id={errorId} className={styles.error}>
          {formatFieldError(t, error)}
        </p>
      ) : null}
    </div>
  );
}
