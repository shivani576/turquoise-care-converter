# Turquoise Institute — ad landing pages

Standalone rebuild of the Lovable landing page (no Lovable dependencies).
TanStack Start + React + Tailwind, server functions for the lead form and Google reviews.

## Pages
- `/` — home page for brand / general ads, with a "What brings you in?" picker
- `/migraine-treatment`, `/botox-for-migraine`, `/tmj-disorder`, `/prp-injections`,
  `/shoulder-pain`, `/joint-pain-osteoarthritis`, `/botulinum-toxin-spasticity` — one page per ad group
- `/thank-you` — fire the Google Ads / Meta conversion on this page view in GTM (GTM-TJ79BBT5)

All page copy lives in `src/lib/condition-pages.ts`; clinic facts, reels and reviews in `src/lib/site.ts`.

## Run
```
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Environment variables (set in Vercel/Netlify, never commit)
| Name | Purpose |
|---|---|
| `GHL_API_TOKEN`, `GHL_LOCATION_ID` | Send leads to GoHighLevel |
| `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID` | Optional: live Google rating + reviews (falls back to the saved real reviews) |
| `VITE_SITE_URL` | Final domain, for canonical links |
| `LEAD_PREVIEW=1` | Preview deployments only: lets the form complete without a CRM |
| `NITRO_PRESET` | `vercel` or `netlify` on the host |

## Notes
- The form only counts a conversion and goes to `/thank-you` when the lead actually reached GoHighLevel. If the CRM fails, the visitor is asked to call instead, so no lead is silently lost.
- Photos are real frames from Dr. Amir's Instagram videos (`src/assets/photos`, `src/assets/reels`). Swap in original high-resolution photos when available.
- Reels open the Instagram player only when tapped, so the page stays fast.
