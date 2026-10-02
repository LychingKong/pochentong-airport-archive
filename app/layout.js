import collection from "../collection.config.js";
import LanguageProvider from "../components/LanguageProvider";

import "./theme.css";

export const metadata = {
  title: `${collection.name} — Khmer Living Archive`,
  description: collection.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
