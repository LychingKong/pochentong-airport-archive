"use client";

export default function SearchInput({ value, onChange, placeholder }) {
  const styles = {
    wrap: {
      position: "relative",
      maxWidth: 440,
      marginBottom: "clamp(40px, 6vw, 56px)",
    },
    input: {
      width: "100%",
      boxSizing: "border-box",
      padding: "13px 40px 13px 16px",
      fontSize: 15,
      fontFamily: "inherit",
      color: "#211F1B",
      backgroundColor: "#FFFFFF",
      border: "1px solid #E7E3DB",
      borderRadius: 10,
      outline: "none",
    },
    clear: {
      position: "absolute",
      right: 8,
      top: "50%",
      transform: "translateY(-50%)",
      border: "none",
      background: "none",
      color: "#A39C8C",
      fontSize: 20,
      lineHeight: 1,
      cursor: "pointer",
      padding: 6,
    },
  };

  return (
    <div style={styles.wrap}>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        style={styles.input}
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          style={styles.clear}
          aria-label="Clear search"
        >
          ×
        </button>
      ) : null}
    </div>
  );
}
