-- ============================================================
-- THE BRIGHTON COLLEGE — Supabase schema
-- Run this in Supabase Dashboard → SQL Editor → New query → Run.
-- (Supabase project: create it under the NEW Google account.)
-- ============================================================

-- ============ TABLES ============

create table if not exists news_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null default '',
  category text not null default 'Notice'
    check (category in ('Notice','Result','Event','Date Sheet','Admissions','General')),
  pinned boolean not null default false,
  published_at timestamptz not null default now(),
  created_at timestamptz default now()
);

-- Video courses: one Drive folder per course (folder-per-course model).
-- Admin adds: title + drive_folder_id. Videos auto-list from the folder.
create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  drive_folder_id text not null,
  thumbnail_url text default '',
  class_level text not null default 'General'
    check (class_level in ('11th','12th','General')),
  sort int not null default 0,
  created_at timestamptz default now()
);

create table if not exists test_results (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  class_level text not null default '11th' check (class_level in ('11th','12th')),
  test_type text not null default 'weekly' check (test_type in ('weekly','monthly')),
  subject text default '',
  -- Option A: attach a Drive file (PDF/image sheet)
  drive_file_id text default '',
  file_type text not null default 'document' check (file_type in ('video','document','image')),
  -- Option B: inline subject marks as JSON: [{"subject":"Physics","obtained":78,"total":100}]
  result_data text default '',
  published_at timestamptz not null default now(),
  created_at timestamptz default now()
);

-- Curated study material picks (shown under "Recommended by Teachers").
-- file_type: video → embedded player, document → viewer, image → gallery viewer.
create table if not exists study_material (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subject text not null default '',
  class_level text not null default '11th' check (class_level in ('11th','12th')),
  file_type text not null default 'document' check (file_type in ('video','document','image')),
  drive_file_id text not null,
  created_at timestamptz default now()
);

create table if not exists admission_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  father_name text not null,
  gender text not null default 'Male',
  section text not null default 'Boys' check (section in ('Boys','Girls')),
  program text not null,
  previous_school text default '',
  board_marks int,
  phone text not null,
  address text default '',
  reviewed boolean not null default false,
  created_at timestamptz default now()
);

create table if not exists gallery_images (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text default '',
  created_at timestamptz default now()
);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  message text not null,
  created_at timestamptz default now()
);

-- ============ INDEXES ============

create index if not exists news_published_idx on news_posts (published_at desc);
create index if not exists courses_sort_idx on courses (sort asc);
create index if not exists results_published_idx on test_results (published_at desc);
create index if not exists results_class_type_idx on test_results (class_level, test_type);
create index if not exists material_subject_idx on study_material (subject);
create index if not exists applications_created_idx on admission_applications (created_at desc);

-- ============ ROW LEVEL SECURITY ============
-- Open pattern (same as Kartly): public read everywhere, public insert on
-- the two public forms. Admin writes (news/courses/results/material/gallery)
-- are gated by the app-level admin password in the UI.
-- NOTE: this means anyone with the anon key + table names could write too.
-- For a college site this is acceptable to start; harden later with
-- Supabase Auth (admin login) + restrictive policies if spam appears.

alter table news_posts enable row level security;
alter table courses enable row level security;
alter table test_results enable row level security;
alter table study_material enable row level security;
alter table admission_applications enable row level security;
alter table gallery_images enable row level security;
alter table contact_messages enable row level security;

-- Public read: everything
create policy "public read" on news_posts for select using (true);
create policy "public read" on courses for select using (true);
create policy "public read" on test_results for select using (true);
create policy "public read" on study_material for select using (true);
create policy "public read" on gallery_images for select using (true);
-- admission applications + contact messages: NO public read (privacy)

-- Public insert: the two public forms only
create policy "public insert" on admission_applications for insert with check (true);
create policy "public insert" on contact_messages for insert with check (true);

-- Admin-managed tables: open write (app-password gated in UI; see note above)
create policy "admin write" on news_posts for all using (true) with check (true);
create policy "admin write" on courses for all using (true) with check (true);
create policy "admin write" on test_results for all using (true) with check (true);
create policy "admin write" on study_material for all using (true) with check (true);
create policy "admin write" on gallery_images for all using (true) with check (true);
create policy "admin manage applications" on admission_applications
  for update using (true) with check (true);
create policy "admin delete applications" on admission_applications
  for delete using (true);
create policy "admin manage messages" on contact_messages
  for delete using (true);

-- ============ SEED: welcome news post ============

insert into news_posts (title, body, category, pinned)
values (
  'Admissions Open — Session 2026',
  'Admissions are now open for 11th and 12th (boys and girls sections) in all programs: Pre-Medical, Pre-Engineering, ICS, Commerce and FA. Apply online or visit the college office at Shwe Adda, Kalukhan.',
  'Admissions',
  true
) on conflict do nothing;

-- ============ SUPABASE STORAGE (small pictures) ============
-- Test-result pictures, gallery photos and news cover images upload
-- straight to Supabase Storage from the admin panel. The free plan's 1GB
-- is plenty for these small files (each rejected above 5MB in the UI).
-- Same open pattern as the tables: public read + public insert, gated
-- by the app-level admin password in the UI.

insert into storage.buckets (id, name, public)
values ('results', 'results', true),
       ('gallery', 'gallery', true),
       ('news', 'news', true)
on conflict (id) do nothing;

-- Public read: all three buckets
drop policy if exists "storage public read results" on storage.objects;
create policy "storage public read results" on storage.objects
  for select using (bucket_id = 'results');
drop policy if exists "storage public read gallery" on storage.objects;
create policy "storage public read gallery" on storage.objects
  for select using (bucket_id = 'gallery');
drop policy if exists "storage public read news" on storage.objects;
create policy "storage public read news" on storage.objects
  for select using (bucket_id = 'news');

-- Public insert: all three buckets (admin UI gated)
drop policy if exists "storage public insert results" on storage.objects;
create policy "storage public insert results" on storage.objects
  for insert with check (bucket_id = 'results');
drop policy if exists "storage public insert gallery" on storage.objects;
create policy "storage public insert gallery" on storage.objects
  for insert with check (bucket_id = 'gallery');
drop policy if exists "storage public insert news" on storage.objects;
create policy "storage public insert news" on storage.objects
  for insert with check (bucket_id = 'news');

-- ============ IMAGE COLUMNS (uploaded pictures) ============

alter table news_posts add column if not exists image_url text default '';
alter table test_results add column if not exists image_url text default '';

-- ============ NEW CATEGORY: Warning ============
-- Short warnings ("Warning") sit next to "Notice" in the admin category list.

alter table news_posts drop constraint if exists news_posts_category_check;
alter table news_posts add constraint news_posts_category_check
  check (category in ('Notice','Warning','Result','Event','Date Sheet','Admissions','General'));
