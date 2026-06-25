-- ============================================================================
-- Odoo ERP Workshop — Supabase schema
-- Run this in the Supabase SQL Editor (Dashboard -> SQL Editor -> New query).
-- Safe to re-run: uses IF NOT EXISTS / CREATE OR REPLACE / DROP POLICY IF EXISTS.
-- ============================================================================

-- ─── 1. PROFILES ────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  email      text,
  full_name  text,
  batch      text check (batch in ('รุ่นที่ 1', 'รุ่นที่ 2')),
  role       text not null default 'student' check (role in ('student', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─── 2. PROGRESS (one row per completed step) ───────────────────────────────
create table if not exists public.progress (
  user_id      uuid not null references auth.users (id) on delete cascade,
  step_id      int  not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, step_id)
);

create index if not exists progress_user_idx on public.progress (user_id);

-- ─── 3. ADMIN HELPER (SECURITY DEFINER avoids RLS recursion) ────────────────
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ─── 4. AUTO-CREATE PROFILE ON SIGNUP ───────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    -- The workshop owner is promoted to admin automatically.
    case when new.email = 'korathat789@gmail.com' then 'admin' else 'student' end
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Promote the owner even if their account already existed before this script ran.
update public.profiles set role = 'admin'
where email = 'korathat789@gmail.com' and role <> 'admin';

-- ─── 5. ROW LEVEL SECURITY ──────────────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.progress enable row level security;

-- profiles: read own row, admins read everyone
drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin" on public.profiles
  for select using (id = auth.uid() or public.is_admin());

-- profiles: a user may insert only their own row (backup for the trigger)
drop policy if exists "profiles_insert_self" on public.profiles;
create policy "profiles_insert_self" on public.profiles
  for insert with check (id = auth.uid());

-- profiles: a user may update only their own row
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

-- Prevent students from changing their own role/email: lock updates to safe columns.
revoke update on public.profiles from anon, authenticated;
grant  update (full_name, batch, updated_at) on public.profiles to authenticated;

-- progress: read own rows, admins read everyone
drop policy if exists "progress_select_own_or_admin" on public.progress;
create policy "progress_select_own_or_admin" on public.progress
  for select using (user_id = auth.uid() or public.is_admin());

-- progress: a user may insert/delete only their own rows
drop policy if exists "progress_insert_own" on public.progress;
create policy "progress_insert_own" on public.progress
  for insert with check (user_id = auth.uid());

drop policy if exists "progress_delete_own" on public.progress;
create policy "progress_delete_own" on public.progress
  for delete using (user_id = auth.uid());
