import { createServerFn } from "@tanstack/react-start";
import { GOOGLE_RATING, GOOGLE_REVIEWS } from "./site";

export interface ReviewItem {
  author: string;
  rating: number;
  when: string;
  text: string;
}

export interface ReviewsPayload {
  source: "live" | "saved";
  rating: number;
  count: number;
  reviews: ReviewItem[];
}

let cache: { at: number; data: ReviewsPayload } | undefined;
const SIX_HOURS = 6 * 60 * 60 * 1000;

const saved: ReviewsPayload = {
  source: "saved",
  rating: GOOGLE_RATING.rating,
  count: GOOGLE_RATING.count,
  reviews: GOOGLE_REVIEWS.map(({ author, rating, when, text }) => ({ author, rating, when, text })),
};

/**
 * Live Google rating + reviews via the Places API (New).
 * Needs GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID (the "ChIJ…" id) in the host's
 * environment. Without them — or if Google errors — the reviews saved in
 * site.ts (copied word-for-word from the listing) are shown instead.
 * Google returns at most 5 reviews and chooses which ones.
 */
export const getGoogleReviews = createServerFn({ method: "GET" }).handler(
  async (): Promise<ReviewsPayload> => {
    const key = process.env["GOOGLE_PLACES_API_KEY"];
    const placeId = process.env["GOOGLE_PLACE_ID"];
    if (!key || !placeId) return saved;
    if (cache && Date.now() - cache.at < SIX_HOURS) return cache.data;

    try {
      const res = await fetch(
        `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
        {
          headers: {
            "X-Goog-Api-Key": key,
            "X-Goog-FieldMask": "rating,userRatingCount,reviews",
          },
        },
      );
      if (!res.ok) {
        console.error(
          `getGoogleReviews: Places API ${res.status}: ${(await res.text()).slice(0, 300)}`,
        );
        return saved;
      }
      const json = (await res.json()) as {
        rating?: number;
        userRatingCount?: number;
        reviews?: {
          rating?: number;
          relativePublishTimeDescription?: string;
          text?: { text?: string };
          originalText?: { text?: string };
          authorAttribution?: { displayName?: string };
        }[];
      };
      const reviews = (json.reviews ?? [])
        .map((r) => ({
          author: r.authorAttribution?.displayName ?? "Google user",
          rating: r.rating ?? 5,
          when: r.relativePublishTimeDescription ?? "",
          text: (r.originalText?.text ?? r.text?.text ?? "").trim(),
        }))
        // Star-only reviews still count toward the rating but have nothing to show.
        .filter((r) => r.text.length > 0);

      const data: ReviewsPayload = {
        source: "live",
        rating: json.rating ?? saved.rating,
        count: json.userRatingCount ?? saved.count,
        reviews: reviews.length ? reviews : saved.reviews,
      };
      cache = { at: Date.now(), data };
      return data;
    } catch (error) {
      console.error("getGoogleReviews failed", error);
      return saved;
    }
  },
);
