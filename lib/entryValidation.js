// Shared by the /contribute form (instant feedback) and /api/entries
// (the check that actually protects the database).

export const TEXT_FIELDS = [
  "title",
  "title_km",
  "description",
  "description_km",
  "story",
  "story_km",
  "tags",
  "tags_km",
  "contributor",
  "contributor_km",
];

const RULES = {
  title: { required: true, maxChars: 120 },
  title_km: { required: true, maxChars: 150 },
  description: { required: true, maxChars: 1000 },
  description_km: { required: true, maxChars: 1200 },
  story: { required: true, maxWords: 5000 },
  story_km: { required: true, maxWords: 6000 },
  tags: { tags: true, maxTags: 6, maxTagChars: 40 },
  tags_km: { tags: true, maxTags: 6, maxTagChars: 50 },
  contributor: { maxChars: 80 },
  contributor_km: { maxChars: 100 },
};

// Vercel rejects request bodies over 4.5 MB, so the photo must stay under that.
export const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

const IMAGE_EXTENSIONS = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

// Code points, not UTF-16 units, so Khmer and emoji count the way people expect.
function countChars(text) {
  return [...text].length;
}

// Intl.Segmenter knows Khmer word boundaries, which have no spaces between them.
function countWords(text, locale) {
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter(locale, { granularity: "word" });
    let count = 0;
    for (const part of segmenter.segment(text)) if (part.isWordLike) count++;
    return count;
  }
  return text.split(/\s+/).filter(Boolean).length;
}

function checkTags(text, rule) {
  const tags = text
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  if (tags.length === 0) return { error: { code: "onlyCommas" } };
  if (tags.length > rule.maxTags)
    return { error: { code: "tooManyTags", max: rule.maxTags } };
  if (tags.some((tag) => countChars(tag) > rule.maxTagChars))
    return { error: { code: "tagTooLong", max: rule.maxTagChars } };
  const lower = tags.map((tag) => tag.toLocaleLowerCase());
  if (new Set(lower).size !== lower.length)
    return { error: { code: "duplicateTag" } };
  return { value: tags.join(", ") };
}

function checkField(name, raw) {
  const rule = RULES[name];
  const text = typeof raw === "string" ? raw.trim() : "";

  if (text === "") {
    if (rule.required) return { error: { code: "required" } };
    if (typeof raw === "string" && raw.length > 0)
      return { error: { code: "onlySpaces" } };
    return { value: null };
  }
  if (rule.tags) return checkTags(text, rule);
  if (rule.maxChars && countChars(text) > rule.maxChars)
    return { error: { code: "tooLongChars", max: rule.maxChars } };
  if (rule.maxWords) {
    const words = countWords(text, name.endsWith("_km") ? "km" : "en");
    if (words === 0) return { error: { code: "required" } };
    if (words > rule.maxWords)
      return { error: { code: "tooLongWords", max: rule.maxWords } };
  }
  return { value: text };
}

// Returns only the whitelisted fields, trimmed, so nothing else
// (id, created_at, owner) can ride along into the insert.
// Live "used / max" numbers for the form's counters, using the same
// counting rules as the validation above.
export function fieldUsage(name, raw) {
  const rule = RULES[name];
  const text = (raw || "").trim();
  if (rule.tags) {
    const used = text.split(",").filter((tag) => tag.trim()).length;
    return { used, max: rule.maxTags, unit: "tags" };
  }
  if (rule.maxWords) {
    const used = text
      ? countWords(text, name.endsWith("_km") ? "km" : "en")
      : 0;
    return { used, max: rule.maxWords, unit: "words" };
  }
  return { used: countChars(text), max: rule.maxChars, unit: "chars" };
}

export function validateEntry(input) {
  const values = {};
  const errors = {};
  for (const name of TEXT_FIELDS) {
    const result = checkField(name, input[name]);
    if (result.error) errors[name] = result.error;
    else values[name] = result.value;
  }
  return { values, errors };
}

// The file's first bytes decide its type; the name and the browser's
// MIME claim must both agree with them.
function detectImageType(bytes) {
  const startsWith = (sig, offset = 0) =>
    sig.every((byte, i) => bytes[offset + i] === byte);
  if (startsWith([0xff, 0xd8, 0xff])) return "image/jpeg";
  if (startsWith([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
    return "image/png";
  if (
    startsWith([0x52, 0x49, 0x46, 0x46]) &&
    startsWith([0x57, 0x45, 0x42, 0x50], 8)
  )
    return "image/webp";
  return null;
}

export async function checkImageFile(file) {
  if (!file || typeof file.arrayBuffer !== "function" || file.size === 0)
    return { error: { code: "imageRequired" } };
  if (file.size > MAX_IMAGE_BYTES)
    return {
      error: { code: "imageTooLarge", max: MAX_IMAGE_BYTES / 1024 / 1024 },
    };

  const extension = (file.name || "").split(".").pop().toLowerCase();
  const allowedExtensions = ["jpg", "jpeg", "png", "webp"];
  if (!allowedExtensions.includes(extension) || !IMAGE_EXTENSIONS[file.type])
    return { error: { code: "imageType" } };

  const head = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const detected = detectImageType(head);
  if (!detected || detected !== file.type)
    return { error: { code: "imageInvalid" } };

  // Browser only: make sure the picture actually decodes.
  if (typeof createImageBitmap === "function") {
    try {
      (await createImageBitmap(file)).close();
    } catch {
      return { error: { code: "imageInvalid" } };
    }
  }
  return { type: detected, ext: IMAGE_EXTENSIONS[detected] };
}
