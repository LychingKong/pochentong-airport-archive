// Server-only helpers shared by /api/entries (create) and
// /api/entries/[id] (update, delete).

import { NextResponse } from "next/server";

import { checkImageFile, TEXT_FIELDS, validateEntry } from "./entryValidation";

const BUCKET = "photos";

export function fail(error, status, fields) {
  return NextResponse.json({ error, fields }, { status });
}

// Reads the submitted form and runs the same rules as the browser.
// With photoRequired: false, an empty photo field means "keep the old one".
export async function readEntryForm(request, { photoRequired }) {
  let form;
  try {
    form = await request.formData();
  } catch (err) {
    console.error("Could not read entry form data:", err);
    return { badRequest: true };
  }

  const input = {};
  for (const name of TEXT_FIELDS) input[name] = form.get(name);
  const { values, errors } = validateEntry(input);

  const image = form.get("images");
  const hasPhoto = Boolean(
    image && typeof image === "object" && image.size > 0,
  );
  let imageCheck = null;
  if (photoRequired || hasPhoto) {
    imageCheck = await checkImageFile(image);
    if (imageCheck.error) errors.images = imageCheck.error;
  }

  return { values, errors, image: imageCheck ? image : null, imageCheck };
}

export async function uploadPhoto(supabase, userId, image, imageCheck) {
  const path = `${userId}/${crypto.randomUUID()}.${imageCheck.ext}`;
  const photos = supabase.storage.from(BUCKET);
  const { error } = await photos.upload(path, image, {
    contentType: imageCheck.type,
    upsert: false,
  });
  if (error) {
    console.error("Photo upload failed:", error);
    return null;
  }
  return { path, url: photos.getPublicUrl(path).data.publicUrl };
}

// Turns stored image URLs back into storage paths, keeping only photos in
// this user's own folder (old entries' /entries/... files are left alone).
export function ownPhotoPaths(urls, userId) {
  const prefix = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/`;
  return urls
    .map((url) => url.trim())
    .filter((url) => url.startsWith(prefix))
    .map((url) => decodeURIComponent(url.slice(prefix.length)))
    .filter((path) => path.startsWith(`${userId}/`));
}

export async function removePhotos(supabase, paths) {
  if (paths.length === 0) return;
  const { error } = await supabase.storage.from(BUCKET).remove(paths);
  if (error) console.error("Photo cleanup failed:", paths, error);
}
