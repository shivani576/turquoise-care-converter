import { useEffect, useState } from "react";
import { TOWN_PARAM } from "@/lib/site";

/**
 * Reads ?town= from the landing URL (e.g. /migraine?town=wellesley) so ads
 * targeting one town can show that town on the page. Only towns in
 * TOWN_PARAM are accepted; anything else is ignored.
 */
export function useTown(): string | undefined {
  const [town, setTown] = useState<string | undefined>(undefined);
  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("town");
    if (!raw) return;
    const match = TOWN_PARAM[raw.trim().toLowerCase().replace(/\s+/g, "-")];
    if (match) setTown(match);
  }, []);
  return town;
}
