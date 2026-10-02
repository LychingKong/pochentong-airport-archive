import { NextResponse } from "next/server";

import {
  checkImageFile,
  TEXT_FIELDS,
  validateEntry,
} from "@/lib/entryValidation";
import { createClient } from "@/lib/supabase/server";

function fail(error, status, fields) {
  return NextResponse.json({ error, fields }, { status });
}

export async function POST(request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return fail("notSignedIn", 401);

  let form;
  try {
    form = await request.formData();
  } catch (err) {
    console.error("Could not read contribute form data:", err);
    return fail("badRequest", 400);
  }

  const input = {};
  for (const name of TEXT_FIELDS) input[name] = form.get(name);
  const { values, errors } = validateEntry(input);

  const image = form.get("images");
  const imageCheck = await checkImageFile(image);
  if (imageCheck.error) errors.images = imageCheck.error;

  if (Object.keys(errors).length > 0) return fail("invalid", 400, errors);

  const path = `${user.id}/${crypto.randomUUID()}.${imageCheck.ext}`;
  const photos = supabase.storage.from("photos");

  const { error: uploadError } = await photos.upload(path, image, {
    contentType: imageCheck.type,
    upsert: false,
  });
  if (uploadError) {
    console.error("Photo upload failed:", uploadError);
    return fail("uploadFailed", 500);
  }

  const {
    data: { publicUrl },
  } = photos.getPublicUrl(path);

  const { data: entry, error: insertError } = await supabase
    .from("entries")
    .insert({ ...values, owner: user.id, images: publicUrl })
    .select("id")
    .single();

  if (insertError) {
    console.error("Entry insert failed:", insertError);
    const { error: cleanupError } = await photos.remove([path]);
    if (cleanupError)
      console.error("Orphaned photo not removed:", path, cleanupError);
    return fail("saveFailed", 500);
  }

  return NextResponse.json({ id: entry.id });
}
