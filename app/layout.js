import { Baloo_2, Kantumruy_Pro, Poppins, Schoolbell } from "next/font/google";
import Script from "next/script";

import collection from "../collection.config.js";
import LanguageProvider from "../components/LanguageProvider";
import PageTransition from "../components/PageTransition";
import ScrollReveal from "../components/ScrollReveal";
import WelcomeScreen from "../components/WelcomeScreen";

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
  weight: ["400", "600", "700"],
  variable: "--font-khmer",
  display: "swap",
});

// Runs before the page is shown, so a saved dark/light choice applies
// without a flash of the other theme. Must match THEME_KEY in lib/themeTransition.js.
const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const schoolbell = Schoolbell({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-subtitle",
  display: "swap",
});

// Also marks a visitor who already passed the welcome screen this session,
// so it stays hidden from the first paint (key must match WELCOME_KEY in
// lib/useWelcomeFlow.js).
// Last, it switches on the scroll reveal (theme.css, ScrollReveal.js) before
// the first paint, so revealed blocks don't flash in and then vanish. If the
// reveal hasn't started 4 seconds later, it switches it off again so
// nothing stays hidden.
const applySavedTheme = `
try {
  var saved = localStorage.getItem("pochentong-theme");
  if (saved === "light" || saved === "dark") {
    document.documentElement.dataset.theme = saved;
  }
} catch (e) {}
try {
  if (sessionStorage.getItem("pochentong-welcome-seen") === "1") {
    document.documentElement.dataset.welcomeSeen = "1";
  }
} catch (e) {}
document.documentElement.dataset.scrollReveal = "on";
setTimeout(function () {
  if (document.documentElement.dataset.scrollReveal !== "ready") {
    delete document.documentElement.dataset.scrollReveal;
  }
}, 4000);
`;

export default function RootLayout({ children }) {
  return (
    // The script above may add data-theme before React loads; that's expected.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${schoolbell.variable} ${poppins.variable} ${baloo.variable} ${kantumruy.variable}`}
    >
      <body
        suppressHydrationWarning
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
        {/* Without JavaScript the welcome screen could never be dismissed,
            so it is hidden outright. */}
        <noscript>
          <style>{"[data-welcome-overlay]{display:none!important}"}</style>
        </noscript>
        <LanguageProvider>
          {children}
          <ScrollReveal />
          <PageTransition />
          <WelcomeScreen />
        </LanguageProvider>
      </body>
    </html>
  );
}
