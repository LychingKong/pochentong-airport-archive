-- Entries Table
create table public.entries (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  owner uuid not null,
  title text not null,
  title_km text not null,
  description text not null,
  description_km text not null,
  story text not null,
  story_km text not null,
  tags text null,
  tags_km text null,
  images text null,
  contributor text null,
  contributor_km text null,
  status text not null default 'pending'::text,
  review_note text null,
  constraint entries_pkey primary key (id),
  constraint entries_owner_fkey foreign KEY (owner) references auth.users (id),
  constraint entries_description_check check (
    (
      (description is not null)
      and (
        (
          char_length(
            TRIM(
              both
              from
                description
            )
          ) >= 1
        )
        and (
          char_length(
            TRIM(
              both
              from
                description
            )
          ) <= 1000
        )
      )
    )
  ),
  constraint entries_description_km_check check (
    (
      (description_km is not null)
      and (
        (
          char_length(
            TRIM(
              both
              from
                description_km
            )
          ) >= 1
        )
        and (
          char_length(
            TRIM(
              both
              from
                description_km
            )
          ) <= 1200
        )
      )
    )
  ),
  constraint entries_images_check check (
    (
      (images is not null)
      and (owner is not null)
      and (
        images ~* (
          (
            '^https://fxnylgdvjrwuhotqvqkt\.supabase\.co/storage/v1/object/public/photos/'::text || (owner)::text
          ) || '/[^/,]+\.(jpg|jpeg|png|webp)$'::text
        )
      )
    )
  ) not VALID,
  constraint entries_status_check check (
    (
      status = any (
        array[
          'pending'::text,
          'published'::text,
          'returned'::text
        ]
      )
    )
  ),
  constraint entries_story_check check (
    (
      (story is not null)
      and (
        char_length(
          TRIM(
            both
            from
              story
          )
        ) > 0
      )
      and (
        (word_count (story) >= 1)
        and (word_count (story) <= 5000)
      )
    )
  ),
  constraint entries_story_km_check check (
    (
      (story_km is not null)
      and (
        char_length(
          TRIM(
            both
            from
              story_km
          )
        ) > 0
      )
      and (
        (word_count (story_km) >= 1)
        and (word_count (story_km) <= 6000)
      )
    )
  ),
  constraint entries_tags_check check (
    (
      (tags is null)
      or tags_valid (tags, 6, 40)
    )
  ),
  constraint entries_tags_km_check check (
    (
      (tags_km is null)
      or tags_valid (tags_km, 6, 50)
    )
  ),
  constraint entries_title_check check (
    (
      (title is not null)
      and (
        (
          char_length(
            TRIM(
              both
              from
                title
            )
          ) >= 1
        )
        and (
          char_length(
            TRIM(
              both
              from
                title
            )
          ) <= 120
        )
      )
    )
  ),
  constraint entries_contributor_check check (
    (
      (contributor is null)
      or (
        (
          char_length(
            TRIM(
              both
              from
                contributor
            )
          ) >= 1
        )
        and (
          char_length(
            TRIM(
              both
              from
                contributor
            )
          ) <= 80
        )
      )
    )
  ),
  constraint entries_title_km_check check (
    (
      (title_km is not null)
      and (
        (
          char_length(
            TRIM(
              both
              from
                title_km
            )
          ) >= 1
        )
        and (
          char_length(
            TRIM(
              both
              from
                title_km
            )
          ) <= 150
        )
      )
    )
  ),
  constraint entries_contributor_km_check check (
    (
      (contributor_km is null)
      or (
        (
          char_length(
            TRIM(
              both
              from
                contributor_km
            )
          ) >= 1
        )
        and (
          char_length(
            TRIM(
              both
              from
                contributor_km
            )
          ) <= 100
        )
      )
    )
  )
) TABLESPACE pg_default;

-- Reviewers Table
create table public.reviewers (
  user_id uuid not null,
  constraint reviewers_pkey primary key (user_id),
  constraint reviewers_user_id_fkey foreign KEY (user_id) references auth.users (id)
) TABLESPACE pg_default;