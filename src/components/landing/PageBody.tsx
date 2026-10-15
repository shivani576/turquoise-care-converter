import type { PageCopy } from "@/lib/condition-pages";
import { CLINIC } from "@/lib/site";
import { BookingProvider } from "./Booking";
import { Header } from "./Header";
import { Hero } from "./Hero";
import {
  ProofBar,
  Services,
  PainPoints,
  Options,
  MeetDoctor,
  Facilities,
  CashPay,
} from "./Sections";
import { Reviews } from "./Reviews";
import { Reels } from "./Reels";
import { Faq, Location } from "./Faq";
import { FinalCta, Footer, ScrollDepthTracker } from "./FinalAndFooter";

/**
 * Shared page layout for the home page and every ad-group page.
 * First fold: hero with ONE call to action (opens the booking pop-up).
 * Second fold: services (home) or "does this sound like you" (ad-group pages).
 * One more call to action in the cash-pay section, then the closing form.
 * The sticky "Book Now" only appears after the second fold ([data-sticky-start]).
 */
export function PageBody({ page, isHome = false }: { page: PageCopy; isHome?: boolean }) {
  const faqs = [
    ...page.faqs,
    {
      q: `Is there a specialist for ${page.localKeyword} near Wellesley or Framingham?`,
      a: `Yes. Turquoise Institute is at ${CLINIC.address.street}, Natick — a short drive from Wellesley, Framingham, Needham, Sherborn, Dover, Wayland, Weston and Ashland. Call ${CLINIC.phoneDisplay} or request a visit online; no referral is needed.`,
    },
  ];
  return (
    <BookingProvider concern={page.formConcern}>
      <Header />
      <main>
        <Hero page={page} />
        <ProofBar />
        {isHome ? <Services /> : <PainPoints page={page} />}
        <div data-sticky-start="" aria-hidden="true" />
        {isHome ? <PainPoints page={page} /> : <Options page={page} />}
        <MeetDoctor />
        <Reviews />
        <Reels topics={page.reelTopics} />
        <Facilities />
        <CashPay />
        <Faq faqs={faqs} />
        <Location keyword={page.localKeyword} />
        <FinalCta heading={page.finalHeadline} concern={page.formConcern} />
      </main>
      <Footer />
      <ScrollDepthTracker />
    </BookingProvider>
  );
}
