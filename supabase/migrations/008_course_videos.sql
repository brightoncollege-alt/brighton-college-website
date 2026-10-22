-- Migration 008: course_videos table for Supabase-managed courses.
-- (Drive-folder courses list videos from Drive; this table is for
--  admin-created courses with manually added videos.)
-- Idempotent.

create table if not exists course_videos (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) on delete cascade,
  title text not null,
  description text,
  video_url text,
  drive_file_id text,
  thumbnail_url text,
  duration_sec int default 0,
  sort int not null default 0,
  published boolean default true,
  created_at timestamptz default now()
);
create index if not exists course_videos_course_idx on course_videos (course_id, sort asc);

alter table course_videos enable row level security;
drop policy if exists "public read" on course_videos;
create policy "public read" on course_videos for select using (true);
drop policy if exists "anon write" on course_videos;
create policy "anon write" on course_videos for all using (true) with check (true);
