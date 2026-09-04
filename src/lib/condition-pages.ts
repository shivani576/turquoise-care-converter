// Per-condition landing page content. Clinical claims are kept general and
// consistent with turquoiseinstitute.com — no fabricated statistics or outcomes.
import { CONDITIONS, type Condition, type ConditionId } from "./site";

export interface ConditionPage {
  eyebrow: string;
  headline: string;
  subheadline: string;
  title: string;
  description: string;
  /** "Does this sound like you?" checklist */
  signs: string[];
  /** How we evaluate this condition */
  evaluation: string;
  /** Treatment approaches discussed at the consultation */
  treatments: { title: string; text: string }[];
  /** Why see a specialist — condition specific differentiator */
  whySpecialist: string;
  faqs: { q: string; a: string }[];
  /** Which testimonials contexts to prioritize */
  testimonialContext?: string;
}

const CONSULT_FAQS = [
  {
    q: "What happens during the first consultation?",
    a: "New patient consultations are typically 60 minutes, allowing time for a detailed history, comprehensive evaluation and personalized treatment planning. In many cases, same-day diagnosis and treatment may be available depending on your plan.",
  },
  {
    q: "Do I need a referral?",
    a: "No referral is necessary. You can request a consultation online or by calling (978) 440-0021. Telemedicine consultations are also available for appropriate patients.",
  },
  {
    q: "Do you accept insurance?",
    a: "Turquoise Institute is a direct-pay, out-of-network practice and does not participate with commercial insurance plans or Medicare/Medicaid. You receive an itemized statement that may be submitted to your insurer for possible out-of-network reimbursement.",
  },
  {
    q: "Where are you located?",
    a: "10 Union Street, Suite 2D, Natick, MA 01760 — minutes from Wellesley, Weston and Newton, and an easy drive from Wayland, Sudbury, Sherborn, Lincoln, Concord, Lexington and the 02494 Needham area.",
  },
];

export const CONDITION_PAGES: Record<ConditionId, ConditionPage> = {
  migraine: {
    eyebrow: "Migraine Specialist · Natick, MA",
    headline: "Migraine Is a Neurological Disease — Not \"Just a Headache.\"",
    subheadline:
      "Comprehensive migraine diagnosis and treatment from a fellowship-trained headache specialist, including migraine procedures and injections. Serving MetroWest & Greater Boston.",
    title: "Migraine Specialist in Natick, MA | Turquoise Institute",
    description:
      "Fellowship-trained migraine specialist in Natick, MA. Comprehensive diagnosis, migraine procedures and injections. 60-minute consultations, no referral needed. Serving Wellesley, Weston, Newton & MetroWest.",
    signs: [
      "Throbbing or pulsing pain, often on one side of the head",
      "Sensitivity to light, sound or smell during attacks",
      "Nausea, vomiting or visual aura before the pain",
      "Attacks that last hours to days and disrupt work or family life",
      "Medications that no longer work — or that you take more days than not",
      "You've been told it's \"just stress\" or \"just a headache\"",
    ],
    evaluation:
      "Migraine is diagnosed clinically, which is why time matters. Your consultation includes a detailed headache history, review of prior imaging and treatments, a neurological examination and identification of triggers and medication-overuse patterns — so your plan targets your migraine, not a generic one.",
    treatments: [
      { title: "Accurate diagnosis", text: "Distinguishing migraine from tension-type, cluster, cervicogenic and other headache disorders that are often confused with it." },
      { title: "Preventive & acute plans", text: "Evidence-based medication strategies designed to reduce attack frequency and treat attacks effectively when they occur." },
      { title: "Migraine procedures & injections", text: "Targeted, in-office options such as nerve blocks and injection-based treatments for appropriate patients." },
      { title: "Ongoing partnership", text: "Follow-up and adjustment over time, with a physician who is available between visits." },
    ],
    whySpecialist:
      "Dr. Tolebeyan completed a fellowship in Headache and Facial Pain Medicine — dedicated training that most general practices do not have. That depth changes what is possible for complex or long-standing migraine.",
    faqs: [
      {
        q: "Do you treat migraine and chronic headache conditions?",
        a: "Yes. Dr. Tolebeyan has specialized fellowship training in Headache and Facial Pain Medicine and provides comprehensive evaluation and treatment for migraine, chronic headache disorders, neuralgias and other complex headache conditions.",
      },
      {
        q: "What migraine treatments do you offer?",
        a: "Care is individualized and may include preventive and acute medication strategies, migraine procedures and injections such as nerve blocks, and lifestyle and trigger management. The right combination is determined at your consultation.",
      },
      ...CONSULT_FAQS,
    ],
    testimonialContext: "Migraines",
  },
  headache: {
    eyebrow: "Headache Specialist · Natick, MA",
    headline: "Frequent Headaches Deserve More Than a Quick Prescription.",
    subheadline:
      "Tension-type, cluster, occipital neuralgia and post-concussion headache — evaluated and treated by a fellowship-trained headache specialist in Natick.",
    title: "Headache Specialist in Natick, MA | Turquoise Institute",
    description:
      "Chronic and frequent headache evaluation by a fellowship-trained headache specialist in Natick, MA. Tension-type, cluster, occipital neuralgia & post-concussion headache. No referral needed.",
    signs: [
      "Headaches several days a week — or nearly every day",
      "Pressure, tightness or a band-like ache around the head",
      "Pain at the base of the skull that spreads upward",
      "Severe, one-sided attacks around the eye that come in clusters",
      "Headaches that began after a concussion or head injury",
      "Relying on over-the-counter pain relievers most days",
    ],
    evaluation:
      "There are many headache types, and each is treated differently. Your 60-minute consultation focuses on identifying which one — or which combination — you have, including whether medication overuse or a neck or nerve source is contributing.",
    treatments: [
      { title: "Precise classification", text: "Tension-type, cluster, cervicogenic, occipital neuralgia, post-traumatic and medication-overuse headache each require a different plan." },
      { title: "Targeted procedures", text: "Image-guided and landmark-based nerve blocks for appropriate headache disorders, performed in-office." },
      { title: "Medication strategy", text: "Preventive and acute options selected to reduce frequency and break cycles of daily use." },
      { title: "Whole-picture care", text: "Attention to sleep, neck pain, jaw and facial contributors that often drive chronic headache." },
    ],
    whySpecialist:
      "Fellowship training in Headache and Facial Pain Medicine means your headache is evaluated by a physician who focuses on headache disorders every day — not as one problem among many.",
    faqs: [
      {
        q: "Which headache types do you treat?",
        a: "We evaluate and treat chronic and frequent headache disorders including tension-type headache, cluster headache, occipital neuralgia, cervicogenic headache, post-concussion headache and medication-overuse headache, as well as migraine.",
      },
      ...CONSULT_FAQS,
    ],
    testimonialContext: "Migraines",
  },
  "spine-pain": {
    eyebrow: "Spine Pain Specialist · Natick, MA",
    headline: "Neck & Back Pain That Limits Your Life? Start With the Cause.",
    subheadline:
      "Careful, cause-first evaluation of neck, mid-back and lower-back pain — with minimally invasive, image-guided treatment options from a board-certified interventional pain physician.",
    title: "Spine, Neck & Back Pain Specialist in Natick, MA | Turquoise Institute",
    description:
      "Board-certified interventional pain specialist for neck, mid-back and lower-back pain in Natick, MA. Image-guided, minimally invasive treatment. 60-minute consultations, no referral needed.",
    signs: [
      "Neck or back stiffness that is worse in the morning or after sitting",
      "Pain that radiates into the shoulder, arm, buttock or leg",
      "Difficulty standing, walking or sleeping comfortably",
      "Pain that has lasted more than a few weeks despite rest or therapy",
      "Prior imaging showing disc, joint or nerve changes — but no clear plan",
      "Being told surgery is the only next step",
    ],
    evaluation:
      "Spine pain can come from discs, facet joints, sacroiliac joints, muscles or nerves — and often more than one. We combine a detailed history, hands-on examination and review of your imaging to pinpoint the pain generator before recommending treatment.",
    treatments: [
      { title: "Diagnostic precision", text: "Identifying whether joints, discs, nerves or soft tissue are driving your pain." },
      { title: "Image-guided injections", text: "Minimally invasive, targeted procedures aimed at the confirmed source of pain." },
      { title: "Regenerative options", text: "Regenerative medicine approaches for appropriate patients as part of an individualized plan." },
      { title: "Conservative foundations", text: "Movement, activity and medication guidance that supports long-term results." },
    ],
    whySpecialist:
      "Dr. Tolebeyan is board-certified and fellowship-trained in Interventional Pain Medicine, offering non-surgical options many patients have not been told about.",
    faqs: [
      {
        q: "Do you treat neck and back pain?",
        a: "Yes. Spine pain — including neck, mid-back and lower-back pain from disc, joint, muscular and nerve-related causes — is a core part of our practice, with a focus on identifying the source and offering minimally invasive options.",
      },
      ...CONSULT_FAQS,
    ],
  },
  sciatica: {
    eyebrow: "Sciatica Specialist · Natick, MA",
    headline: "Shooting Leg Pain From Your Back? Sciatica Has a Cause — Let's Find It.",
    subheadline:
      "Sciatica is a symptom, not a diagnosis. We identify what is irritating the sciatic nerve and treat it with targeted, minimally invasive care.",
    title: "Sciatica Treatment in Natick, MA | Turquoise Institute",
    description:
      "Sciatica evaluation and minimally invasive treatment in Natick, MA. Board-certified interventional pain specialist, image-guided nerve procedures. No referral needed. Serving MetroWest.",
    signs: [
      "Pain that starts in the lower back or buttock and travels down one leg",
      "Numbness, tingling or weakness in the leg or foot",
      "Pain that is worse when sitting, coughing or sneezing",
      "Burning or electric-like sensations along the back of the leg",
      "Difficulty standing up straight or walking any distance",
      "Symptoms lasting more than a few weeks",
    ],
    evaluation:
      "Sciatic pain may come from a disc, spinal narrowing, the piriformis muscle or the sacroiliac joint. Your consultation includes a focused neurological and musculoskeletal examination and imaging review to identify the true source.",
    treatments: [
      { title: "Source identification", text: "Confirming where and why the nerve is irritated before any procedure." },
      { title: "Image-guided nerve procedures", text: "Minimally invasive options such as peripheral nerve blocks and targeted injections for appropriate patients." },
      { title: "Relief plus recovery", text: "A plan that addresses pain now and supports return to walking, sitting and sleeping comfortably." },
      { title: "Clear next steps", text: "Honest guidance on when conservative care is enough and when further evaluation is warranted." },
    ],
    whySpecialist:
      "Interventional pain fellowship training means precise, image-guided treatment of the nerve — not trial-and-error.",
    faqs: [
      {
        q: "Do you treat sciatica?",
        a: "Yes. Sciatica and other nerve-related pain are among the conditions we evaluate and treat. Care may include image-guided, minimally invasive procedures such as peripheral nerve blocks, alongside a personalized treatment plan.",
      },
      ...CONSULT_FAQS,
    ],
  },
  neuropathy: {
    eyebrow: "Neuropathy Specialist · Natick, MA",
    headline: "Burning, Tingling or Numb Hands and Feet? Nerve Pain Can Be Treated.",
    subheadline:
      "Neuropathy evaluation focused on the underlying cause — with interventional and regenerative options for appropriate patients.",
    title: "Neuropathy & Nerve Pain Treatment in Natick, MA | Turquoise Institute",
    description:
      "Neuropathy and nerve pain evaluation in Natick, MA. Cause-focused diagnosis, interventional and regenerative options. Board-certified pain specialist, no referral needed. Serving MetroWest.",
    signs: [
      "Burning, tingling or pins-and-needles in the feet or hands",
      "Numbness that makes walking or handling objects harder",
      "Sensitivity to light touch — bedsheets or socks feel painful",
      "Symptoms that are worse at night and disrupt sleep",
      "Weakness or balance problems",
      "A diagnosis of neuropathy without a clear treatment plan",
    ],
    evaluation:
      "Neuropathy has many possible causes. We take a detailed history, perform a focused neurological examination and review prior testing to understand the type and source of your nerve pain — then build a plan around it.",
    treatments: [
      { title: "Cause-focused diagnosis", text: "Understanding what is driving your nerve symptoms is the foundation of treatment." },
      { title: "Interventional options", text: "Targeted nerve procedures for appropriate patients to reduce pain signals." },
      { title: "Regenerative medicine", text: "Regenerative approaches considered as part of an individualized plan where suitable." },
      { title: "Medication & support", text: "Evidence-based nerve pain medications and practical guidance for daily comfort." },
    ],
    whySpecialist:
      "Nerve pain is a specialty in itself. Board certification and fellowship training in interventional pain medicine bring options beyond a standard prescription.",
    faqs: [
      {
        q: "Do you treat neuropathy?",
        a: "Yes. Neuropathy is one of the nerve pain conditions we treat. Our focus is on identifying the underlying cause and developing an individualized plan, which may include interventional and regenerative options.",
      },
      ...CONSULT_FAQS,
    ],
  },
  "facial-pain": {
    eyebrow: "Facial Pain Specialist · Natick, MA",
    headline: "Sharp, Persistent Facial Pain? You Deserve a Specialist Who Understands It.",
    subheadline:
      "Trigeminal neuralgia and other nerve-related facial pain, evaluated and treated by a physician fellowship-trained in Headache and Facial Pain Medicine.",
    title: "Facial Pain & Trigeminal Neuralgia Specialist in Natick, MA | Turquoise Institute",
    description:
      "Facial pain and trigeminal neuralgia specialist in Natick, MA. Fellowship-trained in Headache & Facial Pain Medicine. Comprehensive evaluation, targeted treatment. No referral needed.",
    signs: [
      "Sharp, electric-shock-like pain in the cheek, jaw or forehead",
      "Pain triggered by touch, chewing, talking or a breeze on the face",
      "Aching or burning across one side of the face",
      "Dental work that didn't resolve the pain",
      "Episodes that are becoming more frequent or intense",
      "Being passed between dentists and doctors without answers",
    ],
    evaluation:
      "Facial pain is frequently misdiagnosed. Your consultation carefully distinguishes trigeminal neuralgia from TMJ disorders, dental causes, sinus issues and other neuralgias so treatment is aimed at the right target.",
    treatments: [
      { title: "Expert differential diagnosis", text: "Separating nerve-driven pain from joint, dental and other causes." },
      { title: "Targeted nerve treatment", text: "Nerve blocks and injection-based procedures for appropriate facial pain conditions." },
      { title: "Medication management", text: "Evidence-based options specific to neuralgia and neuropathic facial pain." },
      { title: "Coordinated care", text: "Clear communication with your dentist or other providers when helpful." },
    ],
    whySpecialist:
      "Fellowship training in Headache and Facial Pain Medicine is rare — and it is exactly what complex facial pain requires.",
    faqs: [
      {
        q: "Do you treat trigeminal neuralgia and facial pain?",
        a: "Yes. Trigeminal neuralgia, TMJ disorders and other facial pain conditions are a core part of our practice, drawing on Dr. Tolebeyan's fellowship training in Headache and Facial Pain Medicine.",
      },
      ...CONSULT_FAQS,
    ],
  },
  "tmj-pain": {
    eyebrow: "TMJ Pain Specialist · Natick, MA",
    headline: "Jaw Pain, Clicking or Ear Aching? Get to the Root of Your TMJ Pain.",
    subheadline:
      "Temporomandibular joint pain often overlaps with headache and facial pain. We evaluate the whole picture and treat with targeted, minimally invasive options.",
    title: "TMJ Pain Treatment in Natick, MA | Turquoise Institute",
    description:
      "TMJ jaw pain evaluation and minimally invasive treatment in Natick, MA. Fellowship-trained in Headache & Facial Pain Medicine. No referral needed. Serving Wellesley, Newton & MetroWest.",
    signs: [
      "Jaw pain, clicking or popping when opening or chewing",
      "Aching around the ear or temple",
      "Jaw that locks, feels tight or tires easily",
      "Morning headaches or facial soreness from clenching",
      "Night guards or dental treatment that haven't been enough",
      "Pain that spreads to the neck or head",
    ],
    evaluation:
      "TMJ pain can involve the joint, surrounding muscles and nearby nerves — and frequently coexists with headache or facial pain. Your consultation evaluates all of these so treatment addresses what is truly driving your symptoms.",
    treatments: [
      { title: "Comprehensive assessment", text: "Joint, muscle and nerve contributors evaluated together, not in isolation." },
      { title: "Targeted injections", text: "Minimally invasive, in-office options for the joint and surrounding muscles for appropriate patients." },
      { title: "Headache & facial pain expertise", text: "Treatment that accounts for overlapping headache and neuralgia patterns." },
      { title: "Coordinated care", text: "Collaboration with your dentist or oral specialist when appropriate." },
    ],
    whySpecialist:
      "Because TMJ pain sits at the intersection of jaw, head and face, a physician fellowship-trained in Headache and Facial Pain Medicine is uniquely positioned to help.",
    faqs: [
      {
        q: "Do you treat TMJ disorders?",
        a: "Yes. TMJ disorders, trigeminal neuralgia and other facial pain conditions are a core part of our practice, drawing on Dr. Tolebeyan's fellowship training in Headache and Facial Pain Medicine.",
      },
      ...CONSULT_FAQS,
    ],
  },
};

export function getCondition(slug: string): Condition | undefined {
  return CONDITIONS.find((c) => c.id === slug);
}

export function isConditionId(slug: string): slug is ConditionId {
  return CONDITIONS.some((c) => c.id === slug);
}
