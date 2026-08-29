export default function EntryCard({
  title,
  description,
  contributor,
  date,
  image,
}) {
  const imgSrc = image && image.length > 0 ? image : "/placeholder-image.png";

  const styles = {
    card: {
      marginTop: 48,
      padding: 24,
      backgroundColor: "#1C222C",
      border: "1px solid #2E3644",
      borderRadius: 10,
      overflow: "hidden",
    },
    img: {
      width: "calc(100% + 48px)",
      height: "auto",
      display: "block",
      margin: "-24px -24px 20px",
    },
    title: { fontSize: 24, fontWeight: 700, margin: "0 0 8px" },
    body: {
      fontSize: 16,
      color: "#97A1B3",
      lineHeight: 1.6,
      margin: "0 0 16px",
    },
    meta: {
      display: "flex",
      gap: 24,
      fontSize: 13,
      color: "#5A6373",
    },
    label: {
      fontFamily: "'Courier New', monospace",
      fontSize: 11,
      letterSpacing: 1,
    },
  };

  return (
    <article style={styles.card}>
      <img src={imgSrc} alt="" style={styles.img} />
      <h2 style={styles.title}>{title || "Untitled entry"}</h2>
      <p style={styles.body}>{description}</p>
      <div style={styles.meta}>
        {contributor ? (
          <span>
            <span style={styles.label}>Contributed by &nbsp;</span>
            {contributor}
          </span>
        ) : null}
        {date ? (
          <span>
            <span style={styles.label}>Happens in &nbsp;</span>
            {date}
          </span>
        ) : null}
      </div>
    </article>
  );
}
