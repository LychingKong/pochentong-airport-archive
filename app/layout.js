import { Kantumruy_Pro } from "next/font/google";
import Script from "next/script";

import collection from "../collection.config.js";
import LanguageProvider from "../components/LanguageProvider";

import "./theme.css";

// The favicon (icon.png, apple-icon.png) and share image
// (opengraph-image.jpg) are files in app/ that Next.js picks up by name.
export const metadata = {
  title: `${collection.name} — Khmer Living Archive`,
  description: collection.description,
  openGraph: {
    type: "website",
    siteName: collection.name,
    title: `${collection.name} — Khmer Living Archive`,
    description: collection.description,
  },
  twitter: { card: "summary_large_image" },
};

const kantumruy = Kantumruy_Pro({
  subsets: ["khmer", "latin"],
  weight: ["400", "600"],
  variable: "--font-khmer",
  display: "swap",
});

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
    <html lang="en" suppressHydrationWarning className={kantumruy.variable}>
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
