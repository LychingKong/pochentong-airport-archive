"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";
import { uiText } from "@/lib/translations";

import AuthField from "@/components/AuthField";
import AuthIcon from "@/components/AuthIcon";
import BackLink from "@/components/BackLink";
import { useLanguage } from "@/components/LanguageProvider";
import LanguageToggle from "@/components/LanguageToggle";
import LoginBrand from "@/components/LoginBrand";
import LoginScene from "@/components/LoginScene";
import ThemeToggle from "@/components/ThemeToggle";

// Same split-screen layout as the sign-in page: its stylesheet is shared
// rather than copied, so the two pages always match.
import styles from "../login/page.module.css";

export default function SignupPage() {
  const { language } = useLanguage();
  const t = uiText[language];
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // Display only: switch each password box between dots and plain text.
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError(t.passwordMismatch);
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        setError(t.invalidEmailOrPassword);
        setLoading(false);
        return;
      }

      router.push("/");
    } catch {
      setError(t.invalidEmailOrPassword);
      setLoading(false);
    }
  };

  // The eye button inside a password field.
  function eyeButton(shown, setShown) {
    return (
      <button
        type="button"
        className={styles.eye}
        onClick={() => setShown((value) => !value)}
        aria-label={shown ? t.hidePassword : t.showPassword}
        aria-pressed={shown}
        disabled={loading}
      >
        <AuthIcon name={shown ? "eyeOff" : "eye"} />
      </button>
    );
  }

  // Split screen: the form on the left, the airliner scene on the right
  // (on tablets and phones the scene becomes a banner above the form).
  return (
    <main className={styles.page}>
      <div className={styles.tools}>
        <LanguageToggle />
        <ThemeToggle />
      </div>

      <section className={styles.formSide}>
        <div className={styles.formInner}>
          <BackLink className={styles.back} />
          <LoginBrand />

          <h1 className={styles.title}>{t.signupWelcome}</h1>
          <p className={styles.intro}>{t.signupIntro}</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <AuthField
              id="email"
              label={t.emailLabel}
              icon="mail"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
            <AuthField
              id="password"
              label={t.passwordLabel}
              icon="lock"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              trailing={eyeButton(showPassword, setShowPassword)}
            />
            <AuthField
              id="confirmPassword"
              label={t.confirmPassword}
              icon="lock"
              type={showConfirm ? "text" : "password"}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              required
              trailing={eyeButton(showConfirm, setShowConfirm)}
            />

            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} className={styles.submit}>
              <AuthIcon name="userPlus" />
              {loading ? t.creatingAccount : t.signupButton}
            </button>
          </form>

          <p className={styles.switch}>
            {t.haveAccount}{" "}
            <a href="/login" className={styles.switchLink}>
              {t.loginButton}
            </a>
          </p>
        </div>
      </section>

      <LoginScene />
    </main>
  );
}
