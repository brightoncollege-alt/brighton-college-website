-- Migration 007: fill schema gaps so the admin panel works end-to-end.
-- The live DB was created from a compact schema; the admin UI + public
-- site need these extra columns. All idempotent.

-- news_posts: admin needs pinned + published_at (public site sorts by them)
alter table news_posts add column if not exists pinned boolean not null default false;
alter table news_posts add column if not exists published_at timestamptz not null default now();
create index if not exists news_published_idx on news_posts (published_at desc);

-- courses: admin needs class_level + sort
alter table courses add column if not exists class_level text not null default 'General'
  check (class_level in ('11th','12th','General'));
alter table courses add column if not exists sort int not null default 0;
create index if not exists courses_sort_idx on courses (sort asc);

-- test_results: admin needs subject, image_url, drive_file_id, file_type, result_data, published_at
alter table test_results add column if not exists subject text default '';
alter table test_results add column if not exists image_url text default '';
alter table test_results add column if not exists drive_file_id text default '';
alter table test_results add column if not exists file_type text not null default 'document'
  check (file_type in ('video','document','image'));
alter table test_results add column if not exists result_data text default '';
alter table test_results add column if not exists published_at timestamptz not null default now();
create index if not exists results_published_idx on test_results (published_at desc);

-- study_material: admin needs subject + drive_file_id
alter table study_material add column if not exists subject text not null default '';
alter table study_material add column if not exists drive_file_id text default '';

-- gallery_images: admin needs caption
alter table gallery_images add column if not exists caption text default '';

-- contact_messages: table was missing entirely (admin Messages tab + public contact form)
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  college_id uuid references colleges(id) on delete cascade,
  name text not null,
  phone text not null,
  message text not null,
  created_at timestamptz default now()
);
alter table contact_messages enable row level security;
drop policy if exists "public read" on contact_messages;
create policy "public read" on contact_messages for select using (true);
drop policy if exists "anon insert" on contact_messages;
create policy "anon insert" on contact_messages for insert with check (true);
drop policy if exists "anon write" on contact_messages;
create policy "anon write" on contact_messages for all using (true) with check (true);
