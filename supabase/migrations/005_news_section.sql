-- Migration 005: boys/girls section tagging for news posts.
-- The college runs separate boys and girls sections; updates for each
-- section are published separately. Values: 'general' (default, both
-- sections), 'boys', 'girls'. Existing rows stay 'general'.
alter table news_posts
  add column if not exists section text not null default 'general';
alter table news_posts drop constraint if exists news_posts_section_check;
alter table news_posts add constraint news_posts_section_check
  check (section in ('general', 'boys', 'girls'));
create index if not exists news_section_idx on news_posts (section);
