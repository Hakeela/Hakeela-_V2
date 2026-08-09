# HakPortal — Supabase setup

Supabase is the single backend: **database + auth + storage**. The React app
(hosted on Vercel) talks to it directly with `@supabase/supabase-js`.

Until keys are added the app runs in **demo mode** (any login works, nothing is
persisted). Add the keys below to switch to the real backend.

## 1. Create the project
1. Go to <https://supabase.com> → **New project**. Pick a name, a strong DB
   password (save it), and the region closest to your users.
2. Wait for it to finish provisioning (~2 min).

## 2. Run the schema
1. Dashboard → **SQL Editor** → **New query**.
2. Paste the contents of [`supabase/schema.sql`](supabase/schema.sql) and **Run**.
   This creates all tables, the "create a profile on signup" trigger, and the
   Row-Level-Security policies.

## 3. Configure Auth
- Dashboard → **Authentication → Providers → Email**: keep **Email** enabled.
- **For quick testing**, Authentication → **Sign In / Providers** → turn *off*
  "Confirm email" so new signups can log in immediately. Turn it back on for
  production.
- **Password reset by OTP code**: Authentication → **Email Templates → Reset
  Password**, make sure the template includes the code token `{{ .Token }}`
  (the reset screen asks for a 6-digit code). If you'd rather use reset *links*,
  tell me and I'll switch the reset screen to link-based.
- Authentication → **URL Configuration**: set **Site URL** to your Vercel URL
  (and `http://localhost:5174` for local dev) so email links redirect correctly.

## 4. Create storage buckets
Dashboard → **Storage → New bucket**:
- `avatars` — public
- `course-media` — public
- `certificates` — private

## 5. Add the keys
Dashboard → **Project Settings → API**. Copy:
- **Project URL** → `VITE_SUPABASE_URL`
- **anon public** key → `VITE_SUPABASE_ANON_KEY`

**Local:** create `frontend/.env.local` (copy from `frontend/.env.example`) and
paste both values. Restart `npm run dev`.

**Vercel:** Project → **Settings → Environment Variables**, add the same two
variables, then redeploy.

> The anon key is a public client key — safe in the browser, protected by the
> RLS policies from step 2. Do **not** put the `service_role` secret key in the
> frontend.

## 5b. Deploy on Vercel
Supabase hosts the backend; the React app is hosted on Vercel, in the **same
Vercel project as the marketing site** — `hakPortal` is just another branch, so
it deploys as a **preview** deployment (the `main` branch stays production).

- The Vercel project's **Root Directory is the repo root** (shared by all
  branches), and the root-level **`vercel.json`** on this branch builds the
  `frontend/` subfolder:
  `installCommand`/`buildCommand` use `--prefix frontend`, `outputDirectory` is
  `frontend/dist`, plus an SPA rewrite so `/dashboard`, `/admin/*` don't 404.
  (This mirrors `main`'s `vercel.json` — do not set Root Directory to `frontend`
  for this shared project, or `main` will break.)
- **Env vars:** add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under the
  project's Settings → Environment Variables (same values as `.env.local`), then
  redeploy. Without them the app runs in demo mode.
- **Opening the branch build:** the `hakPortal` branch has its own preview URL —
  Deployments → the latest `hakPortal` build → *Visit* (looks like
  `…-git-hakportal-<team>.vercel.app`). The bare production domain still serves
  `main`.
- Put that preview URL into Supabase → Auth → **URL Configuration** (Site URL /
  Redirect URLs) so auth email links resolve.

## 6. Make yourself an admin
After you sign up once, run this in the SQL Editor (use your email):
```sql
update public.profiles set role = 'admin'
where id = (select id from auth.users where email = 'you@example.com');
```

## What's wired so far
- **Auth:** signup, login, logout, session persistence, password reset (email →
  OTP → new password), and a route guard on `/dashboard`.
- **Profiles:** created automatically on signup from the signup form fields.
- Dashboard data (courses, enrollments, progress, certificates, notifications,
  help messages) has tables + RLS ready; wiring each page to live data is the
  next step.
