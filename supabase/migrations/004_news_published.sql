-- Migration 004: draft/publish workflow for the blog (news_posts).
-- Public pages show only published=true; the admin sees everything and flips
-- the toggle. Existing rows stay published (default true).
alter table news_posts
  add column if not exists published boolean not null default true;
create index if not exists news_published_flag_idx on news_posts (published);
