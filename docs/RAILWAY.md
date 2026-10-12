# Hosting on Railway

The site is a standard Node server (`npm run build` → `npm start`), so Railway runs it with
no extra setup. `railway.json` in the repo already sets the build/start commands, a health
check (`/robots.txt`) and restart-on-failure. Node 22 comes from `engines` in `package.json`.

What the code does differently on Railway vs. Vercel (automatic, nothing to configure):

- Pages are gzip-compressed by the server; JS/CSS/fonts are served pre-compressed (brotli/gzip)
  with 1-year caching.
- Vercel Web Analytics / Speed Insights are left out (they only work on Vercel). Use GA4 via
  GTM for traffic and Google Search Console → Core Web Vitals for real-user speed.
- `*.up.railway.app` addresses get `noindex`, like previews did on Vercel.

## 1. Create the service

1. Sign in at **railway.com** with GitHub.
2. **New Project → Deploy from GitHub repo** → pick `shivani576/turquoise-care-converter`.
   (If it isn't listed, click **Configure GitHub App** and give Railway access to the repo.)
3. Open the new service → **Settings → Source → Branch** → choose **`claude-code-rebuild`**.
   Every push to that branch now redeploys. Never use `main` (old Lovable build).
4. **Settings → Deploy → Region**: pick a US East region (closest to Natick).

## 2. Variables

Service → **Variables** → **New Variable** (or **Raw Editor** to paste several):

| Name                                       | Value                                                             |
| ------------------------------------------ | ----------------------------------------------------------------- |
| `GHL_API_TOKEN`                            | GoHighLevel Private Integration token                             |
| `GHL_LOCATION_ID`                          | GoHighLevel Location ID                                           |
| `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID` | optional — live Google reviews                                    |
| `VITE_SITE_URL`                            | optional — only if the domain isn't `care.turquoiseinstitute.com` |

Do **not** set `NITRO_PRESET` (that's Vercel-only) or `LEAD_PREVIEW`. Railway sets `PORT` itself.
Saving variables triggers a redeploy.

## 3. A shareable link

Service → **Settings → Networking → Generate Domain**. You get
`https://<name>.up.railway.app` — public, no login needed, hidden from Google. Share that for
review. In GTM, conversion triggers are limited to `care.turquoiseinstitute.com`
(`docs/LAUNCH.md` §6), so reviewers' clicks and test leads don't count as ad conversions.

## 4. Test one lead

Open `https://<name>.up.railway.app/botox-migraine?utm_source=test`, submit the form with a
test name. Thank-you page = working; check the contact in GoHighLevel, then delete it.
If you get "please call us": service → **Deployments → View logs**, search `submitLead`:

- `not configured` → a variable is missing
- `failed (401)` → wrong token / agency-level token
- `failed (403)` → a scope is missing on the Private Integration

## 5. Custom domain

1. **Vercel first:** if `care.turquoiseinstitute.com` is still added in Vercel, remove it there
   (Vercel → Settings → Domains → Remove). A domain can only point to one host.
2. Railway service → **Settings → Networking → Custom Domain** → `care.turquoiseinstitute.com`.
3. Railway shows a **CNAME** target (and sometimes a TXT verification record). Add exactly
   those at the DNS provider for `turquoiseinstitute.com`. Don't change nameservers.
4. Wait until Railway shows the domain as active (HTTPS is issued automatically).

## 6. Retire Vercel

After the Railway domain works: Vercel → project → **Settings → Git → Disconnect** (stops
builds) or delete the project. The code still builds for Vercel if you ever go back
(`NITRO_PRESET=vercel`).

## Cost

Railway has no permanent free tier for a site that's always on; the Hobby plan has a small
monthly fee with usage included, and commercial use is allowed. A landing page like this uses
very little. Check railway.com/pricing for current numbers.
