import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const attributionSchema = z
  .object({
    utm_source: z.string().max(200).optional(),
    utm_medium: z.string().max(200).optional(),
    utm_campaign: z.string().max(200).optional(),
    utm_term: z.string().max(200).optional(),
    utm_content: z.string().max(200).optional(),
    gclid: z.string().max(200).optional(),
    landing_page: z.string().max(500).optional(),
    referrer: z.string().max(500).optional(),
  })
  .default({});

const leadSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(7).max(40),
  concern: z.string().trim().max(160).optional().default(""),
  preferredTime: z.string().trim().max(160).optional().default(""),
  pagePath: z.string().trim().max(300).optional().default("/"),
  attribution: attributionSchema,
});

type Lead = z.infer<typeof leadSchema>;

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

/**
 * Receives a consultation request and syncs it to GoHighLevel.
 * A CRM failure is logged but never surfaced as a blocking error — the visitor
 * always completes the flow.
 */
export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const token = process.env["GHL_API_TOKEN"];
    const locationId = process.env["GHL_LOCATION_ID"];

    if (!token || !locationId) {
      console.error("submitLead: GHL_API_TOKEN or GHL_LOCATION_ID is not configured");
      return { ok: true, synced: false as const };
    }

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        Version: GHL_VERSION,
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      const attribution = Object.fromEntries(
        Object.entries(data.attribution).filter(([, v]) => Boolean(v)),
      ) as Record<string, string>;

      const { customFields, leftover } = await mapCustomFields(
        headers,
        locationId,
        attribution,
      );

      const body: Record<string, unknown> = {
        locationId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        source: attribution["utm_source"]
          ? `${attribution["utm_source"]}${attribution["gclid"] ? " (Google Ads)" : ""}`
          : "Website — Landing Page",
        tags: buildTags(data, leftover),
      };
      if (customFields.length > 0) body["customFields"] = customFields;

      const res = await fetch(`${GHL_BASE}/contacts/`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text();

        // GHL rejects a second contact with the same email/phone when duplicate
        // contacts are disallowed. Update the existing record instead so the
        // lead (and its campaign data) is never lost.
        const duplicateId = extractDuplicateContactId(res.status, text);
        if (duplicateId) {
          const { locationId: _omit, ...updateBody } = body;
          const updateRes = await fetch(`${GHL_BASE}/contacts/${duplicateId}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(updateBody),
          });
          if (updateRes.ok) {
            console.log(
              `submitLead: updated existing GHL contact ${duplicateId} (duplicate email/phone) for ${data.email} / ${data.phone}`,
            );
            return { ok: true, synced: true as const, action: "updated" as const, contactId: duplicateId };
          }
          console.error(
            `submitLead: GHL duplicate contact update failed (${updateRes.status}): ${(
              await updateRes.text()
            ).slice(0, 500)}`,
          );
          return { ok: true, synced: false as const };
        }

        console.error(`submitLead: GHL contact create failed (${res.status}): ${text.slice(0, 500)}`);
        return { ok: true, synced: false as const };
      }

      const created = (await res.json().catch(() => ({}))) as {
        contact?: { id?: string; locationId?: string };
      };
      console.log(
        `submitLead: created GHL contact ${created.contact?.id ?? "unknown"} in location ${
          created.contact?.locationId ?? "unknown"
        } for ${data.email} / ${data.phone}`,
      );
      return {
        ok: true,
        synced: true as const,
        action: "created" as const,
        contactId: created.contact?.id,
      };
    } catch (error) {
      console.error("submitLead: GHL sync threw", error);
      return { ok: true, synced: false as const };
    }
  });

/** Returns the existing contact id when GHL refused the create as a duplicate. */
function extractDuplicateContactId(status: number, body: string): string | undefined {
  if (status !== 400) return undefined;
  try {
    const payload = JSON.parse(body) as {
      message?: string;
      meta?: { contactId?: string };
    };
    if (!/duplicat/i.test(payload.message ?? "")) return undefined;
    return payload.meta?.contactId;
  } catch {
    return undefined;
  }
}

function buildTags(data: Lead, leftoverAttribution: Record<string, string>): string[] {
  // Dated stamp on every submission (create or duplicate-update) so GHL
  // workflows can trigger on any form fill, not only on new contacts.
  const stamp = new Date().toISOString().slice(0, 10);
  const tags = ["website-lead", "landing-page", "form-submitted", `submitted: ${stamp}`];
  if (data.concern) tags.push(`interest: ${data.concern}`.toLowerCase());
  if (data.preferredTime) tags.push(`preferred: ${data.preferredTime}`.toLowerCase());
  if (data.pagePath && data.pagePath !== "/") tags.push(`page: ${data.pagePath}`.toLowerCase());
  for (const [key, value] of Object.entries(leftoverAttribution)) {
    if (key === "landing_page" || key === "referrer") continue;
    tags.push(`${key}: ${value}`.toLowerCase().slice(0, 80));
  }
  return tags.slice(0, 20);
}

/**
 * Looks up the location's custom fields and maps attribution values onto any
 * that exist (matched by fieldKey or name). Anything unmatched is returned so
 * the caller can fall back to tags.
 */
async function mapCustomFields(
  headers: Record<string, string>,
  locationId: string,
  attribution: Record<string, string>,
): Promise<{ customFields: { id: string; value: string }[]; leftover: Record<string, string> }> {
  const leftover = { ...attribution };
  const customFields: { id: string; value: string }[] = [];
  if (Object.keys(attribution).length === 0) return { customFields, leftover };

  try {
    const res = await fetch(`${GHL_BASE}/locations/${locationId}/customFields`, { headers });
    if (!res.ok) {
      console.error(`submitLead: custom field lookup failed (${res.status}) — using tags`);
      return { customFields, leftover };
    }
    const json = (await res.json()) as {
      customFields?: { id?: string; fieldKey?: string; name?: string }[];
    };
    for (const field of json.customFields ?? []) {
      if (!field.id) continue;
      const candidates = [field.fieldKey ?? "", field.name ?? ""].map(normalize);
      for (const key of Object.keys(attribution)) {
        const normalizedKey = normalize(key);
        if (candidates.some((c) => c === normalizedKey || c.endsWith(normalizedKey))) {
          customFields.push({ id: field.id, value: attribution[key]! });
          delete leftover[key];
          break;
        }
      }
    }
  } catch (error) {
    console.error("submitLead: custom field lookup threw — using tags", error);
  }

  return { customFields, leftover };
}

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}
