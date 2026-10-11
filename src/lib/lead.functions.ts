import { createServerFn } from "@tanstack/react-start";
import { syncLead, type LeadInput } from "./lead.server";

/**
 * Consultation form → GoHighLevel. The browser bundle only gets an RPC stub;
 * validation (zod) and the CRM calls live in lead.server.ts and run on the server.
 */
export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: LeadInput) => input)
  .handler(({ data }) => syncLead(data));
