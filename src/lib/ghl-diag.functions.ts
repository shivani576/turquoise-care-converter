import { createServerFn } from "@tanstack/react-start";

/** Temporary diagnostic: confirms which GHL location the key writes into and whether recent leads are findable. */
export const ghlDiag = createServerFn({ method: "POST" }).handler(async () => {
  const token = process.env["GHL_API_TOKEN"];
  const locationId = process.env["GHL_LOCATION_ID"];
  if (!token || !locationId) return { configured: false as const };

  const headers = {
    Authorization: `Bearer ${token}`,
    Version: "2021-07-28",
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const base = "https://services.leadconnectorhq.com";

  const probe = async (label: string, url: string) => {
    try {
      const res = await fetch(url, { headers });
      const text = await res.text();
      return { label, status: res.status, body: text.slice(0, 600) };
    } catch (e) {
      return { label, status: 0, body: String(e).slice(0, 300) };
    }
  };

  return {
    configured: true as const,
    locationIdTail: locationId.slice(-6),
    results: [
      await probe("location", `${base}/locations/${locationId}`),
      await probe(
        "search",
        `${base}/contacts/?locationId=${locationId}&query=zzlive0922%40example.com`,
      ),
    ],
  };
});
