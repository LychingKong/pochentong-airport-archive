export default function EntryGallery({ images, title }) {
  const list =
    images && images.length > 0 ? images : ["/placeholder-image.png"];
  const [hero, ...rest] = list;

  const styles = {
    hero: {
      position: "relative",
      width: "100%",
      aspectRatio: "16 / 9",
      marginBottom: rest.length > 0 ? "clamp(16px, 2.5vw, 24px)" : 0,
      borderRadius: 12,
      border: "1px solid #E7E3DB",
      overflow: "hidden",
      backgroundColor: "#F1EEE6",
    },
    heroImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
      gap: "clamp(10px, 1.5vw, 16px)",
    },
    thumb: {
      position: "relative",
      aspectRatio: "4 / 3",
      borderRadius: 8,
      border: "1px solid #E7E3DB",
      overflow: "hidden",
      backgroundColor: "#F1EEE6",
    },
    thumbImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    },
  };

  return (
    <div>
      <div style={styles.hero}>
        <img
          src={hero}
          alt={title || "Archive entry image"}
          style={styles.heroImg}
        />
      </div>
      {rest.length > 0 ? (
        <div style={styles.grid}>
          {rest.map((src, index) => (
            <div style={styles.thumb} key={src + index}>
              <img
                src={src}
                alt={`${title || "Archive entry"} — image ${index + 2}`}
                style={styles.thumbImg}
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
