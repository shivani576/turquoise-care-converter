/**
 * Captures ad-campaign attribution (UTMs + gclid) from the landing URL on first
 * load and keeps it for the whole session, so a submission made after the
 * visitor browses to another page still carries the original campaign data.
 */
export interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  landing_page?: string;
  referrer?: string;
}

const KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
] as const;

const STORAGE_KEY = "ti_attribution";

export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const fresh: Attribution = {};
    for (const key of KEYS) {
      const value = params.get(key);
      if (value) fresh[key] = value.slice(0, 200);
    }
    const stored = readStored();
    // Only overwrite when this visit actually carries campaign params.
    if (Object.keys(fresh).length === 0 && stored) return;
    const next: Attribution = { ...stored, ...fresh };
    next.landing_page = stored?.landing_page ?? window.location.href.slice(0, 500);
    const referrer = stored?.referrer ?? document.referrer;
    if (referrer) next.referrer = referrer;
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // sessionStorage can be unavailable (private mode) — attribution is optional.
  }
}

export function getAttribution(): Attribution {
  return readStored() ?? {};
}

function readStored(): Attribution | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : undefined;
  } catch {
    return undefined;
  }
}
