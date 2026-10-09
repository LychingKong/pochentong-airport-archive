// Draws the title letters once and returns them as an image (PNG data URL).
// Used as a CSS mask: the video shows only where the letters are.
// Units: the font is 100 per line; each unit becomes PIXELS_PER_UNIT pixels.
const PIXELS_PER_UNIT = 3;

export function drawTitleMask({
  lines,
  layout,
  fontFamily,
  weight,
  letterSpacing,
}) {
  const { width, height, baselines, stretch } = layout;
  const canvas = document.createElement("canvas");
  canvas.width = width * PIXELS_PER_UNIT;
  canvas.height = height * PIXELS_PER_UNIT;

  const ctx = canvas.getContext("2d");
  ctx.scale(PIXELS_PER_UNIT, PIXELS_PER_UNIT);
  ctx.font = `${weight} 100px ${fontFamily}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#000";
  if ("letterSpacing" in ctx) ctx.letterSpacing = `${letterSpacing}px`;

  lines.forEach((line, index) => {
    ctx.save();
    ctx.translate(0, baselines[index]);
    ctx.scale(1, stretch);
    ctx.fillText(line, 0, 0);
    ctx.restore();
  });
  return canvas.toDataURL("image/png");
}
