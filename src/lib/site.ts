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
  | "migraine-treatment"
  | "botox-for-migraine"
  | "tmj-disorder"
  | "botulinum-toxin-spasticity"
  | "prp-injections"
  | "shoulder-pain"
  | "joint-pain-osteoarthritis";

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
    id: "migraine-treatment",
    name: "Migraine Treatment",
    formLabel: "Migraine Treatment",
    scope: "Diagnosis, prevention & acute treatment",
    description:
      "Migraine is a neurological disease, not \"just a headache.\" Comprehensive diagnosis and a personalized prevention and acute treatment plan from a fellowship-trained headache specialist.",
    symptoms: ["Throbbing, one-sided pain", "Light and sound sensitivity", "Nausea or visual aura"],
    url: "https://turquoiseinstitute.com/conditions/migraine-types-causes-symptoms-diagnosis-and-treatment-options/",
    alt: "Patient describing migraine symptoms to a physician during a consultation",
  },
  {
    id: "botox-for-migraine",
    name: "Botox for Migraine",
    formLabel: "Botox for Migraine",
    scope: "Preventive injections for chronic migraine",
    description:
      "Botulinum toxin injections used as a preventive treatment for chronic migraine — administered in-office by a physician fellowship-trained in Headache and Facial Pain Medicine.",
    symptoms: ["15 or more headache days a month", "Preventive medications not working", "Wanting fewer attacks"],
    url: "https://turquoiseinstitute.com/",
    alt: "Physician marking forehead injection points for chronic migraine prevention",
  },
  {
    id: "tmj-disorder",
    name: "TMJ Disorder",
    formLabel: "TMJ Disorder (TMD)",
    scope: "Temporomandibular joint pain & dysfunction",
    description:
      "Temporomandibular joint disorder affecting the jaw, ear and temple — often overlapping with headache and facial pain — evaluated as joint, muscle and nerve together.",
    symptoms: ["Jaw pain, clicking or locking", "Pain when chewing", "Ear or temple aching"],
    url: "https://turquoiseinstitute.com/conditions/temporomandibular-joint-tmj-pain-types-causes-symptoms-and-treatment-option/",
    alt: "Physician explaining jaw joint anatomy to a patient with TMJ disorder",
  },
  {
    id: "botulinum-toxin-spasticity",
    name: "Botulinum Toxin for Spasticity & Cervical Dystonia",
    formLabel: "Botulinum Toxin (Spasticity / Cervical Dystonia)",
    scope: "Botox, Xeomin & Dysport injections",
    description:
      "Targeted botulinum toxin injections (Botox, Xeomin, Dysport) to reduce muscle overactivity in spasticity and cervical dystonia, improving comfort, posture and function.",
    symptoms: ["Involuntary neck pulling or twisting", "Tight, stiff muscles", "Painful spasms or cramping"],
    url: "https://turquoiseinstitute.com/",
    alt: "Clinician administering a botulinum toxin injection into neck muscles for cervical dystonia",
  },
  {
    id: "prp-injections",
    name: "PRP Injections",
    formLabel: "Platelet-Rich Plasma (PRP) Injections",
    scope: "Regenerative treatment for joints & tendons",
    description:
      "Platelet-rich plasma prepared from your own blood and injected into the painful joint or tendon as part of a regenerative treatment plan for appropriate patients.",
    symptoms: ["Ongoing joint or tendon pain", "Injuries slow to heal", "Looking for non-surgical options"],
    url: "https://turquoiseinstitute.com/",
    alt: "Gloved hand holding a tube of platelet-rich plasma prepared for injection",
  },
  {
    id: "shoulder-pain",
    name: "Shoulder & Rotator Cuff Pain",
    formLabel: "Shoulder / Rotator Cuff Pain",
    scope: "Rotator cuff tears, tendon & joint pain",
    description:
      "Shoulder pain from rotator cuff tears, tendon injury, bursitis or joint wear — evaluated precisely, then treated with image-guided and regenerative options where appropriate.",
    symptoms: ["Pain lifting or reaching overhead", "Night pain lying on the shoulder", "Weakness or limited motion"],
    url: "https://turquoiseinstitute.com/",
    alt: "Physician examining an adult patient's shoulder for rotator cuff pain",
  },
  {
    id: "joint-pain-osteoarthritis",
    name: "Joint Pain & Osteoarthritis",
    formLabel: "Joint Pain / Osteoarthritis",
    scope: "Knee, hip, shoulder & hand osteoarthritis",
    description:
      "Osteoarthritis and other joint pain in the knee, hip, shoulder and hand — with image-guided injections and regenerative options aimed at comfort and mobility, not just prescriptions.",
    symptoms: ["Stiff, aching joints in the morning", "Pain with walking or stairs", "Swelling or grinding"],
    url: "https://turquoiseinstitute.com/",
    alt: "Doctor examining an older patient's knee affected by osteoarthritis",
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
    a: "Our focused services include migraine treatment, Botox for chronic migraine, TMJ disorder (TMD), botulinum toxin (Botox, Xeomin, Dysport) for spasticity and cervical dystonia, platelet-rich plasma (PRP) injections, shoulder and rotator cuff pain treatment, and joint pain and osteoarthritis treatment.",
  },
  {
    q: "Do you treat migraine and headache conditions?",
    a: "Yes. Dr. Tolebeyan has specialized fellowship training in Headache and Facial Pain Medicine and provides comprehensive evaluation and treatment for migraine, chronic headache disorders, neuralgias, facial pain and other complex headache conditions.",
  },
  {
    q: "Do you offer Botox and other botulinum toxin injections?",
    a: "Yes. We provide botulinum toxin injections (Botox, Xeomin, Dysport) for chronic migraine prevention and for spasticity and cervical dystonia, with product, dose and injection sites individualized to you.",
  },
  {
    q: "What is PRP, and what do you use it for?",
    a: "Platelet-rich plasma is prepared by concentrating the platelet portion of a small sample of your own blood, then injected into a painful joint or tendon. We use it as part of regenerative treatment plans for joint, osteoarthritis, shoulder and tendon pain in appropriate patients.",
  },
  {
    q: "Do you treat TMJ disorder?",
    a: "Yes. TMJ disorder (TMD) is a core part of our practice, drawing on Dr. Tolebeyan's fellowship training in Headache and Facial Pain Medicine, and is evaluated as joint, muscle and nerve together.",
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
