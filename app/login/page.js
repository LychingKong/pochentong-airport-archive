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

import styles from "./page.module.css";

export default function LoginPage() {
  const { language } = useLanguage();
  const t = uiText[language];
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // Display only: switches the password box between dots and plain text.
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
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

  const passwordToggle = (
    <button
      type="button"
      className={styles.eye}
      onClick={() => setShowPassword((shown) => !shown)}
      aria-label={showPassword ? t.hidePassword : t.showPassword}
      aria-pressed={showPassword}
      disabled={loading}
    >
      <AuthIcon name={showPassword ? "eyeOff" : "eye"} />
    </button>
  );

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

          <h1 className={styles.title}>{t.loginWelcome}</h1>
          <p className={styles.intro}>{t.loginIntro}</p>

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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              trailing={passwordToggle}
            />

            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} className={styles.submit}>
              <AuthIcon name="signIn" />
              {loading ? t.signingIn : t.loginButton}
            </button>
          </form>

          <p className={styles.switch}>
            {t.noAccount}{" "}
            <a href="/signup" className={styles.switchLink}>
              {t.signupButton}
            </a>
          </p>
        </div>
      </section>

      <LoginScene />
    </main>
  );
}
