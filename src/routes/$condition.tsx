import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/FinalAndFooter";
import { PageBody } from "@/components/landing/PageBody";
import { CLINIC, CLINIC_GEO, CONDITIONS, SERVICE_AREAS, SITE_URL } from "@/lib/site";
import { CONDITION_PAGES, isConditionId } from "@/lib/condition-pages";

// Short ad URLs are the canonical ones; old Lovable paths and common
// misspellings redirect so no existing ad or link breaks.
const CONDITION_ALIASES: Record<string, string> = {
  "migraine-treatment": "migraine",
  "botox-for-migraine": "botox-migraine",
  "tmj-disorder": "tmj",
  "prp-injections": "prp",
  "shoulder-pain": "shoulder",
  "joint-pain-osteoarthritis": "joint-pain",
  "botulinum-toxin-spasticity": "neck-spasms",
  "migrane": "migraine",
  "migranes": "migraine",
  "migraines": "migraine",
  "headache": "migraine",
  "headaches": "migraine",
  "migraine-specialist": "migraine",
  "botox": "botox-migraine",
  "botox-for-migrane": "botox-migraine",
  "migraine-botox": "botox-migraine",
  "tmj-pain": "tmj",
  "jaw-pain": "tmj",
  "facial-pain": "tmj",
  "tmd": "tmj",
  "platelet-rich-plasma": "prp",
  "prp-injection": "prp",
  "cervical-dystonia": "neck-spasms",
  "spasticity": "neck-spasms",
  "botulinum-toxin": "neck-spasms",
  "rotator-cuff": "shoulder",
  "rotator-cuff-tear": "shoulder",
  "shoulder-pain-treatment": "shoulder",
  "osteoarthritis": "joint-pain",
  "knee-pain": "joint-pain",
  "knee": "joint-pain",
  "arthritis": "joint-pain",
  "hip-pain": "joint-pain",
};

export const Route = createFileRoute("/$condition")({
  loader: ({ params }) => {
    if (!isConditionId(params.condition)) {
      const alias = CONDITION_ALIASES[params.condition];
      if (alias) throw redirect({ to: "/$condition", params: { condition: alias }, replace: true });
      throw notFound();
    }
    const condition = CONDITIONS.find((c) => c.id === params.condition)!;
    return { conditionId: condition.id };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Page not found | Turquoise Institute" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const page = CONDITION_PAGES[loaderData.conditionId];
    const url = `${SITE_URL}/${loaderData.conditionId}`;
    const schema = {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: page.title,
      description: page.description,
      url,
      about: { "@type": "MedicalCondition", name: page.localKeyword },
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
        geo: { "@type": "GeoCoordinates", latitude: CLINIC_GEO.lat, longitude: CLINIC_GEO.lng },
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
        { name: "geo.position", content: "42.2843186;-71.3391106" },
        { property: "og:title", content: page.title },
        { property: "og:description", content: page.description },
        { property: "og:url", content: url },
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
  const { conditionId } = Route.useLoaderData();
  return <PageBody page={CONDITION_PAGES[conditionId]} />;
}

function ConditionNotFound() {
  return (
    <>
      <Header />
      <main className="container-page py-24 text-center">
        <h1 className="text-3xl text-heading">We couldn't find that page.</h1>
        <p className="mt-4 text-muted-foreground">See the conditions we treat or book a visit from our home page.</p>
        <a href="/" className="mt-6 inline-block font-bold text-primary-deep underline underline-offset-4">
          Go to the home page
        </a>
      </main>
      <Footer />
    </>
  );
}
