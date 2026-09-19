"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";
import { uiText } from "@/lib/translations";

import { useLanguage } from "@/components/LanguageProvider";

const styles = {
  wrap: {
    maxWidth: 1160,
    margin: "0 auto",
    padding: "clamp(56px, 9vw, 96px) clamp(20px, 5vw, 24px) 64px",
  },
  formContainer: {
    maxWidth: 400,
    margin: "0 auto",
  },
  kicker: {
    fontFamily: "'Courier New', monospace",
    color: "#9C6B3F",
    fontSize: 13,
    letterSpacing: 2,
    margin: "0 0 24px",
    textTransform: "uppercase",
  },
  title: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: "clamp(28px, 4vw, 40px)",
    fontWeight: 600,
    margin: "0 0 32px",
    lineHeight: 1.15,
    color: "#211F1B",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  label: {
    fontFamily: "'Courier New', monospace",
    fontSize: 11,
    letterSpacing: 1,
    color: "#A39C8C",
    margin: 0,
    textTransform: "uppercase",
  },
  input: {
    fontFamily: "inherit",
    fontSize: 16,
    padding: "12px 16px",
    border: "1px solid #E7E3DB",
    borderRadius: 0,
    color: "#3A362F",
    backgroundColor: "#FFF",
  },
  button: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 15,
    fontWeight: 600,
    padding: "14px 24px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#9C6B3F",
    backgroundColor: "#9C6B3F",
    color: "#FFF",
    cursor: "pointer",
    marginTop: 8,
  },
  buttonHover: {
    backgroundColor: "#8B5A2F",
    borderColor: "#8B5A2F",
  },
  error: {
    fontSize: 14,
    color: "#C84C2C",
    margin: 0,
    fontFamily: "inherit",
  },
  link: {
    fontSize: 14,
    color: "#9C6B3F",
    textDecoration: "none",
    marginTop: 16,
  },
  linkHover: {
    textDecoration: "underline",
  },
};

export default function SignupPage() {
  const { language } = useLanguage();
  const t = uiText[language];
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

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

  return (
    <main style={styles.wrap}>
      <div style={styles.formContainer}>
        <p style={styles.kicker}>{t.kicker}</p>
        <h1 style={styles.title}>{t.signup}</h1>

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.fieldGroup}>
            <label htmlFor="email" style={styles.label}>
              {t.emailLabel}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              disabled={loading}
              required
            />
          </div>

          <div style={styles.fieldGroup}>
            <label htmlFor="password" style={styles.label}>
              {t.passwordLabel}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              disabled={loading}
              required
            />
          </div>

          <div style={styles.fieldGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>
              {t.confirmPassword}
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
              disabled={loading}
              required
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...(buttonHovered ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
          >
            {loading ? "Creating account..." : t.signupButton}
          </button>
        </form>

        <a
          href="/login"
          style={{
            ...styles.link,
            ...(linkHovered ? styles.linkHover : {}),
          }}
          onMouseEnter={() => setLinkHovered(true)}
          onMouseLeave={() => setLinkHovered(false)}
        >
          {t.login}
        </a>
      </div>
    </main>
  );
}
