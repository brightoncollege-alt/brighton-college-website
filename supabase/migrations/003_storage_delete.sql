-- Migration 003: allow deleting files from the three public buckets.
-- Same trust model as the public INSERT policy: the admin UI is password-gated,
-- so anonymous DELETE on these three buckets is the pragmatic choice (Kartly pattern).
drop policy if exists "storage public delete results" on storage.objects;
create policy "storage public delete results" on storage.objects
  for delete using (bucket_id = 'results');
drop policy if exists "storage public delete gallery" on storage.objects;
create policy "storage public delete gallery" on storage.objects
  for delete using (bucket_id = 'gallery');
drop policy if exists "storage public delete news" on storage.objects;
create policy "storage public delete news" on storage.objects
  for delete using (bucket_id = 'news');
