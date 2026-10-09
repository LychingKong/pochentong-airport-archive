// Draws the title letters, then paints the current video frame only inside
// them. Canvas works in every browser, unlike masking a <video> in SVG.
// Units: the font is 100 per line; the caller scales the canvas to fit.
export function drawVideoTitle(ctx, options) {
  const { lines, layout, fontFamily, weight, letterSpacing } = options;
  const { video, fallbackColor } = options;
  const { width, height, baselines, stretch } = layout;

  ctx.clearRect(0, 0, width, height);
  ctx.font = `${weight} 100px ${fontFamily}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  if ("letterSpacing" in ctx) ctx.letterSpacing = `${letterSpacing}px`;

  const hasFrame = video && video.readyState >= 2 && video.videoWidth > 0;
  ctx.fillStyle = hasFrame ? "#fff" : fallbackColor;
  lines.forEach((line, index) => {
    ctx.save();
    ctx.translate(0, baselines[index]);
    ctx.scale(1, stretch);
    ctx.fillText(line, 0, 0);
    ctx.restore();
  });
  if (!hasFrame) return;

  // Cover the whole title area with the video, keeping its proportions.
  const scale = Math.max(width / video.videoWidth, height / video.videoHeight);
  const drawWidth = video.videoWidth * scale;
  const drawHeight = video.videoHeight * scale;

  ctx.globalCompositeOperation = "source-in";
  ctx.drawImage(
    video,
    (width - drawWidth) / 2,
    (height - drawHeight) / 2,
    drawWidth,
    drawHeight,
  );
  // Slightly darker video so the letters stand out on a light page.
  ctx.globalCompositeOperation = "source-atop";
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.fillRect(0, 0, width, height);
  ctx.globalCompositeOperation = "source-over";
}
