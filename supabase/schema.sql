-- ============================================================
-- Hakeela HakPortal — Supabase schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query).
-- Safe to re-run: uses IF NOT EXISTS / CREATE OR REPLACE where possible.
-- ============================================================

-- ---------- PROFILES ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'student' check (role in ('student','staff','admin')),
  gender text,
  phone text,
  country text,
  avatar_url text,
  how_heard text,
  low_income text,
  disability text,
  status text not null default 'active' check (status in ('active','suspended')),
  created_at timestamptz not null default now()
);

-- Create a profile automatically when a new auth user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, gender, phone, how_heard, low_income, disability)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'gender',
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'how_heard',
    new.raw_user_meta_data->>'low_income',
    new.raw_user_meta_data->>'disability'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Role helpers (SECURITY DEFINER so policies can call them without recursing on RLS)
create or replace function public.is_admin()
returns boolean language sql security definer stable set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

create or replace function public.is_staff_or_admin()
returns boolean language sql security definer stable set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role in ('staff','admin'));
$$;

-- ---------- CONTENT: courses / modules / lessons ----------
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  description text,
  category text,
  price integer not null default 0,
  thumbnail_url text,
  status text not null default 'draft' check (status in ('draft','published')),
  created_at timestamptz not null default now()
);

create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  position integer not null default 0
);

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  title text not null,
  duration text,
  video_url text,
  transcript text,
  position integer not null default 0
);

-- ---------- ENROLLMENTS + PROGRESS ----------
create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending','approved','rejected','active','completed')),
  created_at timestamptz not null default now(),
  unique (user_id, course_id)
);

create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  completed boolean not null default false,
  completed_at timestamptz,
  unique (user_id, lesson_id)
);

-- ---------- ASSESSMENTS + SUBMISSIONS ----------
create table if not exists public.assessments (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references public.lessons(id) on delete cascade,
  title text not null,
  type text not null default 'quiz' check (type in ('quiz','assignment','project')),
  questions jsonb not null default '[]'::jsonb
);

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.assessments(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  answers jsonb,
  score integer,
  status text not null default 'submitted' check (status in ('submitted','needs_grading','graded')),
  feedback text,
  created_at timestamptz not null default now()
);

-- ---------- CERTIFICATES ----------
create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  payment_status text not null default 'unpaid' check (payment_status in ('paid','unpaid','waived')),
  status text not null default 'awaiting_payment' check (status in ('awaiting_payment','ready','issued')),
  file_url text,
  issued_at timestamptz
);

-- ---------- NOTIFICATIONS ----------
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text,
  title text not null,
  body text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------- HELP / CONTACT MESSAGES ----------
create table if not exists public.help_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text,
  email text,
  message text not null,
  created_at timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.profiles       enable row level security;
alter table public.courses        enable row level security;
alter table public.modules        enable row level security;
alter table public.lessons        enable row level security;
alter table public.enrollments    enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.assessments    enable row level security;
alter table public.submissions    enable row level security;
alter table public.certificates   enable row level security;
alter table public.notifications  enable row level security;
alter table public.help_messages  enable row level security;

-- PROFILES: read/update own; admins manage all
drop policy if exists profiles_self_read on public.profiles;
create policy profiles_self_read on public.profiles for select using (id = auth.uid() or public.is_admin());
drop policy if exists profiles_self_update on public.profiles;
create policy profiles_self_update on public.profiles for update using (id = auth.uid() or public.is_admin());
drop policy if exists profiles_admin_all on public.profiles;
create policy profiles_admin_all on public.profiles for all using (public.is_admin()) with check (public.is_admin());

-- COURSES/MODULES/LESSONS: anyone signed in can read published content; staff/admin manage
drop policy if exists courses_read on public.courses;
create policy courses_read on public.courses for select using (status = 'published' or public.is_staff_or_admin());
drop policy if exists courses_write on public.courses;
create policy courses_write on public.courses for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());

drop policy if exists modules_read on public.modules;
create policy modules_read on public.modules for select using (true);
drop policy if exists modules_write on public.modules;
create policy modules_write on public.modules for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());

drop policy if exists lessons_read on public.lessons;
create policy lessons_read on public.lessons for select using (true);
drop policy if exists lessons_write on public.lessons;
create policy lessons_write on public.lessons for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());

drop policy if exists assessments_read on public.assessments;
create policy assessments_read on public.assessments for select using (true);
drop policy if exists assessments_write on public.assessments;
create policy assessments_write on public.assessments for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());

-- OWNER-SCOPED tables: user sees own rows; staff/admin see all
-- enrollments
drop policy if exists enroll_owner on public.enrollments;
create policy enroll_owner on public.enrollments for select using (user_id = auth.uid() or public.is_staff_or_admin());
drop policy if exists enroll_insert on public.enrollments;
create policy enroll_insert on public.enrollments for insert with check (user_id = auth.uid());
drop policy if exists enroll_admin on public.enrollments;
create policy enroll_admin on public.enrollments for update using (public.is_staff_or_admin());

-- lesson_progress
drop policy if exists progress_owner on public.lesson_progress;
create policy progress_owner on public.lesson_progress for all using (user_id = auth.uid() or public.is_staff_or_admin()) with check (user_id = auth.uid());

-- submissions
drop policy if exists sub_owner_read on public.submissions;
create policy sub_owner_read on public.submissions for select using (user_id = auth.uid() or public.is_staff_or_admin());
drop policy if exists sub_owner_insert on public.submissions;
create policy sub_owner_insert on public.submissions for insert with check (user_id = auth.uid());
drop policy if exists sub_staff_update on public.submissions;
create policy sub_staff_update on public.submissions for update using (public.is_staff_or_admin());

-- certificates
drop policy if exists cert_owner_read on public.certificates;
create policy cert_owner_read on public.certificates for select using (user_id = auth.uid() or public.is_staff_or_admin());
drop policy if exists cert_staff_write on public.certificates;
create policy cert_staff_write on public.certificates for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());

-- notifications
drop policy if exists notif_owner on public.notifications;
create policy notif_owner on public.notifications for all using (user_id = auth.uid() or public.is_staff_or_admin()) with check (user_id = auth.uid() or public.is_staff_or_admin());

-- help_messages: user creates + reads own; staff/admin read all
drop policy if exists help_insert on public.help_messages;
create policy help_insert on public.help_messages for insert with check (user_id = auth.uid());
drop policy if exists help_read on public.help_messages;
create policy help_read on public.help_messages for select using (user_id = auth.uid() or public.is_staff_or_admin());

-- ============================================================
-- STORAGE (create these buckets in Dashboard → Storage):
--   - "avatars"       (public)   profile photos
--   - "course-media"  (public)   thumbnails + lesson videos
--   - "certificates"  (private)  issued certificate files
-- Then add storage policies as needed. Left to the dashboard UI for now.
-- ============================================================
