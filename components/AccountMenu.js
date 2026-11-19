"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./AccountMenu.module.css";
import { useLanguage } from "./LanguageProvider";

// Signed-in visitors see a round button with their email's first letter.
// It opens a small menu with the full email and Log Out, and closes on a
// click outside or the Escape key. `onLogout` is Header's handleLogout.
export default function AccountMenu({ email, onLogout }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function closeOnOutsideClick(event) {
      if (!wrapRef.current.contains(event.target)) setOpen(false);
    }
    function closeOnEscape(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        type="button"
        className={styles.avatar}
        aria-label={email}
        aria-expanded={open}
        aria-controls="account-menu"
        title={email}
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        {email.charAt(0).toUpperCase()}
      </button>
      {open ? (
        <div id="account-menu" className={styles.menu}>
          <p className={styles.email}>{email}</p>
          <button type="button" className={styles.logout} onClick={onLogout}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l-5-5 5-5M5 12h11" />
            </svg>
            {t.logOut}
          </button>
        </div>
      ) : null}
    </div>
  );
}
