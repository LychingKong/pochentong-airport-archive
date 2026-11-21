import { useState } from "react";
import { useRouter } from "next/navigation";

import { checkImageFile, TEXT_FIELDS, validateEntry } from "./entryValidation";

// All the state and submit logic for the contribute and edit forms, kept out
// of the component so ContributeForm.js only describes the layout.
// Pass an existing entry to edit it; leave it out to create a new one.
export function useContributeForm(entry) {
  const router = useRouter();
  // The starting text: the entry's when editing, otherwise empty.
  const startValues = () =>
    Object.fromEntries(TEXT_FIELDS.map((name) => [name, entry?.[name] ?? ""]));
  const [values, setValues] = useState(startValues);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function showErrors(fieldErrors, code) {
    setErrors(fieldErrors);
    setFormError(code);
    setSaving(false);
    const first = ["images", ...TEXT_FIELDS].find((name) => fieldErrors[name]);
    // Wait for the re-render that re-enables the inputs; disabled ones can't take focus.
    if (first) setTimeout(() => document.getElementById(first)?.focus(), 0);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setFormError("");
    const { values: clean, errors: fieldErrors } = validateEntry(values);
    // When editing, no new photo means "keep the current one".
    if (!entry || image) {
      const imageCheck = await checkImageFile(image);
      if (imageCheck.error) fieldErrors.images = imageCheck.error;
    }
    if (Object.keys(fieldErrors).length > 0)
      return showErrors(fieldErrors, "invalid");

    try {
      const body = new FormData();
      for (const name of TEXT_FIELDS) body.append(name, clean[name] ?? "");
      if (image) body.append("images", image);
      const response = await fetch(
        entry ? `/api/entries/${entry.id}` : "/api/entries",
        { method: entry ? "PATCH" : "POST", body },
      );
      const result = await response.json();
      if (!response.ok) {
        if (result.error === "notSaved")
          console.error("Entry update not saved:", entry?.id, result);
        return showErrors(result.fields || {}, result.error);
      }
      // A new entry waits for review, so show the message instead of the entry.
      if (entry) {
        router.push(`/entries/${result.id}`);
        router.refresh();
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Entry submission failed:", err);
      showErrors({}, "network");
    }
  }

  // Editing a field clears its old error message.
  const clearError = (name) =>
    setErrors((prev) => ({ ...prev, [name]: undefined }));

  function updateField(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  }

  function changeImage(file) {
    setImage(file);
    clearError("images");
  }

  // "Clear form" / "Reset changes": back to the starting text, no new
  // photo, no messages. The file input is emptied too, so the same photo
  // can be chosen again. Nothing is sent to the server.
  function clearForm() {
    setValues(startValues());
    setImage(null);
    setErrors({});
    setFormError("");
    const input = document.getElementById("images");
    if (input) input.value = "";
  }

  // "Contribute Again" on the success screen: an empty form, ready for
  // another memory.
  // `saving` is still on from the last save (it is only turned off on a
  // failure), so it is reset here too.
  function startOver() {
    clearForm();
    setSaving(false);
    setSubmitted(false);
  }

  // True once anything differs from the starting text, or a photo is chosen.
  const start = startValues();
  const changed =
    Boolean(image) || TEXT_FIELDS.some((name) => values[name] !== start[name]);

  return {
    values,
    image,
    errors,
    formError,
    saving,
    submitted,
    changed,
    updateField,
    changeImage,
    clearForm,
    startOver,
    handleSubmit,
  };
}
