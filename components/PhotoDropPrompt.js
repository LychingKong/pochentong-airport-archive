"use client";

import styles from "./ContributeForm.module.css";
import { useLanguage } from "./LanguageProvider";
import UploadIcon from "./UploadIcon";

// What the empty photo slot shows: an upload icon, "Choose a photo"
// ("Drop your photo here" while a file is dragged over), a Browse files
// button and the accepted formats. The whole slot is
// the file input, so the button is only a visual cue.
export default function PhotoDropPrompt({ dragging }) {
  const { t } = useLanguage();
  const copy = t.contributePass;

  return (
    <div className={styles.dropPrompt}>
      <span className={styles.dropIconWrap}>
        <UploadIcon className={styles.dropIcon} />
      </span>
      <span className={styles.dropTitle}>
        {dragging ? copy.dropNow : t.dropTitle}
      </span>
      {dragging ? null : (
        <>
          <span className={styles.browse} aria-hidden="true">
            {copy.browse}
          </span>
          <span className={styles.formats}>{copy.formats}</span>
        </>
      )}
    </div>
  );
}
