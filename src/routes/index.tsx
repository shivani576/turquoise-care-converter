import { createFileRoute } from "@tanstack/react-router";
import { PageBody } from "@/components/landing/PageBody";
import { HOME_PAGE } from "@/lib/condition-pages";
import { CLINIC, CLINIC_GEO, CONDITIONS, SERVICE_AREAS, SITE_URL } from "@/lib/site";

const clinicSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": `${SITE_URL}#clinic`,
  name: CLINIC.name,
  alternateName: CLINIC.fullName,
  url: `${SITE_URL}/`,
  sameAs: [CLINIC.website, CLINIC.instagram, CLINIC.googleMapsUrl],
  telephone: CLINIC.phoneTel,
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
  geo: { "@type": "GeoCoordinates", latitude: CLINIC_GEO.lat, longitude: CLINIC_GEO.lng },
  hasMap: CLINIC.googleMapsUrl,
  faxNumber: CLINIC.fax,
  areaServed: [
    {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: CLINIC_GEO.lat,
        longitude: CLINIC_GEO.lng,
      },
      geoRadius: CLINIC_GEO.radiusKm * 1000,
    },
    ...SERVICE_AREAS.map((name) => ({ "@type": "City", name: `${name}, MA` })),
  ],
  founder: { "@type": "Physician", name: CLINIC.doctor.name, jobTitle: CLINIC.doctor.title },
  availableService: CONDITIONS.map((c) => ({ "@type": "MedicalTherapy", name: c.name })),
  isAcceptingNewPatients: true,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOME_PAGE.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: HOME_PAGE.title },
      { name: "description", content: HOME_PAGE.description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "geo.region", content: "US-MA" },
      { name: "geo.placename", content: "Natick" },
      { name: "geo.position", content: "42.2843186;-71.3391106" },
      { property: "og:title", content: HOME_PAGE.title },
      { property: "og:description", content: HOME_PAGE.description },
      { property: "og:url", content: `${SITE_URL}/` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(clinicSchema) },
      { type: "application/ld+json", children: JSON.stringify(faqSchema) },
    ],
  }),
  component: () => <PageBody page={HOME_PAGE} isHome />,
});
