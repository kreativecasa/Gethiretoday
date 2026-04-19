# Deploy — Pro upgrade modal + email-confirmation UX hardening

## 1. Ship the code

```bash
cd ~/Desktop/Gethiretoday && \
find .git -name "*.lock" -delete && \
git add \
  DEPLOY_NEXT.md \
  components/pro-upgrade-modal.tsx \
  "app/builder/resume/[id]/page.tsx" \
  "app/(auth)/signup/page.tsx" \
  "app/(auth)/login/page.tsx" && \
git commit -m "Pro paywall modal + explicit email-confirmation UX on signup/login" && \
git push origin main
```

> Still avoid `git add -A` — working tree still has untracked `reportly/`,
> `marketing/`, `MARKETING_PLAN.md` that shouldn't land.

## 2. Apply the permanent email-deliverability fix in Supabase

**This is the single most important change for user acquisition. Do this today.**

Supabase's default email service has very poor deliverability — especially to Hotmail, Outlook, and Yahoo. Every Hotmail signup is currently at risk of the confirmation email silently dropping into spam or being rejected outright. Hook up Resend (you already have a Resend API key in Vercel env vars) as Supabase's SMTP provider.

### Step-by-step

1. **Verify your domain in Resend** (required for professional sender address):
   - Open https://resend.com/domains → **Add Domain** → `gethiretoday.com`
   - Resend gives you a set of DNS records (SPF, DKIM, MX). Add each to your domain registrar (wherever gethiretoday.com is hosted — Cloudflare, GoDaddy, Namecheap, etc.). Takes ~10 minutes.
   - Come back to Resend and click **Verify** — all records should show ✓.

2. **Open Supabase → your project → Project Settings → Authentication → SMTP Settings**:
   - Toggle **Enable Custom SMTP**.
   - Fill in:

     | Field | Value |
     |---|---|
     | Sender email | `noreply@gethiretoday.com` |
     | Sender name | `GetHireToday` |
     | Host | `smtp.resend.com` |
     | Port | `465` |
     | Minimum interval | `60` seconds |
     | Username | `resend` |
     | Password | your Resend API key (starts with `re_...`) |

   - Click **Save**.

3. **Test it.** Open `gethiretoday.com/signup` in an incognito window and register with a throwaway Hotmail address. Confirmation should arrive within ~5 seconds, from `noreply@gethiretoday.com`, straight to the inbox (not spam) on Hotmail. If you see it there, you're done.

### While you're in the Supabase dashboard, fix the existing user

- **Auth → Users** → find `fahad-basil@hotmail.com` → click the ⋯ menu:
  - Click **Confirm user** to manually mark their email as verified (they can then log in normally)
  - Or **Send magic link** to send them a fresh sign-in link

## What the code ships

### New `components/pro-upgrade-modal.tsx`
Proper full-screen paywall modal with teal gradient header, $2/mo pricing, 4 benefits, trust strip, primary "Upgrade to Pro" CTA, and an escape-hatch "Use the free Classic template instead" button. Replaces the 4-second auto-dismissing amber pill.

### `app/builder/resume/[id]/page.tsx`
- New `proModal` state with `{ trigger: 'pdf' | 'word'; templateLabel? }` shape.
- `handleDownload` — triggers modal when free user selects a Pro template for PDF.
- `handleDownloadWord` — triggers modal when free user tries Word export.
- `handleTemplateChange` — closes modal (used by the "switch to free" button).
- Removed old inline pill + `proPrompt` state + `setTimeout(dismiss, 4000)`.

### `app/(auth)/signup/page.tsx` — "Check your inbox" flow
Previously: after `signUp()`, we redirected to `/dashboard` after 1.5s — but when Supabase email confirmation is enabled, `signUp()` returns no session, so the user silently bounced back to login with no explanation. That's what happened to `fahad-basil@hotmail.com`.

Now: we detect `data.user && !data.session` and show a clean **"Check your inbox"** state with:
- The user's email shown prominently (so they know exactly what to look for)
- "Can't find it?" tip list (check spam, look for `noreply@gethiretoday.com`, verify address is correct)
- **"Resend confirmation email"** button (client-side rate-limited to 60s to align with Supabase's own throttle)
- **"Use a different email"** escape → returns them to the signup form
- **"Already confirmed? Log in →"** link

Also added `emailRedirectTo: ${origin}/auth/callback` to the initial signup call so the confirmation link lands in the right place.

### `app/(auth)/login/page.tsx` — unconfirmed-email detection
When `signInWithPassword` fails with "Email not confirmed" (or variants of that error), we now show an inline amber card explaining the situation + a "Resend confirmation email" button, instead of surfacing the cryptic raw error. User always has a clear path forward.

## Files changed

```
components/pro-upgrade-modal.tsx  [NEW] Pro paywall dialog
app/builder/resume/[id]/page.tsx   Wire modal, remove old inline pill
app/(auth)/signup/page.tsx         "Check your inbox" state + resend button
app/(auth)/login/page.tsx          "Email not confirmed" handler + resend
```

## Net effect

- No user ever again ends up in the confusing state `fahad-basil@hotmail.com` was in.
- Signup failures have clear copy + a retry path.
- Login failures surface the specific "please confirm your email" case with a one-click resend.
- Once you apply the Resend SMTP config, confirmation emails actually arrive to Hotmail / Outlook / Yahoo in seconds.
