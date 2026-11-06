-- 011_gallery_media_policies.sql
-- gallery_media was created in the Supabase dashboard (not in schema.sql),
-- with RLS on and only a public SELECT policy — so the admin panel could
-- READ videos but every INSERT/UPDATE/DELETE failed with 42501
-- ("new row violates row-level security policy").
-- Give it the same policies as the other admin-managed tables
-- (news_posts, courses, gallery_images, ...): public read + anon write.
-- NOTE: like the other admin tables, "anon write" means the admin password
-- gates only the panel UI, not the data itself (anon key writes).
alter table gallery_media enable row level security;

drop policy if exists "public read" on gallery_media;
create policy "public read" on gallery_media for select using (true);

drop policy if exists "anon write" on gallery_media;
create policy "anon write" on gallery_media for all using (true) with check (true);
