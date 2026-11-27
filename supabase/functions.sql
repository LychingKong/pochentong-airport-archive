CREATE OR REPLACE FUNCTION public.word_count(t text)
 RETURNS integer
 LANGUAGE sql
 IMMUTABLE STRICT
 SET search_path TO ''
AS $function$
  select count(*)::integer
  from regexp_split_to_table(t, '\s+') as word
  where word <> ''
$function$
;

CREATE OR REPLACE FUNCTION public.tags_valid(t text, max_tags integer, max_len integer)
 RETURNS boolean
 LANGUAGE sql
 IMMUTABLE STRICT
 SET search_path TO ''
AS $function$
  select count(*) between 1 and max_tags
     and count(*) = count(distinct lower(tag))
     and coalesce(max(char_length(tag)), 0) <= max_len
  from (
    select trim(piece) as tag
    from regexp_split_to_table(t, ',') as piece
  ) as pieces
  where tag <> ''
$function$
;

CREATE OR REPLACE FUNCTION public.is_reviewer()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
  select exists (select 1 from public.reviewers where user_id = (select auth.uid()));
$function$
;

CREATE OR REPLACE FUNCTION public.review_entry(entry_id uuid, decision text, note text DEFAULT NULL::text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  if not public.is_reviewer() then
    return false;
  end if;
  if decision not in ('published', 'returned') then
    return false;
  end if;
  update public.entries
    set status = decision,
        review_note = case when decision = 'returned' then note else null end
    where id = entry_id and status = 'pending';
  return found;
end;
$function$
;