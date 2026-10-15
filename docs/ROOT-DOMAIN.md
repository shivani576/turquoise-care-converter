# Going live at the domain root — turquoiseinstitute.com

This app is now the clinic's official homepage. It is built to live at
**https://turquoiseinstitute.com/** (not a subdomain):

- Canonical links, `og:url`, schema and `sitemap.xml` use `https://turquoiseinstitute.com`
  (`SITE_URL` in `src/lib/site.ts`; `VITE_SITE_URL` overrides it — leave it **unset**).
- `www.turquoiseinstitute.com/...` is 301-redirected to `turquoiseinstitute.com/...` by the app.
- Any other host (`*.up.railway.app`, `*.vercel.app`, previews) stays `noindex`.

Live URLs once DNS points here: `https://turquoiseinstitute.com/` (home) and
`/migraine`, `/botox-migraine`, `/tmj`, `/prp`, `/shoulder`, `/joint-pain`, `/neck-spasms`,
`/thank-you`.

## ⚠️ Before switching DNS: the current website

`turquoiseinstitute.com` currently serves the clinic's existing website. Pointing the root
domain at this app **replaces that whole site**. Pages this app links to on the current site
would then 404:

- `/privacy-policy/`, `/terms-and-conditions/`, `/insurance-and-payment-policy/` (form, footer,
  cash-pay section)
- the condition articles under `/conditions/...` and any other pages that get search traffic

Pick one before the switch:

1. **Keep the old site on a subdomain** (e.g. `info.turquoiseinstitute.com`): move it there in
   the current host, then update the URLs in `src/lib/site.ts` (`privacyUrl`, `termsUrl`,
   `insuranceUrl`, `website`) and add redirects for its popular pages. Or
2. **Move those pages into this app** (privacy, terms, payment policy as new routes), and
   301-redirect the old URLs.

Email is not affected as long as only the records below change — don't touch MX, SPF/DKIM
(TXT) or other existing records.

## Railway (current host)

1. Railway → service → **Settings → Networking → Custom Domain** → add
   `turquoiseinstitute.com`, then add `www.turquoiseinstitute.com`.
2. Railway shows a **CNAME target** for each (and possibly a TXT verification record).
3. At the DNS provider:
   - `www` → **CNAME** to the target Railway shows.
   - root (`@`) → the root can't use a plain CNAME. Use your provider's **ALIAS / ANAME /
     CNAME-flattening** record pointing at Railway's target (Cloudflare, DNSimple, Namecheap
     and others support this). If your provider has none, move the domain's DNS to one that
     does (e.g. Cloudflare — copy every existing record, especially MX, first).
   - Remove the old `@` A record(s) and old `www` record that point at the current website.
4. Wait until Railway shows both domains as active (HTTPS is issued automatically).

### Vercel instead

Settings → Domains → add `turquoiseinstitute.com` and `www.turquoiseinstitute.com`. DNS: root
`@` → **A** `76.76.21.21`; `www` → **CNAME** `cname.vercel-dns.com` (use the exact values
Vercel shows). Production branch must be `claude-code-rebuild`.

## After the switch

- Open `https://turquoiseinstitute.com/robots.txt` — it should list the sitemap.
- Google Search Console → add the domain property → submit
  `https://turquoiseinstitute.com/sitemap.xml`.
- In GTM, conversion triggers filter on Page Hostname `turquoiseinstitute.com`
  (`docs/LAUNCH.md` §6).
- Submit one test lead and check it arrives in GoHighLevel.
