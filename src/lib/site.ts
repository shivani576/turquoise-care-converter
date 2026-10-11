// Source of truth: turquoiseinstitute.com + Google Business Profile (checked Oct 2026).
// Canonical origin of the landing pages. VITE_SITE_URL overrides it (no trailing slash needed).
// Pages are only indexable when served from this host; see src/server.ts.
export const SITE_URL = (
  (import.meta.env?.["VITE_SITE_URL"] as string | undefined) ||
  "https://care.turquoiseinstitute.com"
).replace(/\/+$/, "");

export const CLINIC = {
  name: "Turquoise Institute",
  fullName: "Turquoise Institute for Interventional Pain, Headache, and Regenerative Medicine",
  phoneDisplay: "(978) 440-0021",
  phoneTel: "+19784400021",
  fax: "(978) 953-5646",
  email: "admin@turquoiseinstitute.com",
  address: {
    street: "10 Union St., Suite 2D",
    city: "Natick",
    state: "MA",
    zip: "01760",
  },
  website: "https://turquoiseinstitute.com/",
  privacyUrl: "https://turquoiseinstitute.com/privacy-policy/",
  termsUrl: "https://turquoiseinstitute.com/terms-and-conditions/",
  insuranceUrl: "https://turquoiseinstitute.com/insurance-and-payment-policy/",
  instagram: "https://www.instagram.com/dramir.pain.headachemd/",
  instagramHandle: "@dramir.pain.headachemd",
  googleMapsUrl: "https://maps.google.com/?cid=1310132766221795055",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=10+Union+St+Suite+2D+Natick+MA+01760",
  mapEmbedUrl:
    "https://www.google.com/maps?q=10+Union+St+Suite+2D+Natick+MA+01760&z=15&output=embed",
  doctor: {
    name: "Dr. Amir Soheil Tolebeyan",
    short: "Dr. Tolebeyan",
    first: "Dr. Amir",
    title: "Founder & Medical Director",
  },
};

/** Clinic coordinates (from the Google Business Profile listing). */
export const CLINIC_GEO = { lat: 42.2843186, lng: -71.3391106, radiusKm: 10 };

/**
 * Towns whose centers are within ~10 km of the Natick office — the radius the
 * ads target. Order = closest / most valuable first. Used in page copy, the
 * "near you" section, FAQs and schema so local searches match the page.
 */
export const SERVICE_AREAS = [
  "Natick",
  "Wellesley",
  "Framingham",
  "Needham",
  "Sherborn",
  "Dover",
  "Wayland",
  "Weston",
  "Ashland",
];

/** Village names people also search by. */
export const NEIGHBORHOODS = ["South Natick", "Wellesley Hills", "Saxonville", "Cochituate"];

export const SERVICE_ZIPS = [
  "01760",
  "02481",
  "02482",
  "01701",
  "01702",
  "02492",
  "02494",
  "01770",
  "02030",
  "01778",
  "02493",
  "01721",
];

/**
 * ?town= values the ads can append to the landing URL (e.g. /migraine?town=wellesley)
 * so the page names the searcher's own town.
 */
export const TOWN_PARAM: Record<string, string> = Object.fromEntries(
  [...SERVICE_AREAS, ...NEIGHBORHOODS].map((t) => [t.toLowerCase().replace(/\s+/g, "-"), t]),
);

export const CREDENTIALS = [
  "Board-certified physician",
  "Fellowship-trained in Headache & Facial Pain Medicine",
  "Fellowship-trained in Interventional Pain Medicine",
  "Trained at Yale & Dartmouth",
  "Former director, Headache & Facial Pain Program, Tufts Medical Center",
];

export type ConditionId =
  "migraine" | "botox-migraine" | "tmj" | "neck-spasms" | "prp" | "shoulder" | "joint-pain";

export interface Condition {
  id: ConditionId;
  /** Short label used on cards and in the picker */
  name: string;
  /** Value stored with the lead in the CRM */
  formLabel: string;
  /** One-line hook for the "What brings you in?" picker */
  hook: string;
  url: string;
}

export const CONDITIONS: Condition[] = [
  {
    id: "migraine",
    name: "Migraines & headaches",
    formLabel: "Migraine Treatment",
    hook: "Frequent attacks, medications that stopped working",
    url: "https://turquoiseinstitute.com/conditions/migraine-types-causes-symptoms-diagnosis-and-treatment-options/",
  },
  {
    id: "botox-migraine",
    name: "Botox for chronic migraine",
    formLabel: "Botox for Migraine",
    hook: "15 or more headache days a month",
    url: "https://turquoiseinstitute.com/",
  },
  {
    id: "tmj",
    name: "TMJ & jaw pain",
    formLabel: "TMJ Disorder (TMD)",
    hook: "Clicking, clenching, jaw-related headaches",
    url: "https://turquoiseinstitute.com/conditions/temporomandibular-joint-tmj-pain-types-causes-symptoms-and-treatment-option/",
  },
  {
    id: "prp",
    name: "PRP injections",
    formLabel: "Platelet-Rich Plasma (PRP) Injections",
    hook: "Non-surgical option for joints & tendons",
    url: "https://turquoiseinstitute.com/",
  },
  {
    id: "shoulder",
    name: "Shoulder & rotator cuff pain",
    formLabel: "Shoulder / Rotator Cuff Pain",
    hook: "Pain reaching overhead or sleeping on it",
    url: "https://turquoiseinstitute.com/",
  },
  {
    id: "joint-pain",
    name: "Knee, hip & joint arthritis",
    formLabel: "Joint Pain / Osteoarthritis",
    hook: "Stiff, aching joints holding you back",
    url: "https://turquoiseinstitute.com/",
  },
  {
    id: "neck-spasms",
    name: "Neck spasms & cervical dystonia",
    formLabel: "Botulinum Toxin (Spasticity / Cervical Dystonia)",
    hook: "Neck pulling, twisting or muscle spasms",
    url: "https://turquoiseinstitute.com/",
  },
];

/**
 * Real Google reviews, copied word-for-word from the clinic's Google Business
 * Profile (5.0 rating, 4 reviews as of Oct 2026). Used as the fallback when
 * the live Places API feed is not configured. Do not edit the text.
 */
export const GOOGLE_RATING = { rating: 5.0, count: 4 };

export const GOOGLE_REVIEWS = [
  {
    author: "Ana Laura Moura",
    rating: 5,
    when: "3 months ago",
    tag: "headache",
    text: "I am currently undergoing treatment with Dr. Tolebeyan, and I am very grateful for the care I've received so far. He is knowledgeable, attentive, and truly cares about his patients. He takes the time to listen, answer questions, and never makes me feel rushed during appointments. I also appreciate how available and supportive he has been whenever I've had concerns between visits. I highly recommend Dr. Tolebeyan to anyone dealing with headaches or migraines. It's reassuring to have a doctor who genuinely cares and is committed to helping his patients.",
  },
  {
    author: "Fi NK",
    rating: 5,
    when: "5 months ago",
    tag: "headache",
    text: "Outstanding experience at Turquoise Institute. I received wonderful care and service for my migraines. Dr. Tolebeyan is compassionate, knowledgeable, and listens to patients. Highly recommend this clinic to anyone looking for true expertise in headache and pain management.",
  },
  {
    author: "Jilla Budaghzadeh",
    rating: 5,
    when: "4 months ago",
    tag: "pain",
    text: "I highly recommend Dr. Tolebiyan to anyone seeking thoughtful and high-quality care for pain and headache management.",
  },
];

/** Dr. Amir's own Instagram reels, shown in the "Hear it from Dr. Amir" row. */
export interface Reel {
  code: string;
  title: string;
  topic: "migraine" | "botox" | "prp" | "pain";
}

export const REELS: Reel[] = [
  {
    code: "DeMXeRCABoB",
    title: "What if your next migraine treatment isn't another pill?",
    topic: "botox",
  },
  {
    code: "DbS_zNhKYrj",
    title: "Botox isn't just cosmetic — how it helps chronic migraine",
    topic: "botox",
  },
  {
    code: "DX92rd2qyXb",
    title: "What kind of headache are you actually dealing with?",
    topic: "migraine",
  },
  {
    code: "DZ-o0q2KDw6",
    title: "Why migraines often follow your hormonal cycle",
    topic: "migraine",
  },
  { code: "DaQ7Jkfvz58", title: "Can weather changes trigger your migraines?", topic: "migraine" },
  { code: "DbqrjJiKwBA", title: "PRP: pain relief from your own blood", topic: "prp" },
  { code: "DYkOmlxgSp_", title: "Your MRI may not explain your pain", topic: "pain" },
];

export const GENERAL_FAQS = [
  {
    q: "Do I need a referral?",
    a: "No. You can book directly with us — online or by calling (978) 440-0021. Telemedicine visits are also available for appropriate patients.",
  },
  {
    q: "What happens at the first visit?",
    a: "Your first visit is about 60 minutes with Dr. Tolebeyan himself. He goes through your history, what you've already tried, examines you and reviews any scans — then explains what he thinks is going on and lays out your options. When it makes sense, treatment can often start the same day.",
  },
  {
    q: "Do you take insurance?",
    a: "We're a direct-pay, out-of-network practice, so we don't bill commercial insurance, Medicare or Medicaid. You'll get an itemized receipt you can submit to your insurer for possible out-of-network reimbursement. Our team can walk you through costs before you book.",
  },
  {
    q: "What should I bring?",
    a: "Your medication list (including what you've tried before), any MRI, CT or X-ray reports, and previous procedure notes if you have them.",
  },
  {
    q: "Where are you located?",
    a: "10 Union Street, Suite 2D, Natick, MA 01760. We're a short drive from Wellesley, Framingham, Needham, Sherborn, Dover, Wayland, Weston and Ashland, and patients come to us from across MetroWest.",
  },
];
