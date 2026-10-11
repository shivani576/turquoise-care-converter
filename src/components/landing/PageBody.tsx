import type { PageCopy } from "@/lib/condition-pages";
import { CLINIC } from "@/lib/site";
import { Header } from "./Header";
import { Hero } from "./Hero";
import {
  ProofBar,
  PainPoints,
  Options,
  ConditionPicker,
  MeetDoctor,
  HowItWorks,
  CostUpfront,
} from "./Sections";
import { Reviews } from "./Reviews";
import { Reels } from "./Reels";
import { Faq, Location } from "./Faq";
import { FinalCta, Footer, StickyMobileCta, ScrollDepthTracker } from "./FinalAndFooter";

/**
 * Shared page layout for the home page and every ad-group page.
 * Order follows the visitor's questions: am I in the right place → is this
 * for me → who's the doctor → can I trust them → what happens → what's it cost.
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
    <>
      <Header />
      <main>
        <Hero page={page} />
        <ProofBar />
        <PainPoints page={page} />
        {isHome ? <ConditionPicker /> : <Options page={page} />}
        <MeetDoctor />
        <Reviews />
        <Reels topics={page.reelTopics} />
        <HowItWorks />
        <CostUpfront />
        <Faq faqs={faqs} />
        <Location keyword={page.localKeyword} />
        <FinalCta
          heading={page.finalHeadline}
          defaultConcern={page.formConcern}
          ctaLabel={page.ctaLabel}
        />
      </main>
      <Footer />
      <StickyMobileCta />
      <ScrollDepthTracker />
    </>
  );
}
