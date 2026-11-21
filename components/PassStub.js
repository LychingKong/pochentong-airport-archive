"use client";

import styles from "./ContributeForm.module.css";
import FormFooter from "./FormFooter";
import FormSection from "./FormSection";
import ImageField from "./ImageField";

// The stub of the boarding-pass form, past the tear line: the photo slot,
// then the submit area, which stay in view while the fields scroll on wide
// screens.
export default function PassStub({ form, entry }) {
  const editing = Boolean(entry);

  return (
    <div className={styles.stub}>
      <div className={styles.stubInner}>
        <FormSection id="images" number="06" required={!editing}>
          <ImageField
            currentUrl={entry?.cover}
            file={form.image}
            onChange={form.changeImage}
            error={form.errors.images}
            disabled={form.saving}
          />
        </FormSection>
        <FormFooter
          formError={form.formError}
          saving={form.saving}
          editing={editing}
          changed={form.changed}
          onClear={form.clearForm}
        />
      </div>
    </div>
  );
}
