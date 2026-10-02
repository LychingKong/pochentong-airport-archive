import { useState } from "react";
import { useRouter } from "next/navigation";

import { checkImageFile, TEXT_FIELDS, validateEntry } from "./entryValidation";

// All the state and submit logic for the contribute and edit forms, kept out
// of the component so ContributeForm.js only describes the layout.
// Pass an existing entry to edit it; leave it out to create a new one.
export function useContributeForm(entry) {
  const router = useRouter();
  const [values, setValues] = useState(() =>
    Object.fromEntries(TEXT_FIELDS.map((name) => [name, entry?.[name] ?? ""])),
  );
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

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
      router.push(`/entries/${result.id}`);
      router.refresh();
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

  return {
    values,
    image,
    errors,
    formError,
    saving,
    updateField,
    changeImage,
    handleSubmit,
  };
}
