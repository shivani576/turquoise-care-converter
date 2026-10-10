import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/FinalAndFooter";
import { PageBody } from "@/components/landing/PageBody";
import { CLINIC, CONDITIONS, SITE_URL } from "@/lib/site";
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
      provider: {
        "@type": "MedicalClinic",
        "@id": `${SITE_URL}#clinic`,
        name: CLINIC.name,
        telephone: CLINIC.phoneTel,
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
        <h1 className="text-3xl text-foreground">We couldn't find that page.</h1>
        <p className="mt-4 text-muted-foreground">
          See the conditions we treat or book a visit from our home page.
        </p>
        <a
          href="/"
          className="mt-6 inline-block font-bold text-primary-deep underline underline-offset-4"
        >
          Go to the home page
        </a>
      </main>
      <Footer />
    </>
  );
}
