import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { TrustStrip, Problem } from "@/components/landing/TrustAndProblem";
import { Conditions } from "@/components/landing/Conditions";
import { Why, Approach } from "@/components/landing/WhyAndApproach";
import { Journey, Testimonials } from "@/components/landing/JourneyAndProof";
import { Local, Faq } from "@/components/landing/LocalAndFaq";
import { ConsultationForm } from "@/components/landing/ConsultationForm";
import { FinalCta, Footer, StickyMobileCta, ScrollDepthTracker } from "@/components/landing/FinalAndFooter";
import { CLINIC, CONDITIONS, FAQS, SERVICE_AREAS, SITE_URL } from "@/lib/site";

const TITLE = "Pain, Migraine & Nerve Pain Specialists in Natick, MA | Turquoise Institute";
const DESCRIPTION =
  "Specialized evaluation and treatment for spine pain, migraine, headache, sciatica, neuropathy, facial pain and TMJ pain. Serving MetroWest & Greater Boston from Natick, MA. Book a consultation.";

const clinicSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": `${SITE_URL}#clinic`,
  name: CLINIC.name,
  alternateName: CLINIC.fullName,
  url: SITE_URL,
  sameAs: [CLINIC.website, CLINIC.instagram],
  telephone: CLINIC.phoneTel,
  faxNumber: CLINIC.fax,
  email: CLINIC.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: CLINIC.address.street,
    addressLocality: CLINIC.address.city,
    addressRegion: CLINIC.address.state,
    postalCode: CLINIC.address.zip,
    addressCountry: "US",
  },
  medicalSpecialty: ["PainManagement", "Neurology"],
  areaServed: SERVICE_AREAS.map((name) => ({ "@type": "City", name: `${name}, MA` })),
  founder: {
    "@type": "Physician",
    name: CLINIC.doctor.name,
    jobTitle: CLINIC.doctor.title,
    medicalSpecialty: ["PainManagement", "Neurology"],
  },
  availableService: CONDITIONS.map((c) => ({
    "@type": "MedicalTherapy",
    name: `${c.name} evaluation and treatment`,
    url: c.url,
  })),
  isAcceptingNewPatients: true,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "geo.region", content: "US-MA" },
      { name: "geo.placename", content: "Natick" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: SITE_URL },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(clinicSchema) },
      { type: "application/ld+json", children: JSON.stringify(faqSchema) },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Problem />
        <Conditions />
        <Why />
        <Approach />
        <Journey />
        <Testimonials />
        <Local />
        <Faq />
        <ConsultationForm />
        <FinalCta />
      </main>
      <Footer />
      <StickyMobileCta />
      <ScrollDepthTracker />
    </>
  );
}
