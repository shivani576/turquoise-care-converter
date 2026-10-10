/**
 * GTM / GA4 readiness.
 * Every conversion element also carries a `data-track` attribute + stable id so
 * GTM click triggers can be configured without code changes. This helper pushes
 * a structured event to `window.dataLayer` as well.
 */
export type TrackEvent =
  | "book_consultation_click"
  | "phone_click"
  | "email_click"
  | "directions_click"
  | "condition_card_click"
  | "form_start"
  | "form_submit"
  | "form_error"
  | "reel_open"
  | "review_click"
  | "appointment_request"
  | "scroll_depth";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: TrackEvent, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}
