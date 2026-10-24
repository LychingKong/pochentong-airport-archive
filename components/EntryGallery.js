// Shows one photo: the first image in the list. Entries now keep a single
// storage URL, so there is no thumbnail grid.
export default function EntryGallery({ images, title }) {
  const list =
    images && images.length > 0 ? images : ["/placeholder-image.png"];
  const [hero] = list;

  const styles = {
    hero: {
      position: "relative",
      width: "100%",
      aspectRatio: "16 / 9",
      borderRadius: 12,
      border: "1px solid var(--color-line)",
      overflow: "hidden",
      backgroundColor: "var(--color-subtle)",
    },
    heroImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    },
  };

  return (
    <div style={styles.hero}>
      <img
        src={hero}
        alt={title || "Archive entry image"}
        fetchPriority="high"
        decoding="async"
        style={styles.heroImg}
      />
    </div>
  );
}
