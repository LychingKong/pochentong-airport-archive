import styles from "./NoResults.module.css";

// Two old, slightly tilted photos in the "no results" picture; the front
// one shows the terminal and control tower in sepia. SVG parts only.
export default function NoResultsPhotos() {
  return (
    <>
      <rect
        className={styles.photo}
        x="300"
        y="242"
        width="130"
        height="100"
        rx="6"
        transform="rotate(-8 365 292)"
      />
      <g transform="rotate(5 372 301)">
        <rect
          className={styles.photo}
          x="306"
          y="250"
          width="132"
          height="102"
          rx="6"
        />
        <rect
          className={styles.sepia}
          x="316"
          y="260"
          width="112"
          height="72"
          rx="3"
        />
        <path
          className={styles.sepiaInk}
          d="M326 318H418V326H326ZM336 306H408V318H336ZM366 284H374V306H366ZM360 276H380V286H360Z"
        />
      </g>
    </>
  );
}
