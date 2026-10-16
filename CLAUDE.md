# Turquoise Institute — official homepage + paid-ads landing pages

Landing pages for Google/Meta ads for **Turquoise Institute** (Dr. Amir Soheil Tolebeyan,
interventional pain & headache specialist), 10 Union St., Suite 2D, Natick, MA 01760.
The single job of every page: turn an ad click into a booked consultation (form or call).

## Branches, hosting, domain

- Work on **`claude-code-rebuild`**. Do **not** push to `main` — `main` is the old Lovable
  build and syncs back into Lovable.
- Hosting: moving from **Vercel** to **Railway** (setup: `docs/RAILWAY.md`). The code runs on
  both: Railway uses Nitro's default Node server (`npm start`, `railway.json`); Vercel needs
  `NITRO_PRESET=vercel`. Whichever host is used must deploy branch `claude-code-rebuild`.
- On non-Vercel hosts the server gzips HTML itself (`compress()` in `src/server.ts`) and static
  assets are pre-compressed (`compressPublicAssets`); Vercel Analytics/Speed Insights are only
  included in Vercel builds (`__ON_VERCEL__`, defined in `vite.config.ts`).
- Domain: the home page is the clinic's **official homepage at the root**,
  `https://turquoiseinstitute.com/` (not a subdomain). Steps and the caveat about the current
  website: `docs/ROOT-DOMAIN.md`. `www.` 301-redirects to the root (`wwwRedirect` in `src/lib/seo.ts`).
  Never change MX/email DNS records.
- `SITE_URL` defaults to `https://turquoiseinstitute.com` (`VITE_SITE_URL` overrides). Any other
  host (previews, *.vercel.app, *.up.railway.app, localhost) gets `X-Robots-Tag: noindex` + a
  disallow-all robots.txt.
- Env vars: `GHL_API_TOKEN`, `GHL_LOCATION_ID`, optional `VITE_SITE_URL`, optional
  `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID`; on Vercel also `NITRO_PRESET=vercel`.
  `LEAD_PREVIEW=1` only on non-production previews.

## Stack

TanStack Start (React 19, SSR) + Tailwind v4 + Nitro. `npm run dev` (port 3000), `npm run build`.

- Copy for every page: `src/lib/condition-pages.ts` (`HOME_PAGE`, `CONDITION_PAGES`)
- Clinic facts, towns, reels, reviews: `src/lib/site.ts`
- Shared layout: `src/components/landing/PageBody.tsx`
- Lead → GoHighLevel: `src/lib/lead.functions.ts` (thin server-fn stub) → `src/lib/lead.server.ts`
  (zod validation + GHL calls; server-only). Google reviews: `src/lib/reviews.functions.ts`
- GTM container `GTM-TJ79BBT5` in `src/routes/__root.tsx`; events via `src/lib/track.ts`
- UTMs + gclid captured in `src/lib/utm.ts` and sent with each lead
- Vercel Web Analytics + Speed Insights in `__root.tsx` (Vercel builds only; enable in its dashboard)

## Pages (short URLs are canonical; old Lovable paths + misspellings redirect)

`/` home · `/migraine` · `/headache` · `/botox-migraine` · `/tmj` · `/nerve-blocks` · `/prp` ·
`/shoulder` · `/joint-pain` · `/neck-spasms` · `/thank-you` (noindex). Every service card on the
home page links to its own page (slug = page URL); a new service needs a `CONDITIONS` entry in
`site.ts` and a `CONDITION_PAGES` entry. Ad conversions fire on the `appointment_request`
dataLayer event (carries `event_id` for dedupe), not on the thank-you page view.
`/robots.txt` and `/sitemap.xml` are server routes (`src/routes/robots[.]txt.ts`, `sitemap[.]xml.ts`).
Setup steps for domain, Vercel, GHL and GTM: `docs/LAUNCH.md`.
Aliases live in `CONDITION_ALIASES` in `src/routes/$condition.tsx`.
No location in any page's H1 or hero (client rule for every page; the old `?town=` headline
swap was removed). Meta titles/descriptions may still name the area for local search.

## Page structure (keep this order — client brief Oct 16 2026)

Sticky header (logo + phone number, always visible) →
Hero → proof bar → **second fold**: services (home) / "Does this sound like you?" (ad-group
pages) → "Does this sound like you?" (home) / options (ad-group pages) → Meet the doctor (one
photo) → reviews → Instagram reels → Our clinic (facilities, one horizontal row) → Cash-pay explained → FAQ →
Locations + map → closing form (`#consultation`) → footer.

### Calls to action (client rules)

- First fold: exactly ONE booking button, "Book a Free 15-Minute Consultation" (`BookCta` in
  `src/components/landing/Booking.tsx`). It opens the booking **pop-up** (native `<dialog>`).
- The header phone number (`HeaderActions`) is visible at all times, first fold included, on
  every page and on mobile (client, Oct 16).
- After the first fold (hero CTA scrolled out of view), on every page and on mobile too:
  `StickyBookBar` shows a sticky "Book a Consultation" bar at the bottom of the screen
  (floating pill on desktop). It is hidden in the first fold. The footer has bottom padding so the bar never covers it.
- No other CTAs in sections: no section Book buttons. The only tel link in `main` is the
  phone number in the FAQ intro ("Before you book"; tracked as `phone_click`, location `faq`);
  otherwise phone links are only in the header, footer and the form error message.
- Every form heading: "Book a direct appointment with a doctor." (`FORM_HEADING`).

### Hero rules (client)

- Centred, single column: H1 (key phrase highlighted in brand teal), one sentence, short tick
  bullets (`heroPoints`; the cash-pay bullet comes first and is shown as a highlighted pill),
  the one CTA, then a plain-text "5.0 rating on Google" line.
- No copy may repeat within a fold (hero vs proof bar, bio vs credentials, heading vs reviews…).
- NO doctor photo/card in the hero (client: it duplicated the "Meet your doctor" section).
- Hero background photo (optional, `Hero.tsx`): a real, licensed photo at
  `src/assets/hero/hero.webp` (~1920×1080) and optional `hero-mobile.webp` (~800×1200) shows
  behind the hero under a soft overlay; no file = plain mint gradient. Not a doctor photo.
  Client asked for one (Oct 16) for trust; waiting on the photo (sandbox can't reach stock sites).
- Every page (home + 9 service pages): NO city/location in the H1 or hero; the cash-pay bullet
  first; credential wording is exactly "dual fellowship trained".
- Home page: H1 "Personalized Pain Management Specialist".
- Home page title, meta description, H1, hero and share image must NOT use "migraine", "jaw"
  or "joint" — use "pain management" wording. Services may name conditions below the fold.

### Services, reviews & videos (client decisions)

- Services: keep the list exactly as is (`SERVICES` in `Sections.tsx`). One horizontal row,
  NO auto-scroll, arrow buttons (a right arrow on phones). Each card shows a service photo
  when one exists at `src/assets/services/<slug>.webp` (16:10, ~800×500, real & licensed —
  client wants relatable treatment photos), photo only, no overlay (client removed the spine
  badge); without a photo the card shows the animated spine graphic (`PainMap.tsx`) instead.
  Each card links to its page and ends with "Learn more". Slugs: migraine,
  headache, botox-migraine, prp, tmj, nerve-blocks, neck-spasms, shoulder, joint-pain.
  All 9 photos were supplied by the client (Oct 16), who confirmed they may be used. Keep the
  set mixed (men and women), not only female patients; Botox, TMJ and joint-pain photos were
  swapped for male patients / a doctor's exam for that reason.
- Reviews: one horizontal row that auto-scrolls (`useAutoScroll`; pauses on mouse hover,
  touch, focus and while a review is open). Each shows 3 lines; "Read more" (only when cut off)
  expands it in place. Keep the "Read all reviews on Google" link. Instagram reviews: none
  supplied yet — add real ones only.
- Instagram reels stay: play icon invisible until hover/focus; a tap plays inline (no pop-up).
  The weather reel (`DaQ7Jkfvz58.webp`) uses a designed 720×1280 thumbnail (brand
  gradient, storm cloud, "Weather & migraines", Dr. Amir's real headshot) — its still was blurry.
  Reel order (client, Oct 16): PRP ("pain relief from your own blood"), "next migraine
  treatment isn't another pill", "Botox isn't just cosmetic", "what kind of headache", weather,
  then the rest (`REELS` order). The home page uses that order as is;
  service pages group reels by their `reelTopics`.
- Hero subheadline must not promise a visit length ("a full hour"); keep it generic. The
  60-minute first visit may still be mentioned below the hero.

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
  images `loading="lazy"`. The hero has no image, so the H1 text is the LCP element.
- Phones: `section-pad` is 2.5rem — keep mobile spacing tight (client: no empty spaces).
- Last measured (Lighthouse mobile, slow 4G, compressed): 82–86 performance, CLS 0, ~380 KB.

## Photos — real only, never AI-generated

- `src/assets/photos/dr-amir-headshot.jpg` — official headshot (primary doctor photo).
- Other photos and reel covers are stills from Dr. Amir's Instagram (`@dramir.pain.headachemd`).
  They are low resolution (360×640); replace with originals or Pixabay photos when someone can
  supply them (this sandbox can't reach Pixabay or Instagram).
  Avoid frames showing the "Align Spine Chiropractic" wall art or identifiable patients.

## Copy rules

- Talk to the patient's problem first, the clinic second; plain English; short sentences.
- No em dashes (—) in visible copy (client: reads as AI-written). Use a full stop, comma or colon.
- Headlines follow competitor/ad research: symptom question + who helps (no location).
- No outcome guarantees, invented stats, or unverified claims. Verified facts: board-certified;
  fellowships in Headache & Facial Pain and Interventional Pain (Yale & Dartmouth); former
  director, Headache & Facial Pain Program, Tufts Medical Center; 60-min first visits; same-day
  treatment often possible; telemedicine for appropriate patients; no referral needed;
  direct-pay / out-of-network (itemized receipt for reimbursement).
- Botox for migraine: FDA-approved for chronic migraine (15+ headache days/month), ~every 12 weeks.
- Google reviews: 5.0, 4 reviews. Show only real reviews, word for word (`GOOGLE_REVIEWS`).
- Meta ads policy: ad text must not assert a personal health condition ("Do you have migraines?");
  fine on the landing page.

## Locations (client list — use exactly these, in this order)

Natick, MA · Weston, MA · Wellesley, MA · Sudbury, MA · Wayland, MA · Newton, MA ·
Concord, MA · Lincoln, MA · Lexington, MA · Sherborn, MA (`LOCATIONS` in `site.ts`; also drives
`SERVICE_AREAS` and schema areaServed, radius 25 km). Framingham, Needham,
Dover and Ashland were removed at the client's request.

## Privacy (health data)

The dataLayer must never carry the form's `concern` or any name/email/phone — they go to
GoHighLevel only. Server logs don't print contact details either. No enhanced conversions /
advanced matching with form data.

## Lead form behaviour

Fields, in order, all required: **Full Name, Phone, Email** — nothing else. Button: "Request a
Free 15-Minute Appointment". Full Name is split into first/last for GoHighLevel; the page's
condition (`formConcern`) is still sent as context (tag), not as a field.
A conversion (`appointment_request` + redirect to `/thank-you`) fires **only** when GoHighLevel
accepted the lead; on failure the visitor is asked to call. Keep it that way.

## Open items

- Finish the Railway setup (`docs/RAILWAY.md`), move the domain from Vercel to Railway, retire Vercel.
- Point `turquoiseinstitute.com` + `www` at the host (`docs/ROOT-DOMAIN.md`) — first decide
  where the current website's pages (privacy, terms, payment policy, articles) will live.
- For one-tap inline video, get the reels as MP4 files (Instagram embeds need a second tap).
- Get high-resolution photos (originals or Pixabay) for the reel covers; Instagram reviews to add.
- Set up GA4 / Google Ads / Meta tags in GTM per `docs/LAUNCH.md`.
- Confirm with clinic: callback time, HSA/FSA/financing, whether Dr. Amir prescribes CGRP meds.
- Collect more Google reviews (only 4); consider a free intro-call offer (competitors use it).
- Replace Instagram stills with original high-res photos when available.
