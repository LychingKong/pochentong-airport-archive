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

  const styles = {
    card: {
      display: "flex",
      flexDirection: "column",
      textDecoration: "none",
      color: "inherit",
    },
    collage: {
      position: "relative",
      aspectRatio: "4 / 3",
      marginBottom: "clamp(20px, 3vw, 28px)",
    },
    echoBack: {
      position: "absolute",
      inset: 0,
      backgroundImage: `url(${imgSrc})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: 10,
      border: "1px solid var(--color-line)",
    },
    echoMid: {
      position: "absolute",
      inset: 0,
      backgroundImage: `url(${imgSrc})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: 10,
      border: "1px solid var(--color-line)",
    },
    mainImg: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: 10,
      border: "1px solid var(--color-line)",
    },
    title: {
      fontFamily: "Georgia, 'Times New Roman', serif",
      fontSize: "clamp(19px, 2vw, 22px)",
      fontWeight: 600,
      margin: "0 0 8px",
      color: "var(--color-text)",
    },
    body: {
      fontSize: 14.5,
      color: "var(--color-muted)",
      lineHeight: 1.6,
      margin: "0 0 14px",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    },
    meta: {
      fontFamily: "'Courier New', monospace",
      fontSize: 12,
      letterSpacing: 0.5,
      color: "var(--color-faint)",
    },
  };

  return (
    <Link href={`/entries/${id}`} style={styles.card}>
      <div style={styles.collage} className={motion.collage}>
        <div
          style={styles.echoBack}
          className={motion.echoBack}
          aria-hidden="true"
        />
        <div
          style={styles.echoMid}
          className={motion.echoMid}
          aria-hidden="true"
        />
        <img
          src={imgSrc}
          alt=""
          loading="lazy"
          decoding="async"
          style={styles.mainImg}
          className={motion.mainImg}
        />
      </div>
      <h2 style={styles.title}>{title || untitledLabel}</h2>
      {description ? <p style={styles.body}>{description}</p> : null}
      <p style={styles.meta}>
        {contributor}
        {contributor && date ? "  ·  " : ""}
        {date}
      </p>
    </Link>
  );
}
