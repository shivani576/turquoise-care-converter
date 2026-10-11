import { useSearch } from "@tanstack/react-router";
import { TOWN_PARAM } from "@/lib/site";

/**
 * Reads ?town= from the landing URL (e.g. /migraine?town=wellesley) so ads
 * targeting one town can show that town on the page. Only towns in
 * TOWN_PARAM are accepted; anything else is ignored. Read through the router
 * so the server already renders the right headline (no flash on load).
 */
export function useTown(): string | undefined {
  const raw = useSearch({ strict: false, select: (s) => (s as { town?: unknown }).town });
  if (typeof raw !== "string" || !raw) return undefined;
  return TOWN_PARAM[raw.trim().toLowerCase().replace(/\s+/g, "-")];
}
