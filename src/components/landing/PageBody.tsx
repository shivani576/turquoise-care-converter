import type { PageCopy } from "@/lib/condition-pages";
import { BookingProvider, StickyBookBar } from "./Booking";
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
 * Once the hero CTA scrolls out of view, the sticky header shows the phone number and a
 * sticky "Book a Consultation" bar appears at the bottom. The closing form ends the page.
 */
export function PageBody({ page, isHome = false }: { page: PageCopy; isHome?: boolean }) {
  return (
    <BookingProvider concern={page.formConcern}>
      <Header actions />
      <main>
        <Hero page={page} />
        <ProofBar />
        {isHome ? <Services /> : <PainPoints page={page} />}
        {isHome ? <PainPoints page={page} /> : <Options page={page} />}
        <MeetDoctor />
        <Reviews />
        <Reels topics={page.reelTopics} />
        <Facilities />
        <CashPay />
        <Faq faqs={page.faqs} />
        <Location />
        <FinalCta heading={page.finalHeadline} concern={page.formConcern} />
      </main>
      <Footer />
      <StickyBookBar />
      <ScrollDepthTracker />
    </BookingProvider>
  );
}
