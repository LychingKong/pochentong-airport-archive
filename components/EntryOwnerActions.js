"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import DeleteConfirm from "./DeleteConfirm";
import styles from "./EntryOwnerActions.module.css";
import { useLanguage } from "./LanguageProvider";

// Only rendered by the entry page when the signed-in user owns the entry.
// The API route checks ownership again; hiding the buttons is not the security.
export default function EntryOwnerActions({ id }) {
  const { t } = useLanguage();
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setDeleting(true);
    setError("");
    try {
      const response = await fetch(`/api/entries/${id}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) {
        console.error("Entry delete not saved:", id, result);
        setError(t.submitErrors[result.error] || t.submitErrors.notSaved);
        setDeleting(false);
        return;
      }
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Entry delete failed:", id, err);
      setError(t.submitErrors.network);
      setDeleting(false);
    }
  }

  const deleteClass = `${styles.button} ${styles.danger}`;

  return (
    <div className={styles.bar}>
      {confirming ? (
        <DeleteConfirm
          onConfirm={handleDelete}
          onCancel={() => setConfirming(false)}
          deleting={deleting}
        />
      ) : (
        <>
          <Link href={`/entries/${id}/edit`} className={styles.button}>
            {t.editEntry}
          </Link>
          <button
            type="button"
            className={deleteClass}
            onClick={() => setConfirming(true)}
          >
            {t.deleteEntry}
          </button>
        </>
      )}
      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
