"use client";

import LanguageToggle from "./LanguageToggle";
import styles from "./WelcomeScreen.module.css";
import WelcomeSoundToggle from "./WelcomeSoundToggle";
import WelcomeTimeSwitch from "./WelcomeTimeSwitch";

// The welcome screen's top-right corner: the EN / ខ្មែរ switch, the
// Morning / Sunset / Night switch, and the sound button.
export default function WelcomeCorner({ time, onTime, soundOn, onSound }) {
  return (
    <div className={styles.corner}>
      <LanguageToggle className={styles.lang} />
      <WelcomeTimeSwitch time={time} onChange={onTime} />
      <WelcomeSoundToggle on={soundOn} onToggle={onSound} />
    </div>
  );
}
