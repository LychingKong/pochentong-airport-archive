import styles from "./MyEntriesArt.module.css";

// One memory photo in the /my-entries header drawing: a white print held
// by a strip of tape, with a small scene inside. Decorative only.
const SCENES = {
  // the old terminal with its long roof and windows
  terminal: (
    <>
      <path d="M14 52L92 48V54L14 58Z" className={styles.ink} />
      <path d="M18 58H88V70H18Z" className={styles.soft} />
      <path
        d="M24 62H30M36 62H42M48 62H54M60 62H66M72 62H78"
        className={styles.line}
      />
    </>
  ),
  // the control tower beside a cloud
  tower: (
    <>
      <path
        d="M22 40C22 34 30 32 34 36C36 30 46 30 48 36C54 35 56 40 52 42H24Z"
        className={styles.cloud}
      />
      <path d="M62 30H82L84 38H60Z" className={styles.ink} />
      <path d="M66 38H78V70H66Z" className={styles.soft} />
    </>
  ),
  // a plane over the hills at sunset
  sky: (
    <>
      <circle cx="74" cy="26" r="8" className={styles.sun} />
      <path d="M8 62L36 42L56 56L74 46L104 62V70H8Z" className={styles.soft} />
      <path d="M30 30l12-4-3 6zM32 28l14 2" className={styles.line} />
    </>
  ),
};

export default function MyEntriesArtPhoto({ scene, transform, float }) {
  return (
    <g transform={transform}>
      <g className={styles[float]}>
        <rect width="112" height="96" rx="6" className={styles.card} />
        <rect
          x="8"
          y="8"
          width="96"
          height="62"
          rx="3"
          className={styles.pic}
        />
        {SCENES[scene]}
        <path d="M16 82H62" className={styles.rule} />
        <rect
          x="38"
          y="-7"
          width="36"
          height="13"
          rx="2"
          className={styles.tape}
        />
      </g>
    </g>
  );
}
