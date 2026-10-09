"use client";

import { useContributeForm } from "../lib/useContributeForm";
import styles from "./ContributeForm.module.css";
import FormField from "./FormField";
import FormFooter from "./FormFooter";
import FormSection from "./FormSection";
import ImageField from "./ImageField";
import { useLanguage } from "./LanguageProvider";

const SECTIONS = [
  { id: "title", required: true },
  { id: "description", required: true, rows: 3 },
  { id: "story", required: true, rows: 10 },
  { id: "tags" },
  { id: "contributor" },
];

// Pass `entry` to edit an existing entry; leave it out on /contribute.
export default function ContributeForm({ entry }) {
  const { t } = useLanguage();
  const form = useContributeForm(entry);
  const editing = Boolean(entry);

  return (
    <form onSubmit={form.handleSubmit} noValidate className={styles.form}>
      <header className={styles.pageHead}>
        <p className={`subtitle ${styles.kicker}`}>
          {editing ? t.editKicker : t.contributeKicker}
        </p>
        <h1 className={styles.title}>
          {editing ? t.editTitle : t.contributeTitle}
        </h1>
        <p className={styles.intro}>
          {editing ? t.editIntro : t.contributeIntro}
        </p>
      </header>

      <FormSection id="images" number="01" required={!editing}>
        <ImageField
          currentUrl={entry?.cover}
          file={form.image}
          onChange={form.changeImage}
          error={form.errors.images}
          disabled={form.saving}
        />
      </FormSection>

      {SECTIONS.map(({ id, required, rows }, index) => (
        <FormSection
          key={id}
          id={id}
          number={`0${index + 2}`}
          required={required}
        >
          {[id, `${id}_km`].map((name) => (
            <FormField
              key={name}
              name={name}
              section={id}
              value={form.values[name]}
              onChange={form.updateField}
              error={form.errors[name]}
              rows={rows}
              disabled={form.saving}
            />
          ))}
        </FormSection>
      ))}

      <FormFooter
        formError={form.formError}
        saving={form.saving}
        editing={editing}
      />
    </form>
  );
}
