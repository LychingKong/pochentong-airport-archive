"use client";

import { useContributeForm } from "../lib/useContributeForm";
import styles from "./ContributeForm.module.css";
import ContributeHero from "./ContributeHero";
import ContributeSuccess from "./ContributeSuccess";
import FormField from "./FormField";
import FormSection from "./FormSection";
import PassBand from "./PassBand";
import PassStub from "./PassStub";
import SubmitTakeoff from "./SubmitTakeoff";

// The contribute/edit form as a boarding pass: a navy band on top, the
// text fields in the main part (English and Khmer side by side; the story
// in tall boxes), and past the dashed tear line a stub with the photo and
// the submit button.
const SECTIONS = [
  { id: "title", required: true },
  { id: "description", required: true, rows: 3 },
  { id: "story", required: true, rows: 9 },
  { id: "tags" },
  { id: "contributor" },
];

// Pass `entry` to edit an existing entry; leave it out on /contribute.
export default function ContributeForm({ entry }) {
  const form = useContributeForm(entry);

  // Only after the server confirmed a new entry was saved: the takeoff
  // plays once over the confirmation, then fades away.
  if (form.submitted) {
    return (
      <>
        <ContributeSuccess onContributeAgain={form.startOver} />
        <SubmitTakeoff />
      </>
    );
  }

  return (
    <form onSubmit={form.handleSubmit} noValidate className={styles.form}>
      <ContributeHero editing={Boolean(entry)} />
      <div className={styles.pass} data-reveal>
        <PassBand />
        <div className={styles.passBody}>
          <div className={styles.passMain}>
            {SECTIONS.map(({ id, required, rows }, index) => (
              <FormSection
                key={id}
                id={id}
                number={`0${index + 1}`}
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
          </div>
          <PassStub form={form} entry={entry} />
        </div>
      </div>
    </form>
  );
}
