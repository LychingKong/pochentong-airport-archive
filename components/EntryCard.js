import Link from "next/link";

import motion from "./EntryCard.module.css";

export default function EntryCard({
  id,
  title,
  description,
  contributor,
  date,
  image,
  untitledLabel = "Untitled entry",
}) {
  const imgSrc = image && image.length > 0 ? image : "/placeholder-image.png";

  // The two "echo" layers behind the photo share this background.
  const echo = {
    position: "absolute",
    inset: 0,
    backgroundImage: `url(${imgSrc})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--color-line)",
  };

  const styles = {
    collage: {
      position: "relative",
      aspectRatio: "4 / 3",
      marginBottom: "clamp(20px, 3vw, 26px)",
    },
    mainImg: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "var(--radius-md)",
      border: "1px solid var(--color-line)",
      backgroundColor: "var(--color-subtle)",
    },
  };

  return (
    <Link href={`/entries/${id}`} className={motion.card} data-reveal>
      <div style={styles.collage} className={motion.collage}>
        <div style={echo} className={motion.echoBack} aria-hidden="true" />
        <div style={echo} className={motion.echoMid} aria-hidden="true" />
        <img
          src={imgSrc}
          alt=""
          loading="lazy"
          decoding="async"
          style={styles.mainImg}
          className={motion.mainImg}
        />
      </div>
      <h2 className={motion.title}>{title || untitledLabel}</h2>
      {description ? <p className={motion.body}>{description}</p> : null}
      <p className={motion.meta}>
        {contributor ? (
          <span className={motion.contributor}>{contributor}</span>
        ) : null}
        {contributor && date ? <span aria-hidden="true"> · </span> : null}
        {date}
      </p>
    </Link>
  );
}
