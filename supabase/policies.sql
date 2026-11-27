create policy "owners delete their own entries" on public.entries as PERMISSIVE for DELETE to public
  using ((auth.uid() = owner));

create policy "contributors upload into their own folder" on storage.objects as PERMISSIVE for INSERT to authenticated
  with check (((bucket_id = 'photos'::text) AND ((storage.foldername(name))[1] = ( SELECT (auth.uid())::text AS uid))));

create policy "contributors delete their own photos" on storage.objects as PERMISSIVE for DELETE to authenticated
  using (((bucket_id = 'photos'::text) AND ((storage.foldername(name))[1] = ( SELECT (auth.uid())::text AS uid))));

create policy "anyone can read published entries" on public.entries as PERMISSIVE for SELECT to public
  using (((status = 'published'::text) OR (( SELECT auth.uid() AS uid) = owner) OR ( SELECT is_reviewer() AS is_reviewer)));

create policy "owners add their own entries" on public.entries as PERMISSIVE for INSERT to authenticated
  with check (((( SELECT auth.uid() AS uid) = owner) AND (status = 'pending'::text)));

create policy "owners edit their own entries" on public.entries as PERMISSIVE for UPDATE to authenticated
  using ((( SELECT auth.uid() AS uid) = owner))
  with check (((( SELECT auth.uid() AS uid) = owner) AND ((status = 'pending'::text) OR ( SELECT is_reviewer() AS is_reviewer))));