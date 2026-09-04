import collection from "../collection.config.js";
import EntryCard from "../components/EntryCard";
import entries from "../data/entries.js";

const styles = {
  wrap: {
    maxWidth: 1160,
    margin: "0 auto",
    padding: "clamp(56px, 9vw, 96px) clamp(20px, 5vw, 24px) 64px",
  },
  hero: {
    maxWidth: 680,
    marginBottom: "clamp(40px, 6vw, 64px)",
  },
  kicker: {
    fontFamily: "'Courier New', monospace",
    color: "#9C6B3F",
    fontSize: 13,
    letterSpacing: 2,
    margin: 0,
  },
  title: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: "clamp(34px, 5vw, 52px)",
    fontWeight: 600,
    margin: "16px 0 14px",
    lineHeight: 1.15,
    color: "#211F1B",
  },
  description: {
    fontSize: 17,
    color: "#7C7568",
    lineHeight: 1.65,
    margin: 0,
  },
  metaRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "clamp(28px, 5vw, 56px)",
    padding: "24px 0",
    borderTop: "1px solid #E7E3DB",
    borderBottom: "1px solid #E7E3DB",
    marginBottom: "clamp(48px, 7vw, 80px)",
  },
  metaLabel: {
    fontFamily: "'Courier New', monospace",
    fontSize: 11,
    letterSpacing: 1,
    color: "#A39C8C",
    margin: "0 0 6px",
  },
  metaValue: {
    fontSize: 15,
    lineHeight: 1.5,
    margin: 0,
    color: "#3A362F",
    maxWidth: 420,
  },
  sectionHead: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: "clamp(28px, 4vw, 40px)",
  },
  sectionTitle: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 22,
    fontWeight: 600,
    margin: 0,
    color: "#211F1B",
  },
  count: {
    fontFamily: "'Courier New', monospace",
    fontSize: 13,
    color: "#9C6B3F",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "clamp(32px, 5vw, 56px)",
  },
  footer: {
    marginTop: "clamp(64px, 9vw, 96px)",
    paddingTop: 24,
    borderTop: "1px solid #E7E3DB",
    fontSize: 13,
    color: "#A39C8C",
  },
};

export default function Home() {
  return (
    <main style={styles.wrap}>
      <div style={styles.hero}>
        <p style={styles.kicker}>KHMER LIVING ARCHIVE</p>
        <h1 style={styles.title}>{collection.name}</h1>
        <p style={styles.description}>{collection.description}</p>
      </div>

      <div style={styles.metaRow}>
        <div>
          <p style={styles.metaLabel}>CURATED BY</p>
          <p style={styles.metaValue}>{collection.curator}</p>
        </div>
        <div>
          <p style={styles.metaLabel}>SOURCE</p>
          <p style={styles.metaValue}>{collection.source}</p>
        </div>
      </div>

      <div style={styles.sectionHead}>
        <h2 style={styles.sectionTitle}>The Collection</h2>
        <span style={styles.count}>
          {entries.length} {entries.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      <div style={styles.grid}>
        {entries.map((entry) => (
          <EntryCard
            key={entry.id}
            title={entry.title}
            description={entry.description}
            contributor={entry.contributor}
            date={entry.date}
            image={entry.images && entry.images[0] ? entry.images[0] : ""}
          />
        ))}
      </div>

      <footer style={styles.footer}>
        Built in ICT 340 — Vibe Coding, American University of Phnom Penh, Fall
        2026. This archive is under construction all semester. Come back in
        December.
      </footer>
    </main>
  );
}
