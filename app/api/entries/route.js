import { NextResponse } from "next/server";

import {
  fail,
  readEntryForm,
  removePhotos,
  uploadPhoto,
} from "@/lib/entryServer";
import { createClient } from "@/lib/supabase/server";

export async function POST(request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return fail("notSignedIn", 401);

  const form = await readEntryForm(request, { photoRequired: true });
  if (form.badRequest) return fail("badRequest", 400);
  if (Object.keys(form.errors).length > 0)
    return fail("invalid", 400, form.errors);

  const photo = await uploadPhoto(
    supabase,
    user.id,
    form.image,
    form.imageCheck,
  );
  if (!photo) return fail("uploadFailed", 500);

  const { data: entry, error: insertError } = await supabase
    .from("entries")
    .insert({ ...form.values, owner: user.id, images: photo.url })
    .select("id")
    .single();

  if (insertError) {
    console.error("Entry insert failed:", insertError);
    await removePhotos(supabase, [photo.path]);
    return fail("saveFailed", 500);
  }

  return NextResponse.json({ id: entry.id });
}
