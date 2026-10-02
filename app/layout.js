import Script from "next/script";

import collection from "../collection.config.js";
import LanguageProvider from "../components/LanguageProvider";

import "./theme.css";

export const metadata = {
  title: `${collection.name} — Khmer Living Archive`,
  description: collection.description,
};

// Runs before the page is shown, so a saved dark/light choice applies
// without a flash of the other theme. Must match THEME_KEY in lib/themeTransition.js.
const applySavedTheme = `
try {
  var saved = localStorage.getItem("pochentong-theme");
  if (saved === "light" || saved === "dark") {
    document.documentElement.dataset.theme = saved;
  }
} catch (e) {}
`;

export default function RootLayout({ children }) {
  return (
    // The script above may add data-theme before React loads; that's expected.
    <html lang="en" suppressHydrationWarning>
      <body
        style={{
          margin: 0,
          backgroundColor: "var(--color-bg)",
          color: "var(--color-text)",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          minHeight: "100vh",
        }}
      >
        <Script id="apply-saved-theme" strategy="beforeInteractive">
          {applySavedTheme}
        </Script>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
