import { createFileRoute } from "@tanstack/react-router";
import { ghlDiag } from "@/lib/ghl-diag.functions";

// Temporary diagnostic endpoint — remove after verifying the CRM integration.
export const Route = createFileRoute("/api/public/ghl-diag")({
  server: {
    handlers: {
      GET: async () =>
        new Response(JSON.stringify(await ghlDiag({ data: undefined })), {
          headers: { "content-type": "application/json" },
        }),
    },
  },
});
