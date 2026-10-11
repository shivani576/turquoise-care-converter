# Turquoise Institute — paid-ads landing pages

Landing pages for Google/Meta ads for **Turquoise Institute** (Dr. Amir Soheil Tolebeyan,
interventional pain & headache specialist), 10 Union St., Suite 2D, Natick, MA 01760.
The single job of every page: turn an ad click into a booked consultation (form or call).

## Branches, hosting, domain

- Work on **`claude-code-rebuild`**. Do **not** push to `main` — `main` is the old Lovable
  build and syncs back into Lovable.
- Hosted on **Vercel** (project `turquoise-care-converter`). Every push to
  `claude-code-rebuild` deploys automatically; Production Branch must be `claude-code-rebuild`.
- Planned domain: `care.turquoiseinstitute.com` (CNAME `care` → value shown in Vercel → Domains).
  Never switch the domain's nameservers to Vercel — it would break the main site and email.
- `SITE_URL` defaults to `https://care.turquoiseinstitute.com` (`VITE_SITE_URL` overrides). Any other
  host (previews, *.vercel.app, localhost) gets `X-Robots-Tag: noindex` + a disallow-all robots.txt.
- Vercel env vars: `NITRO_PRESET=vercel`, `GHL_API_TOKEN`, `GHL_LOCATION_ID`, optional `VITE_SITE_URL`,
  optional `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID`. `LEAD_PREVIEW=1` only on previews.

## Stack

TanStack Start (React 19, SSR) + Tailwind v4 + Nitro. `npm run dev` (port 3000), `npm run build`.

- Copy for every page: `src/lib/condition-pages.ts` (`HOME_PAGE`, `CONDITION_PAGES`)
- Clinic facts, towns, reels, reviews: `src/lib/site.ts`
- Shared layout: `src/components/landing/PageBody.tsx`
- Lead → GoHighLevel: `src/lib/lead.functions.ts` (thin server-fn stub) → `src/lib/lead.server.ts`
  (zod validation + GHL calls; server-only). Google reviews: `src/lib/reviews.functions.ts`
- GTM container `GTM-TJ79BBT5` in `src/routes/__root.tsx`; events via `src/lib/track.ts`
- UTMs + gclid captured in `src/lib/utm.ts` and sent with each lead
- Vercel Web Analytics + Speed Insights components in `__root.tsx` (enable in the Vercel dashboard)

## Pages (short URLs are canonical; old Lovable paths + misspellings redirect)

`/` home · `/migraine` · `/botox-migraine` · `/tmj` · `/prp` · `/shoulder` · `/joint-pain` ·
`/neck-spasms` · `/thank-you` (noindex). Ad conversions fire on the `appointment_request`
dataLayer event (carries `event_id` for dedupe), not on the thank-you page view.
`/robots.txt` and `/sitemap.xml` are server routes (`src/routes/robots[.]txt.ts`, `sitemap[.]xml.ts`).
Setup steps for domain, Vercel, GHL and GTM: `docs/LAUNCH.md`.
Aliases live in `CONDITION_ALIASES` in `src/routes/$condition.tsx`.
Ads may append `?town=<town>` (e.g. `/migraine?town=wellesley`): the hero headline's
"in Natick" becomes "near Wellesley". Allowed towns = `TOWN_PARAM` in `site.ts`.

## Page structure (keep this order)

Header (logo, mint phone pill, teal "Schedule Now"; no nav menu) → Hero → proof bar →
"Does this sound like you?" → options (or condition picker on home) + "Why see a specialist?"
→ Meet the doctor → Google reviews → Instagram reels → What happens next → Cost & insurance →
FAQ (+ auto "near Wellesley or Framingham" FAQ) → "Near you" local section + map →
closing section with the **only form** (`#consultation`) → footer, sticky mobile Call/Book bar.

### Hero rules (decided with the client — don't re-add removed items)

- Only: H1 (key phrase highlighted in brand teal), ONE short sentence, two buttons
  (page-specific `ctaLabel` + call), one address line naming nearby towns.
- Right side: "You'll meet" card with Dr. Amir's headshot, name, title, Yale & Dartmouth, 5.0 on Google.
- NO eyebrow line above the H1, NO tick/bullet list, NO form in the hero.

## Brand (must match turquoiseinstitute.com)

- Colours: teal `#46B698` (highlights, icons), mint `#C7ECE2`/`#CFECE4`, heading grey `#54595F`.
- Fonts: **Alata** headings, **Doppio One** buttons/labels, **Roboto** body, Sofadi One script accent.
- Buttons: 15px radius, Doppio One, white text on the `cta` teal `#32816C` (the brand teal
  darkened just enough to pass WCAG AA, 4.67:1; white on `#46B698` is only 2.5:1 — don't
  revert). Phone button = mint with grey text. Token: `--cta` in `src/styles.css`.

## Speed (keep it this way)

- Fonts are self-hosted via `@fontsource/*` imports in `src/styles.css` (latin subset) and the
  above-the-fold ones are preloaded in `__root.tsx`. Don't re-add Google Fonts links.
- Server-only logic goes in `*.server.ts`, called from inside a server fn handler, so it never
  ships to the browser (that's what keeps zod out of the client bundle).
- Images: WebP, sized ~2× display size (logo 244×112, headshot 682×1024). Below-the-fold
  images `loading="lazy"`; the hero headshot is `fetchPriority="high"`.
- Last measured (Lighthouse mobile, slow 4G, compressed): 82–86 performance, CLS 0, ~380 KB.

## Photos — real only, never AI-generated

- `src/assets/photos/dr-amir-headshot.jpg` — official headshot (primary doctor photo).
- Other photos and reel covers are stills from Dr. Amir's Instagram (`@dramir.pain.headachemd`).
  Avoid frames showing the "Align Spine Chiropractic" wall art or identifiable patients.

## Copy rules

- Talk to the patient's problem first, the clinic second; plain English; short sentences.
- Headlines follow competitor/ad research: symptom question + who helps + "in Natick".
- No outcome guarantees, invented stats, or unverified claims. Verified facts: board-certified;
  fellowships in Headache & Facial Pain and Interventional Pain (Yale & Dartmouth); former
  director, Headache & Facial Pain Program, Tufts Medical Center; 60-min first visits; same-day
  treatment often possible; telemedicine for appropriate patients; no referral needed;
  direct-pay / out-of-network (itemized receipt for reimbursement).
- Botox for migraine: FDA-approved for chronic migraine (15+ headache days/month), ~every 12 weeks.
- Google reviews: 5.0, 4 reviews. Show only real reviews, word for word (`GOOGLE_REVIEWS`).
- Meta ads policy: ad text must not assert a personal health condition ("Do you have migraines?");
  fine on the landing page.

## Local targeting (ads radius ≈10 km around the clinic)

Towns: Natick, Wellesley, Framingham, Needham, Sherborn, Dover, Wayland, Weston, Ashland;
villages: South Natick, Wellesley Hills, Saxonville, Cochituate. These appear in titles,
descriptions, the hero address line, "Near you" section, FAQ and schema (GeoCircle 10 km).
Don't add towns beyond ~10 km (Newton, Sudbury, Lexington, Concord were removed on purpose).

## Privacy (health data)

The dataLayer must never carry the form's `concern` or any name/email/phone — they go to
GoHighLevel only. Server logs don't print contact details either. No enhanced conversions /
advanced matching with form data.

## Lead form behaviour

Fields: first/last name, phone, email, concern (pre-selected per page), optional best time to call.
A conversion (`appointment_request` + redirect to `/thank-you`) fires **only** when GoHighLevel
accepted the lead; on failure the visitor is asked to call. Keep it that way.

## Open items

- Vercel Production must track `claude-code-rebuild` (it tracked `main` = old Lovable build).
- Connect `care.turquoiseinstitute.com` (CNAME) and redirect the *.vercel.app domain to it.
- Set up GA4 / Google Ads / Meta tags in GTM per `docs/LAUNCH.md`.
- Confirm with clinic: callback time, HSA/FSA/financing, whether Dr. Amir prescribes CGRP meds.
- Collect more Google reviews (only 4); consider a free intro-call offer (competitors use it).
- Replace Instagram stills with original high-res photos when available.
