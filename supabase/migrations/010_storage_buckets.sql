-- ============================================================
-- Migration 010 — Storage buckets for admin image uploads
-- Run in Supabase Dashboard → SQL Editor.
-- Creates the three public buckets the admin panel uploads into
-- (news covers, gallery photos, result pictures) plus the storage
-- policies the anon-key admin UI needs (upload / list / delete).
-- Bucket creation and storage policies CANNOT be done with the anon
-- API key (it gets 403), so this SQL is the fix — run it once.
-- Idempotent: safe to re-run.
-- ============================================================

insert into storage.buckets (id, name, public)
values ('news', 'news', true),
       ('gallery', 'gallery', true),
       ('results', 'results', true)
on conflict (id) do update set public = true;

-- ---- anon INSERT (upload). Same trust model as migration 003:
-- the admin UI itself is password-gated, so anon upload on these
-- three buckets is the pragmatic choice (Kartly pattern). ----
drop policy if exists "storage public insert news" on storage.objects;
create policy "storage public insert news" on storage.objects
  for insert with check (bucket_id = 'news');
drop policy if exists "storage public insert gallery" on storage.objects;
create policy "storage public insert gallery" on storage.objects
  for insert with check (bucket_id = 'gallery');
drop policy if exists "storage public insert results" on storage.objects;
create policy "storage public insert results" on storage.objects
  for insert with check (bucket_id = 'results');

-- ---- anon SELECT (admin storage meter lists files) ----
drop policy if exists "storage public read news" on storage.objects;
create policy "storage public read news" on storage.objects
  for select using (bucket_id = 'news');
drop policy if exists "storage public read gallery" on storage.objects;
create policy "storage public read gallery" on storage.objects
  for select using (bucket_id = 'gallery');
drop policy if exists "storage public read results" on storage.objects;
create policy "storage public read results" on storage.objects
  for select using (bucket_id = 'results');

-- ---- anon DELETE (repeated from 003 so this file alone fixes
-- uploads end-to-end even if 003 was never run) ----
drop policy if exists "storage public delete news" on storage.objects;
create policy "storage public delete news" on storage.objects
  for delete using (bucket_id = 'news');
drop policy if exists "storage public delete gallery" on storage.objects;
create policy "storage public delete gallery" on storage.objects
  for delete using (bucket_id = 'gallery');
drop policy if exists "storage public delete results" on storage.objects;
create policy "storage public delete results" on storage.objects
  for delete using (bucket_id = 'results');
