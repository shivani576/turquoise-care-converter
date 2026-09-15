import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { TrustStrip } from "@/components/landing/TrustAndProblem";
import {
  ConditionHero,
  ConditionSigns,
  ConditionTreatments,
} from "@/components/landing/ConditionSections";
import { Why, Approach } from "@/components/landing/WhyAndApproach";
import { Testimonials } from "@/components/landing/JourneyAndProof";
import { Local, Faq } from "@/components/landing/LocalAndFaq";
import { ConsultationForm } from "@/components/landing/ConsultationForm";
import { FinalCta, Footer, StickyMobileCta, ScrollDepthTracker } from "@/components/landing/FinalAndFooter";
import { CLINIC, CONDITIONS, SERVICE_AREAS, SITE_URL } from "@/lib/site";
import { CONDITION_PAGES, isConditionId } from "@/lib/condition-pages";

// Common misspellings/aliases and retired URLs that should land on the right page.
const CONDITION_ALIASES: Record<string, string> = {
  migrane: "migraine-treatment",
  migranes: "migraine-treatment",
  migraine: "migraine-treatment",
  migraines: "migraine-treatment",
  headache: "migraine-treatment",
  headaches: "migraine-treatment",
  "botox-migraine": "botox-for-migraine",
  "botox-for-migrane": "botox-for-migraine",
  botox: "botox-for-migraine",
  tmj: "tmj-disorder",
  "tmj-pain": "tmj-disorder",
  "jaw-pain": "tmj-disorder",
  "facial-pain": "tmj-disorder",
  "face-pain": "tmj-disorder",
  prp: "prp-injections",
  "platelet-rich-plasma": "prp-injections",
  "cervical-dystonia": "botulinum-toxin-spasticity",
  spasticity: "botulinum-toxin-spasticity",
  "botulinum-toxin": "botulinum-toxin-spasticity",
  shoulder: "shoulder-pain",
  "rotator-cuff": "shoulder-pain",
  "rotator-cuff-tear": "shoulder-pain",
  "joint-pain": "joint-pain-osteoarthritis",
  osteoarthritis: "joint-pain-osteoarthritis",
  "knee-pain": "joint-pain-osteoarthritis",
};


export const Route = createFileRoute("/$condition")({
  loader: ({ params }) => {
    if (!isConditionId(params.condition)) {
      const alias = CONDITION_ALIASES[params.condition];
      if (alias) throw redirect({ to: "/$condition", params: { condition: alias }, replace: true });
      throw notFound();
    }
    const condition = CONDITIONS.find((c) => c.id === params.condition)!;
    return { condition, page: CONDITION_PAGES[condition.id] };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Page not found | Turquoise Institute" }, { name: "robots", content: "noindex" }] };
    }
    const { condition, page } = loaderData;
    const url = `${SITE_URL}/${condition.id}`;
    const schema = {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: page.title,
      description: page.description,
      url,
      about: { "@type": "MedicalCondition", name: condition.name },
      provider: {
        "@type": "MedicalClinic",
        "@id": `${SITE_URL}#clinic`,
        name: CLINIC.name,
        telephone: CLINIC.phoneTel,
        address: {
          "@type": "PostalAddress",
          streetAddress: CLINIC.address.street,
          addressLocality: CLINIC.address.city,
          addressRegion: CLINIC.address.state,
          postalCode: CLINIC.address.zip,
          addressCountry: "US",
        },
        areaServed: SERVICE_AREAS.map((name) => ({ "@type": "City", name: `${name}, MA` })),
      },
    };
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };
    return {
      meta: [
        { title: page.title },
        { name: "description", content: page.description },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { name: "geo.region", content: "US-MA" },
        { name: "geo.placename", content: "Natick" },
        { property: "og:title", content: page.title },
        { property: "og:description", content: page.description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:locale", content: "en_US" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: page.title },
        { name: "twitter:description", content: page.description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(schema) },
        { type: "application/ld+json", children: JSON.stringify(faqSchema) },
      ],
    };
  },
  notFoundComponent: ConditionNotFound,
  component: ConditionLandingPage,
});

function ConditionLandingPage() {
  const { condition, page } = Route.useLoaderData();
  return (
    <>
      <Header />
      <main>
        <ConditionHero condition={condition} page={page} />
        <TrustStrip />
        <ConditionSigns condition={condition} page={page} />
        <ConditionTreatments condition={condition} page={page} />
        <Why />
        <Approach />
        <Testimonials preferContext={page.testimonialContext} />
        <Local />
        <Faq faqs={page.faqs} />
        <ConsultationForm defaultConcern={condition.formLabel} />
        <FinalCta
          heading={`You Don't Have to Live With ${condition.name} Alone.`}
          conditionName={condition.name}
        />
      </main>
      <Footer />
      <StickyMobileCta />
      <ScrollDepthTracker />
    </>
  );
}

function ConditionNotFound() {
  return (
    <>
      <Header />
      <main className="container-page py-24 text-center">
        <h1 className="text-3xl font-semibold text-foreground">We couldn't find that page.</h1>
        <p className="mt-4 text-muted-foreground">
          Explore the conditions we treat or book a consultation from our home page.
        </p>
        <a href="/" className="mt-6 inline-block font-bold text-primary-deep underline underline-offset-4">
          Return to Turquoise Institute
        </a>
      </main>
      <Footer />
    </>
  );
}
