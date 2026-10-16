# Turquoise Institute — ad landing pages

Standalone rebuild of the Lovable landing page (no Lovable dependencies).
TanStack Start + React + Tailwind, server functions for the lead form and Google reviews.

## Pages

- `/` — the clinic's official homepage ("Personalized Pain Management Specialist"), served at the domain root
- `/migraine`, `/headache`, `/botox-migraine`, `/tmj`, `/nerve-blocks`, `/prp`, `/shoulder`, `/joint-pain`, `/neck-spasms`: one page per service / ad group (old long paths redirect)
- `/thank-you` — confirmation page (noindex). Ad conversions fire on the `appointment_request` dataLayer event in GTM (GTM-TJ79BBT5)
- `/robots.txt`, `/sitemap.xml` — generated per host; previews and `*.vercel.app` are never indexed

Hosting on Railway: [`docs/RAILWAY.md`](docs/RAILWAY.md). Going live at the root domain: [`docs/ROOT-DOMAIN.md`](docs/ROOT-DOMAIN.md). Domain, GoHighLevel and GTM setup: [`docs/LAUNCH.md`](docs/LAUNCH.md).

All page copy lives in `src/lib/condition-pages.ts`; clinic facts, reels and reviews in `src/lib/site.ts`.

## Run

```
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Environment variables (set in the host — Railway or Vercel — never commit)

| Name                                       | Purpose                                                                             |
| ------------------------------------------ | ----------------------------------------------------------------------------------- |
| `GHL_API_TOKEN`, `GHL_LOCATION_ID`         | Send leads to GoHighLevel                                                           |
| `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID` | Optional: live Google rating + reviews (falls back to the saved real reviews)       |
| `VITE_SITE_URL`                            | Optional: overrides the canonical domain (default `https://turquoiseinstitute.com`) |
| `LEAD_PREVIEW=1`                           | Preview deployments only: lets the form complete without a CRM                      |
| `NITRO_PRESET`                             | Vercel only: `vercel`. Leave unset on Railway (default Node server)                 |

## Notes

- The form only counts a conversion and goes to `/thank-you` when the lead actually reached GoHighLevel. If the CRM fails, the visitor is asked to call instead, so no lead is silently lost.
- Photos are real frames from Dr. Amir's Instagram videos (`src/assets/photos`, `src/assets/reels`). Swap in original high-resolution photos when available.
- Reels open the Instagram player only when tapped, so the page stays fast.
