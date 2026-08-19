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

## 3b. Email sending — Resend SMTP, templates & deliverability
Supabase's built-in email sender is heavily rate-limited (a few messages/hour),
so HakPortal sends all auth emails (confirm signup, **invite staff**, magic link,
reset password, change email, reauthentication) through **Resend** via custom SMTP.

### Configure custom SMTP
Dashboard → **Authentication → Emails → SMTP Settings** → enable Custom SMTP:

| Field | Value |
|-------|-------|
| Sender email | `no-reply@hakeela.org` (must be on a Resend-verified domain) |
| Sender name | `HakPortal` |
| Host | `smtp.resend.com` |
| Port | `465` (or `587`) |
| Username | `resend` (the literal word — not your email) |
| Password | your Resend **API key** (`re_…`, with sending permission — raw key, no `Bearer`) |

Then raise Authentication → **Rate Limits → "Rate limit for sending emails"** as
needed (the default sender keeps it very low).

Resend notes:
- Verify the domain in Resend — **SPF + DKIM must show "Verified"**. You do **not**
  create a mailbox; Resend is send-only, so `no-reply@…` needn't exist as an inbox.
- The From domain must match the verified domain **exactly** (apex vs subdomain
  count as different domains).
- If the API key is ever exposed, rotate it in Resend and update the SMTP password.

### Install the branded email templates
Paste each file from [`supabase/templates/`](supabase/templates/) into
Authentication → **Email Templates** (that folder's `README.md` maps file →
template + subject line). Keep `{{ .Token }}` in the **Reset Password** template —
the reset screen uses the OTP code.

### Deliverability (inbox, not spam)
A brand-new sending domain lands in spam until it builds reputation:
- Add a **DMARC** record: TXT at host `_dmarc` →
  `v=DMARC1; p=none; rua=mailto:you@hakeela.org`.
- Keep only **one** SPF record on the domain (two silently break SPF).
- Mark early test emails **"Not Junk"** to train filters; placement improves with
  age/volume. iCloud & Gmail are strict — always check Junk when testing.

### Troubleshooting "no emails arriving"
1. **Test Resend directly** (isolates Supabase from Resend):
   ```bash
   curl -X POST 'https://api.resend.com/emails' \
     -H 'Authorization: Bearer re_YOUR_KEY' \
     -H 'Content-Type: application/json' \
     -d '{"from":"no-reply@hakeela.org","to":"you@example.com","subject":"test","html":"<p>ok</p>"}'
   ```
   `{"id":"..."}` + it arrives → Resend/domain/key are fine → the problem is the
   Supabase **SMTP config**.
2. Check **Resend → Emails/Logs** (Delivered / Bounced) and **Supabase → Logs →
   Auth logs** for SMTP errors (`535` = wrong username/password).
3. Signing up / inviting an **already-registered** email sends nothing
   (anti-enumeration) — always test with a fresh address.

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

## 5c. Deploy the admin-users Edge Function (staff invites + user deletion)
Inviting staff and deleting user accounts need the **service role**, so they run
in an Edge Function (not the browser). The function verifies the caller is an
admin before doing anything.

**Option A — dashboard (no CLI):** Supabase → **Edge Functions → Create function**,
name it exactly `admin-users`, paste the contents of
[`supabase/functions/admin-users/index.ts`](supabase/functions/admin-users/index.ts),
and **Deploy**. Keep "Verify JWT" on.

**Option B — CLI:**
```bash
# one-time (Homebrew — global npm install is no longer supported)
brew install supabase/tap/supabase
supabase login
supabase link --project-ref <your-project-ref>

# deploy (run from the repo root, where the supabase/ folder lives)
supabase functions deploy admin-users
```
`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are injected automatically — no
secrets to set. The function name must be `admin-users` (the app calls it by that
slug). Once deployed:
- **Staff → Invite** sends a real invite email and promotes the new user to the
  chosen role.
- **Learners → Delete** permanently removes the account.

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
