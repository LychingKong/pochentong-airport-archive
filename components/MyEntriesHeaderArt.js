import styles from "./MyEntries.module.css";

// The faint warm drawing on the right of the /my-entries heading: clouds,
// the old terminal with rows of window panes, the control tower with its
// glazed cab, and a plane climbing away on a dashed trail. One tan color
// at different strengths; it fades out toward the title (see .headArt in
// the CSS). Decorative only. The pattern id is fixed: one per page.
const CLOUD =
  "M28 46C14 46 6 39 6 31C6 22 14 17 23 18C26 9 34 4 45 4C57 4 65 11 68 20C72 16 78 14 85 15C97 17 104 25 104 33C112 34 116 39 116 42C116 45 113 46 108 46Z";
const PLANE =
  "M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z";

export default function MyEntriesHeaderArt() {
  return (
    <svg className={styles.headArt} viewBox="0 0 560 200" aria-hidden="true">
      <defs>
        <pattern
          id="my-entries-panes"
          width="18"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <rect
            x="2"
            y="2"
            width="14"
            height="11"
            rx="2"
            className={styles.artPane}
          />
        </pattern>
      </defs>

      {["translate(30 92) scale(1.4)", "translate(372 64) scale(1.6)"].map(
        (place) => (
          <path
            key={place}
            d={CLOUD}
            transform={place}
            className={styles.artCloud}
          />
        ),
      )}

      {/* dashed trail and the plane climbing away */}
      <path d="M190 92Q280 70 338 44" className={styles.artTrail} />
      <path
        d={PLANE}
        transform="translate(332 18) rotate(66 12 12) scale(2)"
        className={styles.artPlane}
      />

      {/* terminal: roof, wall, two rows of window panes */}
      <path d="M146 116L468 106V116L146 126Z" className={styles.artRoof} />
      <path d="M156 126L460 116V194H156Z" className={styles.artWall} />
      <rect
        x="170"
        y="134"
        width="276"
        height="52"
        fill="url(#my-entries-panes)"
      />

      {/* control tower: antenna, cap, glazed cab, shaft */}
      <path d="M488 30V46" className={styles.artLine} />
      <path d="M472 46H504L508 58H468Z" className={styles.artRoof} />
      <path d="M466 58H510V76H466Z" className={styles.artCab} />
      <path d="M477 58V76M488 58V76M499 58V76" className={styles.artCabBars} />
      <path d="M476 76H500V194H476Z" className={styles.artWall} />

      <path d="M120 194H540" className={styles.artGround} />
    </svg>
  );
}
