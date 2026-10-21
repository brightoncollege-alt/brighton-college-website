-- ============================================================
-- Migration 002 — Multi-college foundation
-- Run AFTER supabase/schema.sql in Supabase Dashboard → SQL Editor.
-- Adds the `colleges` registry and scopes every content table to a
-- college via nullable college_id. Existing rows are backfilled to
-- the default college (Brighton), so nothing breaks.
-- ============================================================

-- ============ colleges registry ============

create table if not exists colleges (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  short_name text default '',
  tagline text default '',
  logo_url text default '',
  primary_color text default '#0A1B33',
  accent_color text default '#C9A227',
  contact jsonb not null default '{}'::jsonb,
  created_at timestamptz default now()
);

-- ============ scope content tables to a college ============

alter table news_posts          add column if not exists college_id uuid references colleges(id) on delete set null;
alter table courses             add column if not exists college_id uuid references colleges(id) on delete set null;
alter table test_results        add column if not exists college_id uuid references colleges(id) on delete set null;
alter table study_material      add column if not exists college_id uuid references colleges(id) on delete set null;
alter table admission_applications add column if not exists college_id uuid references colleges(id) on delete set null;
alter table gallery_images      add column if not exists college_id uuid references colleges(id) on delete set null;
alter table contact_messages    add column if not exists college_id uuid references colleges(id) on delete set null;

create index if not exists news_college_idx        on news_posts (college_id);
create index if not exists courses_college_idx     on courses (college_id);
create index if not exists results_college_idx     on test_results (college_id);
create index if not exists material_college_idx    on study_material (college_id);
create index if not exists applications_college_idx on admission_applications (college_id);
create index if not exists gallery_college_idx     on gallery_images (college_id);
create index if not exists messages_college_idx    on contact_messages (college_id);

-- ============ RLS for colleges ============

alter table colleges enable row level security;

drop policy if exists "public read colleges" on colleges;
create policy "public read colleges" on colleges for select using (true);

drop policy if exists "admin write colleges" on colleges;
create policy "admin write colleges" on colleges for all using (true) with check (true);

-- ============ seed: The Brighton College (default) ============

insert into colleges (slug, name, short_name, tagline, primary_color, accent_color, contact)
values (
  'brighton',
  'The Brighton College of Science',
  'The Brighton College',
  'Brighten Your Future in Brighton',
  '#0A1B33',
  '#C9A227',
  '{"address": "KKS Plaza, Main Mardan Swabi Road, Shewa Adda, Near Police Station, Kalu Khan, Razzar, Swabi", "phone": "0317-9609048 / 0314-9649602", "email": "infothebrightoncollege@gmail.com", "website": "www.thebrightoncollege.org", "whatsapp": "923179609048", "principal_name": "Mr. Fayoun Khan", "principal_title": "PhD Research Scholar (Urdu)", "coordinator_name": "Mr. Imranullah", "coordinator_title": "M.Phil Physics", "motto": "Realizing dreams through the light of knowledge", "founded": "1st May 2023", "board": "Board of Intermediate & Secondary Education, Mardan"}'::jsonb
)
on conflict (slug) do nothing;

-- ============ backfill: existing rows belong to Brighton ============

update news_posts             set college_id = (select id from colleges where slug = 'brighton') where college_id is null;
update courses                set college_id = (select id from colleges where slug = 'brighton') where college_id is null;
update test_results           set college_id = (select id from colleges where slug = 'brighton') where college_id is null;
update study_material         set college_id = (select id from colleges where slug = 'brighton') where college_id is null;
update admission_applications set college_id = (select id from colleges where slug = 'brighton') where college_id is null;
update gallery_images         set college_id = (select id from colleges where slug = 'brighton') where college_id is null;
update contact_messages       set college_id = (select id from colleges where slug = 'brighton') where college_id is null;
