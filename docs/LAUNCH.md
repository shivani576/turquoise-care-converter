# Launch checklist — turquoiseinstitute.com

> **Moving to Railway?** Follow `docs/RAILWAY.md` for hosting, variables, the share link and
> the domain. Sections 1–4 and 7 below are the Vercel equivalents; sections 5 (GoHighLevel),
> 6 (GTM) and 8 (final checks) apply to either host.

Everything the code needs is already in place. The steps below are settings in Vercel,
the DNS provider, GoHighLevel and Google Tag Manager. Do them in this order.

## 1. Production branch (do this first)

Vercel → project → **Settings → Environments → Production → Branch Tracking** must be
**`claude-code-rebuild`**. If it says `main`, the production URL and the custom domain serve
the **old Lovable build**. Change it, then **Deployments → latest `claude-code-rebuild`
deployment → ⋯ → Promote to Production** (or push any commit).

## 2. Share a review link before the domain is live

- Send the **production** address: `https://turquoise-care-converter.vercel.app` (Settings →
  Domains lists it). With Vercel's default "Standard Protection", production URLs are public
  but **preview** URLs (`…-git-…vercel.app`) require a Vercel login — a reviewer without a
  Vercel account would see a login screen.
- To share a preview URL instead: open the deployment → **Share** (creates a link that bypasses
  protection), or Settings → **Deployment Protection** → Vercel Authentication → off.
- These addresses are kept out of Google automatically (see below), and the form works there
  once the GHL variables are set for that environment.
- Analytics: set the GTM conversion triggers to the live hostname (section 5) so reviewers'
  clicks and test leads don't count as ad conversions.

## 3. Domain

The site goes live at the **root**, `https://turquoiseinstitute.com/` (it is the clinic's official
homepage). Follow `docs/ROOT-DOMAIN.md` — it covers the current website, the DNS records for
Railway or Vercel, and email safety.

What the code already does with the domain:

- Canonical links, `og:url`, schema and `sitemap.xml` use `https://turquoiseinstitute.com`
  (override with `VITE_SITE_URL` if the domain ever changes, then redeploy).
- Any other host — preview deployments, `*.vercel.app`, localhost — is sent with
  `X-Robots-Tag: noindex` and gets a `robots.txt` that disallows crawling, so Google never
  indexes a duplicate copy.
- Old Lovable paths (`/botox-for-migraine`, `/migraine-treatment`, …) and misspellings
  301-redirect to the short URLs, so existing ads and links keep working.

## 4. Vercel environment variables

Settings → Environment Variables.

| Name                                       | Production | Preview  | Notes                                                 |
| ------------------------------------------ | :--------: | :------: | ----------------------------------------------------- |
| `NITRO_PRESET`                             |  `vercel`  | `vercel` |                                                       |
| `GHL_API_TOKEN`                            |     ✔      |  ✔ or —  | Private Integration token (see below)                 |
| `GHL_LOCATION_ID`                          |     ✔      |  ✔ or —  | Sub-account (location) ID                             |
| `VITE_SITE_URL`                            |  optional  |    —     | Leave unset (defaults to `turquoiseinstitute.com`)    |
| `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID` |  optional  | optional | Live Google rating + reviews; saved reviews otherwise |
| `LEAD_PREVIEW`                             | **never**  |   `1`    | Lets the form finish on previews without a CRM        |

Redeploy after changing variables (Deployments → ⋯ → Redeploy).

## 5. GoHighLevel

1. **Location ID** — Settings → Business Profile (also in the URL: `/location/<ID>/`).
2. **Token** — Settings → Private Integrations → Create. Scopes:
   - `contacts.write`, `contacts.readonly` — create/update the contact
   - `locations/customFields.readonly` — map campaign data to custom fields
3. **Custom fields (optional, recommended)** — text fields named `utm_source`, `utm_medium`,
   `utm_campaign`, `utm_term`, `utm_content`, `gclid`, `landing_page`, `referrer`.
   Fields that exist are filled; anything missing is saved as a tag instead.
4. **Workflow** — trigger **Contact Tag Added → `form-submitted`** → notify staff / start
   the follow-up. The tag is removed and re-added on repeat submissions, so it fires every time.

Every lead also gets the tags `website-lead`, `landing-page`, `submitted: <date>`,
`interest: <concern>`, `page: <path>` and (if chosen) `preferred: <time>`.

**Test:** submit the form once on the live domain with a test name. Expect the thank-you
page, a contact in GHL with the tags above, and the workflow to run. If the CRM rejects the
lead, the visitor is asked to call instead, no conversion fires, and Vercel → Logs shows
`submitLead: … failed (<status>)`.

## 6. Google Tag Manager (container `GTM-TJ79BBT5`)

The container is already loaded on every page. The site pushes these events to
`window.dataLayer`:

| Event                                                                                  | When                                                                          | Extra keys                        |
| -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | --------------------------------- |
| `appointment_request`                                                                  | **Lead accepted by GoHighLevel** (just before `/thank-you`)                   | `event_id`, `form`, `location`    |
| `form_start`                                                                           | First focus in a form (`modal-hero`, `modal-sticky`, `final`, …)              | `form`, `location`                |
| `form_submit`                                                                          | Submit pressed (before the CRM answers)                                       | `form`, `location`                |
| `form_error`                                                                           | CRM rejected the lead; visitor asked to call                                  | `form`, `location`                |
| `phone_click`                                                                          | Phone links (header after the first fold, footer, form error, thank-you page) | `location`                        |
| `book_consultation_click`                                                              | A Book button opened the booking pop-up (`hero`, `sticky`)                    | `location`                        |
| `email_click`, `directions_click`, `review_click`, `reel_open`, `condition_card_click` | Secondary clicks                                                              | `location` / `reel` / `condition` |
| `scroll_depth`                                                                         | 25 / 50 / 75 / 100 % of the page                                              | `percent`                         |

### Variables (Variables → User-Defined → Data Layer Variable)

`DLV - event_id` (`event_id`), `DLV - location` (`location`), `DLV - percent` (`percent`).

### Triggers (Custom Event)

`CE - appointment_request`, `CE - phone_click`, `CE - form_start`, `CE - form_error`,
`CE - book_consultation_click` — event name exactly as in the table.

> Use the **`appointment_request` custom event** as the conversion trigger, **not** a page
> view of `/thank-you`. The page can be reloaded or opened directly; the event only fires
> once, when a real lead reached GoHighLevel.

> On every conversion trigger (`CE - appointment_request`, and `CE - phone_click` if used for
> Google Ads/Meta) set **"Some Custom Events" → Page Hostname equals
> `turquoiseinstitute.com`**. Then visits from the `vercel.app` review link, previews and
> local testing never count as ad conversions. GA4 can stay on all hosts (filter by hostname
> in reports), or use the same condition.

### Tags

1. **Google tag (GA4)** — your `G-…` measurement ID, trigger _Initialization – All Pages_.
   In GA4 → Admin → Data streams → Enhanced measurement, keep _Page changes based on browser
   history events_ on (the site navigates without full page loads).
2. **GA4 events**
   - `generate_lead` ← `CE - appointment_request` (parameter `transaction_id` = `{{DLV - event_id}}`)
   - `phone_click`, `form_start`, `form_error`, `book_consultation_click` ← matching triggers
     (parameter `location` = `{{DLV - location}}`)
   - In GA4 → Admin → Key events, mark `generate_lead` and `phone_click`.
3. **Conversion Linker** — trigger _All Pages_ (keeps the `gclid` for Google Ads).
4. **Google Ads Conversion Tracking** — Conversion ID `AW-…` + label for the "Lead form"
   conversion, **Transaction ID** = `{{DLV - event_id}}`, trigger `CE - appointment_request`.
   Optional second conversion "Click to call" on `CE - phone_click` (or use Google Ads call
   extensions / forwarding numbers for calls from ads).
5. **Meta Pixel** (if running Meta ads) — base code on _All Pages_; `fbq('track', 'Lead', {},
{eventID: {{DLV - event_id}}})` on `CE - appointment_request`; `Contact` on `CE - phone_click`.
   Meta limits which events health advertisers can optimise for — if Events Manager flags a
   restriction, optimise for the events it still allows.

### Health-data privacy (important)

By design the dataLayer never contains the condition picked in the form, or the visitor's
name, email or phone — only event names, `event_id`, `form`, `location` and similar click
details. The condition and contact details go to GoHighLevel only. Keep it that way: don't
add Google Ads enhanced conversions or Meta advanced matching with form data, since that
would share a visitor's health interest with an ad network. (The page URL, e.g.
`/botox-migraine`, is still visible to tags, as on any landing page.)

### Test before publishing the container

GTM → **Preview**, open `https://turquoiseinstitute.com/botox-migraine?utm_source=test&gclid=test`,
then check:

- Google tag + Conversion Linker fire on page load.
- Tapping a phone link fires `phone_click`.
- A test form submission fires `appointment_request` once (with an `event_id`) and the
  Google Ads / Meta Lead tags fire on it — not on `form_submit`.
- The test contact appears in GHL with `utm_source: test` / `gclid` filled in.

Then **Submit → Publish** the container and delete the test contact in GHL.

## 7. Vercel Web Analytics + Speed Insights

Already in the code (`<Analytics />`, `<SpeedInsights />` in `src/routes/__root.tsx`). Turn
them on once: Vercel → project → **Analytics** tab → **Enable**, and **Speed Insights** tab →
**Enable**, then redeploy. Both are cookieless and collect no personal data, so no consent
banner change is needed for them. The Hobby plan includes a limited monthly quota; see the
tabs for current limits. Until enabled, the browser console shows a harmless 404 for
`/_vercel/insights/script.js`.

Speed Insights reports real visitors' Core Web Vitals (LCP, INP, CLS) per page — check it
after the first week of ads.

## 8. Final checks on the live domain

- `https://turquoiseinstitute.com/robots.txt` lists the sitemap;
  `/sitemap.xml` lists the 8 pages.
- The `*.vercel.app` address redirects to the domain.
- Share a page link in a message: the preview shows the share image (`/og-image.jpg`).
- Google Search Console → add `turquoiseinstitute.com` → submit the sitemap.
