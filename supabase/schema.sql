-- মোসলেমগঞ্জ উচ্চ বিদ্যালয় - Supabase setup
-- 1) SQL Editor-এ এই পুরো ফাইলটি Run করুন।
-- 2) Storage > Buckets-এ গিয়ে "school-images" নামে Public bucket তৈরি করুন
--    অথবা নিচের storage insert statement চালান।
-- 3) Authentication > Users থেকে একটি Admin user তৈরি করুন।

create table if not exists public.app_data (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.app_data enable row level security;

drop policy if exists "Public can read app data" on public.app_data;
create policy "Public can read app data"
on public.app_data for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated admins can write app data" on public.app_data;
create policy "Authenticated admins can write app data"
on public.app_data for insert
to authenticated
with check (true);

drop policy if exists "Authenticated admins can update app data" on public.app_data;
create policy "Authenticated admins can update app data"
on public.app_data for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated admins can delete app data" on public.app_data;
create policy "Authenticated admins can delete app data"
on public.app_data for delete
to authenticated
using (true);

-- Public image bucket
insert into storage.buckets (id, name, public)
values ('school-images', 'school-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can view school images" on storage.objects;
create policy "Public can view school images"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'school-images');

drop policy if exists "Authenticated admins can upload school images" on storage.objects;
create policy "Authenticated admins can upload school images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'school-images');

drop policy if exists "Authenticated admins can update school images" on storage.objects;
create policy "Authenticated admins can update school images"
on storage.objects for update
to authenticated
using (bucket_id = 'school-images')
with check (bucket_id = 'school-images');

drop policy if exists "Authenticated admins can delete school images" on storage.objects;
create policy "Authenticated admins can delete school images"
on storage.objects for delete
to authenticated
using (bucket_id = 'school-images');
