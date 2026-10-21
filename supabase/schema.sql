-- ============================================================
-- THE BRIGHTON COLLEGE — Supabase schema (CANONICAL, matches live DB)
-- Live project: vhmqofxciisnrxrzbovq ("brighton-college", ap-southeast-1)
-- Run order: schema.sql → migrations/002 → 003 → 004 → 005 → 006 → 007
-- ============================================================

create table if not exists colleges (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tagline text,
  created_at timestamptz default now()
);

create table if not exists news_posts (
  id uuid primary key default gen_random_uuid(),
  college_id uuid references colleges(id) on delete cascade,
  title text not null,
  body text not null,
  category text default 'General',
  image_url text,
  published boolean default true,
  section text not null default 'general' check (section in ('general','boys','girls')),
  pinned boolean not null default false,
  published_at timestamptz not null default now(),
  created_at timestamptz default now()
);

create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  college_id uuid references colleges(id) on delete cascade,
  title text not null,
  description text,
  thumbnail_url text,
  drive_folder_id text,
  class_level text not null default 'General' check (class_level in ('11th','12th','General')),
  sort int not null default 0,
  published boolean default true,
  created_at timestamptz default now()
);

create table if not exists test_results (
  id uuid primary key default gen_random_uuid(),
  college_id uuid references colleges(id) on delete cascade,
  title text not null,
  class_level text,
  test_type text,
  subject text default '',
  image_url text default '',
  drive_file_id text default '',
  file_type text not null default 'document' check (file_type in ('video','document','image')),
  file_url text,
  result_data text default '',
  published boolean default true,
  published_at timestamptz not null default now(),
  created_at timestamptz default now()
);

create table if not exists study_material (
  id uuid primary key default gen_random_uuid(),
  college_id uuid references colleges(id) on delete cascade,
  title text not null,
  subject text not null default '',
  file_type text,
  class_level text,
  drive_file_id text default '',
  file_url text,
  created_at timestamptz default now()
);

create table if not exists gallery_images (
  id uuid primary key default gen_random_uuid(),
  college_id uuid references colleges(id) on delete cascade,
  title text,
  caption text default '',
  image_url text not null,
  story_slug text,
  created_at timestamptz default now()
);

create table if not exists admission_applications (
  id uuid primary key default gen_random_uuid(),
  college_id uuid references colleges(id) on delete cascade,
  full_name text not null,
  father_name text,
  section text,
  program text,
  school text,
  board_marks text,
  phone text,
  address text,
  reviewed boolean default false,
  created_at timestamptz default now()
);

create table if not exists site_settings (
  id uuid primary key default gen_random_uuid(),
  college_id uuid references colleges(id) on delete cascade,
  key text not null,
  value text not null,
  updated_at timestamptz default now(),
  unique(college_id, key)
);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  college_id uuid references colleges(id) on delete cascade,
  name text not null,
  phone text not null,
  message text not null,
  created_at timestamptz default now()
);

-- RLS: public read everywhere; anon insert on the two public forms;
-- anon write (admin panel is app-password gated in the UI).
alter table colleges enable row level security;
alter table news_posts enable row level security;
alter table courses enable row level security;
alter table test_results enable row level security;
alter table study_material enable row level security;
alter table gallery_images enable row level security;
alter table admission_applications enable row level security;
alter table site_settings enable row level security;
alter table contact_messages enable row level security;

create policy "public read" on colleges for select using (true);
create policy "public read" on news_posts for select using (true);
create policy "public read" on courses for select using (true);
create policy "public read" on test_results for select using (true);
create policy "public read" on study_material for select using (true);
create policy "public read" on gallery_images for select using (true);
create policy "public read" on admission_applications for select using (true);
create policy "public read" on site_settings for select using (true);
create policy "public read" on contact_messages for select using (true);
create policy "anon insert" on admission_applications for insert with check (true);
create policy "anon insert" on contact_messages for insert with check (true);
create policy "anon write" on news_posts for all using (true) with check (true);
create policy "anon write" on courses for all using (true) with check (true);
create policy "anon write" on test_results for all using (true) with check (true);
create policy "anon write" on study_material for all using (true) with check (true);
create policy "anon write" on gallery_images for all using (true) with check (true);
create policy "anon write" on admission_applications for all using (true) with check (true);
create policy "anon write" on site_settings for all using (true) with check (true);
create policy "anon write" on contact_messages for all using (true) with check (true);
create policy "anon write" on colleges for all using (true) with check (true);

insert into colleges (slug, name, tagline)
  values ('brighton', 'THE BRIGHTON COLLEGE OF SCIENCE', 'Brighten Your Future in Brighton')
  on conflict (slug) do nothing;
