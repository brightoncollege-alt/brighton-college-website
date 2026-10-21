-- Migration 006: site_settings key-value store (per college, admin-editable).
-- Holds global switches the admin flips from /secure-admin/ -> Settings,
-- e.g. admissions_open (default FALSE — admissions are currently closed),
-- show_ads and rewarded_ads (both default TRUE). The public site reads
-- these with a localStorage fallback
-- when the backend is offline, so the site never shows a wrong state.
create table if not exists site_settings (
  id uuid primary key default gen_random_uuid(),
  college_id uuid references colleges(id) on delete cascade,
  key text not null,
  value text not null default '',
  updated_at timestamptz not null default now(),
  unique (college_id, key)
);
create index if not exists site_settings_college_idx on site_settings (college_id);

-- Seed honest defaults for every existing college (idempotent).
insert into site_settings (college_id, key, value)
select id, 'admissions_open', 'false' from colleges
on conflict (college_id, key) do nothing;
insert into site_settings (college_id, key, value)
select id, 'show_ads', 'true' from colleges
on conflict (college_id, key) do nothing;
insert into site_settings (college_id, key, value)
select id, 'rewarded_ads', 'true' from colleges
on conflict (college_id, key) do nothing;
