export default function EntryDetail({ entry }) {
  const paragraphs = (entry.story || entry.description || "")
    .split(/\n\n+/)
    .filter(Boolean);

  const styles = {
    title: {
      fontFamily: "Georgia, 'Times New Roman', serif",
      fontSize: "clamp(28px, 4vw, 40px)",
      fontWeight: 600,
      lineHeight: 1.15,
      margin: "0 0 14px",
      color: "#211F1B",
    },
    meta: {
      fontFamily: "'Courier New', monospace",
      fontSize: 13,
      letterSpacing: 0.5,
      color: "#A39C8C",
      margin: "0 0 20px",
    },
    tags: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      margin: "0 0 28px",
    },
    tag: {
      fontFamily: "'Courier New', monospace",
      fontSize: 11,
      letterSpacing: 1,
      textTransform: "uppercase",
      color: "#9C6B3F",
      backgroundColor: "#F5EFE4",
      border: "1px solid #E7E3DB",
      borderRadius: 999,
      padding: "6px 12px",
    },
    story: {
      fontSize: 16,
      lineHeight: 1.8,
      color: "#3A362F",
      margin: "0 0 18px",
    },
  };

  return (
    <div>
      <h1 style={styles.title}>{entry.title || "Untitled entry"}</h1>
      <p style={styles.meta}>
        {entry.contributor}
        {entry.contributor && entry.date ? "  ·  " : ""}
        {entry.date}
      </p>
      {entry.tags && entry.tags.length > 0 ? (
        <div style={styles.tags}>
          {entry.tags.map((tag) => (
            <span style={styles.tag} key={tag}>
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      {paragraphs.map((paragraph, index) => (
        <p style={styles.story} key={index}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}
