import { NextResponse } from "next/server";

import {
  fail,
  ownPhotoPaths,
  readEntryForm,
  removePhotos,
  uploadPhoto,
} from "@/lib/entryServer";
import { createClient } from "@/lib/supabase/server";

async function signedInUser(supabase) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  const supabase = await createClient();
  const user = await signedInUser(supabase);
  if (!user) return fail("notSignedIn", 401);

  const form = await readEntryForm(request, { photoRequired: false });
  if (form.badRequest) return fail("badRequest", 400);
  if (Object.keys(form.errors).length > 0)
    return fail("invalid", 400, form.errors);

  const { data: current, error: readError } = await supabase
    .from("entries")
    .select("images")
    .eq("id", id)
    .eq("owner", user.id)
    .maybeSingle();
  if (readError || !current) {
    console.error("Entry to update not found for this owner:", id, readError);
    return fail("notSaved", 404);
  }

  // A new photo replaces the cover (first image); any others are kept.
  const [oldCover = "", ...otherImages] = (current.images || "").split(",");
  let photo = null;
  if (form.image) {
    photo = await uploadPhoto(supabase, user.id, form.image, form.imageCheck);
    if (!photo) return fail("uploadFailed", 500);
  }
  const images = photo
    ? [photo.url, ...otherImages.map((url) => url.trim())].join(", ")
    : current.images;

  const { data: rows, error } = await supabase
    .from("entries")
    .update({ ...form.values, images })
    .eq("id", id)
    .eq("owner", user.id)
    .select("id");

  if (error || !rows || rows.length === 0) {
    console.error("Entry update not saved:", id, error ?? "no row returned");
    if (photo) await removePhotos(supabase, [photo.path]);
    return fail("notSaved", error ? 500 : 404);
  }

  if (photo) await removePhotos(supabase, ownPhotoPaths([oldCover], user.id));
  return NextResponse.json({ id: rows[0].id });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const supabase = await createClient();
  const user = await signedInUser(supabase);
  if (!user) return fail("notSignedIn", 401);

  const { data: rows, error } = await supabase
    .from("entries")
    .delete()
    .eq("id", id)
    .eq("owner", user.id)
    .select("id, images");

  if (error || !rows || rows.length === 0) {
    console.error("Entry delete not saved:", id, error ?? "no row returned");
    return fail("notSaved", error ? 500 : 404);
  }

  const urls = (rows[0].images || "").split(",");
  await removePhotos(supabase, ownPhotoPaths(urls, user.id));
  return NextResponse.json({ id: rows[0].id });
}
