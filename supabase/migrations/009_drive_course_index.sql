-- Migration 009: drive_course_index — index of all Drive-discovered courses.
-- Lets the admin see/manage every course found on Drive.
-- Idempotent.

create table if not exists drive_course_index (
  id uuid primary key default gen_random_uuid(),
  drive_folder_id text not null unique,
  title text not null,
  parent_folder_id text,
  parent_title text,
  depth int not null default 0,
  video_count int not null default 0,
  thumbnail_url text,
  is_bundle boolean not null default false,
  last_scanned timestamptz default now(),
  created_at timestamptz default now()
);
create index if not exists drive_course_index_title_idx on drive_course_index (title);
create index if not exists drive_course_index_parent_idx on drive_course_index (parent_folder_id);

alter table drive_course_index enable row level security;
drop policy if exists "public read" on drive_course_index;
create policy "public read" on drive_course_index for select using (true);
drop policy if exists "anon write" on drive_course_index;
create policy "anon write" on drive_course_index for all using (true) with check (true);
