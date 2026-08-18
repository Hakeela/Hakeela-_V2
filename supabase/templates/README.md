# HakPortal — Auth email templates

Branded, email-client-safe HTML for Supabase Auth. Supabase does not read these
files automatically — paste each one into **Supabase Dashboard → Authentication →
Email Templates**, pick the matching template, and set the suggested subject line.

| File | Dashboard template | Suggested subject | Variables |
|------|--------------------|-------------------|-----------|
| `confirm-signup.html` | Confirm signup | Confirm your HakPortal account | `{{ .ConfirmationURL }}`, `{{ .Token }}` |
| `invite.html` | Invite user | You've been invited to HakPortal | `{{ .ConfirmationURL }}` |
| `magic-link.html` | Magic Link | Your HakPortal sign-in link | `{{ .ConfirmationURL }}`, `{{ .Token }}` |
| `change-email.html` | Change Email Address | Confirm your new email address | `{{ .ConfirmationURL }}`, `{{ .Email }}`, `{{ .NewEmail }}` |
| `reset-password.html` | Reset Password | Reset your HakPortal password | `{{ .Token }}`, `{{ .ConfirmationURL }}` |
| `reauthentication.html` | Reauthentication | Confirm it's you — HakPortal | `{{ .Token }}` |

## Notes

- **Reset Password** uses the OTP **code** (`{{ .Token }}`) because the app resets
  by code (email → OTP → new password). Keep `{{ .Token }}` in that template.
- **Reauthentication** only ever has a code — Supabase does not provide a URL for it.
- The design is light-only (`color-scheme: light`), table-based, and inlined so it
  renders consistently across Gmail, Outlook, and Apple Mail. Max width 600px.
- The header uses a text wordmark ("HakPortal") to avoid broken remote images. To
  use the logo image instead, replace the wordmark `<span>` with:
  `<img src="https://hakportal.hakeela.org/logo-hakportal.png" alt="HakPortal" height="40" />`
- Confirm your **Site URL** and **Redirect URLs** under Authentication → URL
  Configuration so the `{{ .ConfirmationURL }}` links resolve correctly.
