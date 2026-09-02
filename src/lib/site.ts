// Source of truth: turquoiseinstitute.com (verified Sept 2026)
export const SITE_URL = "https://id-preview--1efd8ecb-c13f-4780-93c0-a8f3acd4f2b5.lovable.app"; // update to the final landing-page domain before launch

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
  scheduleUrl: "https://turquoiseinstitute.com/schedule-consultation/",
  insuranceUrl: "https://turquoiseinstitute.com/insurance-and-payment-policy/",
  privacyUrl: "https://turquoiseinstitute.com/privacy-policy/",
  termsUrl: "https://turquoiseinstitute.com/terms-and-conditions/",
  instagram: "https://www.instagram.com/dramir.pain.headachemd",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=10+Union+St+Suite+2D+Natick+MA+01760",
  mapEmbedUrl: "https://www.google.com/maps?q=10+Union+St+Suite+2D+Natick+MA+01760&z=15&output=embed",
  doctor: {
    name: "Dr. Amir Soheil Tolebeyan",
    short: "Dr. Tolebeyan",
    title: "Founder & Medical Director",
  },
};

export const SERVICE_AREAS = [
  "Natick",
  "Wellesley",
  "Weston",
  "Newton",
  "Wayland",
  "Sudbury",
  "Sherborn",
  "Lincoln",
  "Concord",
  "Lexington",
];

export type ConditionId =
  | "spine-pain"
  | "facial-pain"
  | "headache"
  | "migraine"
  | "sciatica"
  | "neuropathy"
  | "tmj-pain";

export interface Condition {
  id: ConditionId;
  name: string;
  formLabel: string;
  scope: string;
  description: string;
  symptoms: string[];
  url: string;
  alt: string;
}

export const CONDITIONS: Condition[] = [
  {
    id: "spine-pain",
    name: "Spine Pain",
    formLabel: "Spine Pain",
    scope: "Types, causes, symptoms & treatment options",
    description:
      "Neck, mid-back and lower-back pain that limits how you move, sit, sleep or work — from disc and joint problems to muscular and nerve-related causes.",
    symptoms: ["Neck or back stiffness", "Pain that radiates", "Worse with sitting or standing"],
    url: "https://turquoiseinstitute.com/conditions/spine-pain-types-causes-symptoms-and-treatment-options/",
    alt: "Clinician reviewing a spine image with a patient experiencing back pain",
  },
  {
    id: "facial-pain",
    name: "Facial Pain",
    formLabel: "Facial Pain",
    scope: "Types, causes, symptoms & treatment options",
    description:
      "Persistent or sharp pain across the face, cheek or jaw — including trigeminal neuralgia and other nerve-related facial pain conditions.",
    symptoms: ["Sharp, electric-like pain", "Triggered by touch or chewing", "Aching in cheek or jaw"],
    url: "https://turquoiseinstitute.com/conditions/facial-pain-types-causes-symptoms-and-treatment-options/",
    alt: "Woman holding the side of her face due to facial pain",
  },
  {
    id: "headache",
    name: "Headache",
    formLabel: "Headache",
    scope: "Types, causes, symptoms & treatment options",
    description:
      "Frequent or chronic headaches — tension-type, cluster, occipital neuralgia and post-concussion headache — evaluated by a fellowship-trained headache specialist.",
    symptoms: ["Headaches several days a week", "Pressure or tightness", "Pain at the base of the skull"],
    url: "https://turquoiseinstitute.com/conditions/headache-types-causes-symptoms-and-treatment-options/",
    alt: "Woman at her desk pressing her temples during a headache",
  },
  {
    id: "migraine",
    name: "Migraine",
    formLabel: "Migraine",
    scope: "Types, causes, symptoms, diagnosis & treatment options",
    description:
      "Migraine is a neurological disease, not \"just a headache.\" We provide comprehensive diagnosis and treatment, including migraine procedures and injections.",
    symptoms: ["Throbbing, one-sided pain", "Light and sound sensitivity", "Nausea or visual aura"],
    url: "https://turquoiseinstitute.com/conditions/migraine-types-causes-symptoms-diagnosis-and-treatment-options/",
    alt: "Patient describing migraine symptoms to a physician",
  },
  {
    id: "sciatica",
    name: "Sciatica",
    formLabel: "Sciatica",
    scope: "Causes, symptoms, diagnosis & treatment options",
    description:
      "Pain that starts in the lower back or buttock and travels down the leg, often caused by irritation or compression of the sciatic nerve.",
    symptoms: ["Shooting pain down one leg", "Numbness or tingling", "Worse when sitting"],
    url: "https://turquoiseinstitute.com/conditions/sciatica-causes-symptoms-diagnosis-and-treatment-options/",
    alt: "Person holding their lower back with pain radiating down the leg",
  },
  {
    id: "neuropathy",
    name: "Neuropathy",
    formLabel: "Neuropathy",
    scope: "Types, causes, symptoms, diagnosis & treatment options",
    description:
      "Nerve damage that causes burning, tingling, numbness or weakness — commonly in the hands and feet — with a focus on identifying the underlying cause.",
    symptoms: ["Burning or tingling feet or hands", "Numbness", "Sensitivity to touch"],
    url: "https://turquoiseinstitute.com/conditions/neuropathy-types-causes-symptoms-diagnosis-and-treatment-options/",
    alt: "Person holding their foot due to nerve pain and tingling",
  },
  {
    id: "tmj-pain",
    name: "TMJ Pain",
    formLabel: "TMJ Pain",
    scope: "Types, causes, symptoms & treatment options",
    description:
      "Temporomandibular joint pain affecting the jaw, ear and temple — often overlapping with headache and facial pain — treated with targeted, minimally invasive options.",
    symptoms: ["Jaw pain or clicking", "Pain when chewing", "Ear or temple aching"],
    url: "https://turquoiseinstitute.com/conditions/temporomandibular-joint-tmj-pain-types-causes-symptoms-and-treatment-option/",
    alt: "Physician explaining jaw joint anatomy to a patient with TMJ pain",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Outstanding experience at Turquoise Institute. I received wonderful care and service for my migraines. Dr. Tolebeyan is compassionate, knowledgeable, and listens to patients. Highly recommend this clinic to anyone looking for true expertise in headache and pain management.",
    name: "Fi NK",
    context: "Migraines",
  },
  {
    quote:
      "After struggling with migraines for most of my life, I finally found relief here. The treatments have been life-changing, and the staff is so caring and supportive. Highly recommend!",
    name: "Jilla Budaghzadeh",
    context: "Migraines",
  },
  {
    quote:
      "He is knowledgeable, attentive, and truly cares about his patients. He takes the time to listen, answer questions, and never makes me feel rushed during appointments. I also appreciate how available and supportive he has been whenever I've had concerns between visits.",
    name: "Ana Laura Mouraopen",
    context: "Empathetic and Available",
  },
];

export const FAQS = [
  {
    q: "What conditions does Turquoise Institute treat?",
    a: "We specialize in the diagnosis and treatment of chronic headache disorders, chronic pain, facial pain, musculoskeletal conditions, nerve pain and joint disorders. This includes spine pain, facial pain, headache, migraine, sciatica, neuropathy and TMJ pain, as well as neck and back pain, osteoarthritis, knee and shoulder pain, tendon injuries and other complex pain conditions.",
  },
  {
    q: "Do you treat migraine and headache conditions?",
    a: "Yes. Dr. Tolebeyan has specialized fellowship training in Headache and Facial Pain Medicine and provides comprehensive evaluation and treatment for migraine, chronic headache disorders, neuralgias, facial pain and other complex headache conditions.",
  },
  {
    q: "Do you treat sciatica?",
    a: "Yes. Sciatica and other nerve-related pain are among the conditions we evaluate and treat. Care may include image-guided, minimally invasive procedures such as peripheral nerve blocks, alongside a personalized treatment plan.",
  },
  {
    q: "Do you treat neuropathy?",
    a: "Yes. Neuropathy is one of the nerve pain conditions we treat. Our focus is on identifying the underlying cause and developing an individualized plan, which may include interventional and regenerative options.",
  },
  {
    q: "Do you treat TMJ and facial pain?",
    a: "Yes. TMJ disorders, trigeminal neuralgia and other facial pain conditions are a core part of our practice, drawing on Dr. Tolebeyan's fellowship training in Headache and Facial Pain Medicine.",
  },
  {
    q: "What happens during the first consultation?",
    a: "New patient consultations are typically 60 minutes, allowing sufficient time for a detailed history, comprehensive evaluation and personalized treatment planning. In many cases, same-day diagnosis and treatment may be available depending on your treatment plan.",
  },
  {
    q: "How do I schedule an appointment?",
    a: "Appointments can be requested online or by calling our office directly at (978) 440-0021. No referral is necessary — patients may schedule directly with our office. Telemedicine consultations are also available for appropriate patients.",
  },
  {
    q: "Where is Turquoise Institute located?",
    a: "Turquoise Institute is located at 10 Union Street, Suite 2D, Natick, MA 01760.",
  },
  {
    q: "Which communities do you serve?",
    a: "From our Natick office we care for patients throughout MetroWest and Greater Boston, including Wellesley, Weston, Newton, Wayland, Sudbury, Sherborn, Lincoln, Concord and Lexington, as well as the 02494 (Needham) area.",
  },
  {
    q: "What should I bring to my appointment?",
    a: "Please bring any relevant medical records, imaging studies (MRI, CT, X-rays), medication lists, previous procedure reports and insurance information if you plan to seek out-of-network reimbursement.",
  },
  {
    q: "Do you accept insurance?",
    a: "Turquoise Institute operates as a direct-pay, out-of-network practice and does not participate with commercial insurance plans or Medicare/Medicaid. Patients receive an itemized statement and receipt that may be submitted to their insurance company for possible out-of-network reimbursement. Most regenerative treatments are considered self-pay services.",
  },
];
