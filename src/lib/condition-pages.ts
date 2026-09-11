// Per-service landing page content. Clinical claims are kept general and
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
  whySpecialist?: string;
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
    a: "Turquoise Institute is a direct-pay, out-of-network practice and does not participate with commercial insurance plans or Medicare/Medicaid. You receive an itemized statement that may be submitted to your insurer for possible out-of-network reimbursement. Most regenerative treatments are considered self-pay services.",
  },
  {
    q: "Where are you located?",
    a: "10 Union Street, Suite 2D, Natick, MA 01760 — minutes from Wellesley, Weston and Newton, and an easy drive from Wayland, Sudbury, Sherborn, Lincoln, Concord, Lexington and the 02494 Needham area.",
  },
];

export const CONDITION_PAGES: Record<ConditionId, ConditionPage> = {
  "migraine-treatment": {
    eyebrow: "Migraine Specialist · Natick, MA",
    headline: "Migraine Treatment Starts with Understanding Your Migraine",
    subheadline:
      "Meet with a fellowship-trained headache specialist in Natick for a comprehensive 60-minute evaluation and a personalized plan for prevention and acute treatment. No referral needed.",
    title: "Migraine Treatment in Natick, MA | Turquoise Institute",
    description:
      "Fellowship-trained migraine specialist in Natick, MA. Accurate diagnosis, preventive and acute treatment, migraine procedures and injections. 60-minute consultations, no referral needed.",
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
      { title: "Procedures & injections", text: "Targeted in-office options such as nerve blocks and botulinum toxin injections for appropriate patients." },
      { title: "Ongoing partnership", text: "Follow-up and adjustment over time, with a physician who is available between visits." },
    ],
    whySpecialist:
      "Dr. Tolebeyan completed a fellowship in Headache and Facial Pain Medicine — dedicated training that most general practices do not have. That depth changes what is possible for complex or long-standing migraine.",
    faqs: [
      {
        q: "What migraine treatments do you offer?",
        a: "Care is individualized and may include preventive and acute medication strategies, migraine procedures and injections such as nerve blocks and botulinum toxin, and trigger management. The right combination is determined at your consultation.",
      },
      ...CONSULT_FAQS,
    ],
    testimonialContext: "Migraines",
  },
  "botox-for-migraine": {
    eyebrow: "Botox for Chronic Migraine · Natick, MA",
    headline: "Botox for Chronic Migraine — Fewer Attacks, Administered by a Headache Specialist.",
    subheadline:
      "Botulinum toxin injections for chronic migraine prevention, performed in-office by a physician fellowship-trained in Headache and Facial Pain Medicine.",
    title: "Botox for Migraine in Natick, MA | Turquoise Institute",
    description:
      "Botox (botulinum toxin) injections for chronic migraine prevention in Natick, MA. Administered by a fellowship-trained headache specialist. 60-minute consultations, no referral needed.",
    signs: [
      "Headache on 15 or more days a month",
      "Migraine that has become chronic over time",
      "Preventive tablets that didn't help or caused side effects",
      "Frequent use of acute medication or rescue treatments",
      "Attacks that keep you from work, driving or family plans",
      "You want a preventive option that isn't a daily pill",
    ],
    evaluation:
      "Botox is only the right answer for some patients. Your consultation confirms whether your headache pattern fits chronic migraine, reviews what you've already tried, and rules out other headache types before any injection is recommended.",
    treatments: [
      { title: "Confirm candidacy", text: "A careful headache history and examination to confirm chronic migraine before treatment is offered." },
      { title: "In-office injections", text: "Botulinum toxin administered at established head, forehead, temple and neck sites by a headache specialist." },
      { title: "A complete plan", text: "Injections combined with acute treatment, trigger management and other preventives where helpful." },
      { title: "Tracked results", text: "Headache-day tracking between visits so the plan is adjusted on evidence, not guesswork." },
    ],
    whySpecialist:
      "Where the injections go — and whether they are the right treatment at all — depends on headache expertise. Fellowship training in Headache and Facial Pain Medicine is exactly that.",
    faqs: [
      {
        q: "Which botulinum toxin products do you use?",
        a: "We use botulinum toxin products such as Botox, Xeomin and Dysport, selected for your treatment plan and discussed with you before treatment.",
      },
      {
        q: "How often are the injections repeated?",
        a: "Botulinum toxin for migraine prevention is typically repeated on a regular schedule. Your specific interval and dose are determined at your consultation and adjusted based on your response.",
      },
      ...CONSULT_FAQS,
    ],
    testimonialContext: "Migraines",
  },
  "tmj-disorder": {
    eyebrow: "TMJ Disorder Specialist · Natick, MA",
    headline: "Targeted Injection Treatments for TMJ-Related Pain",
    subheadline:
      "For patients with an established TMJ diagnosis, we offer minimally invasive treatment options, including botulinum toxin injections, trigger point injections, and image-guided intra-articular corticosteroid or PRP injections.",
    title: "TMJ Disorder Treatment in Natick, MA | Turquoise Institute",
    description:
      "TMJ disorder (TMD) evaluation and minimally invasive treatment in Natick, MA. Fellowship-trained in Headache & Facial Pain Medicine. No referral needed. Serving Wellesley, Newton & MetroWest.",
    signs: [
      "Jaw pain, clicking or popping when opening or chewing",
      "Aching around the ear or temple",
      "Jaw that locks, feels tight or tires easily",
      "Morning headaches or facial soreness from clenching",
      "Night guards or dental treatment that haven't been enough",
      "Pain that spreads to the neck or head",
    ],
    evaluation:
      "TMJ disorder can involve the joint, surrounding muscles and nearby nerves — and frequently coexists with headache or facial pain. Your consultation evaluates all of these so treatment addresses what is truly driving your symptoms.",
    treatments: [
      { title: "Comprehensive assessment", text: "Joint, muscle and nerve contributors evaluated together, not in isolation." },
      { title: "Targeted injections", text: "Minimally invasive, in-office options for the joint and surrounding muscles for appropriate patients." },
      { title: "Headache & facial pain expertise", text: "Treatment that accounts for overlapping headache and neuralgia patterns." },
      { title: "Coordinated care", text: "Collaboration with your dentist or oral specialist when appropriate." },
    ],
    whySpecialist:
      "Because TMJ disorder sits at the intersection of jaw, head and face, a physician fellowship-trained in Headache and Facial Pain Medicine is uniquely positioned to help.",
    faqs: [
      {
        q: "Do you treat TMJ disorders?",
        a: "Yes. TMJ disorders, trigeminal neuralgia and other facial pain conditions are a core part of our practice, drawing on Dr. Tolebeyan's fellowship training in Headache and Facial Pain Medicine.",
      },
      ...CONSULT_FAQS,
    ],
  },
  "botulinum-toxin-spasticity": {
    eyebrow: "Botox · Xeomin · Dysport · Natick, MA",
    headline: "Botulinum Toxin for Spasticity and Cervical Dystonia.",
    subheadline:
      "Targeted Botox, Xeomin and Dysport injections for cervical dystonia and spasticity related to stroke or multiple sclerosis — helping reduce muscle overactivity, painful spasms and involuntary neck pulling while improving movement and function.",
    title: "Botulinum Toxin for Spasticity & Cervical Dystonia in Natick, MA | Turquoise Institute",
    description:
      "Botox, Xeomin and Dysport injections for spasticity and cervical dystonia in Natick, MA. Targeted, in-office treatment by a board-certified physician. No referral needed.",
    signs: [
      "Involuntary neck turning, tilting or pulling",
      "Tight, stiff muscles that resist stretching",
      "Painful spasms or cramping",
      "Muscle overactivity after stroke, injury or a neurological condition",
      "Difficulty with posture, driving or holding your head still",
      "Oral medications that caused drowsiness or didn't help enough",
    ],
    evaluation:
      "Effective treatment depends on identifying exactly which muscles are overactive. Your consultation includes a detailed history and hands-on examination of movement, posture and muscle tone so injections are placed where they will do the most good.",
    treatments: [
      { title: "Muscle mapping", text: "Careful examination to identify the specific overactive muscles driving your symptoms." },
      { title: "Targeted injections", text: "Botox, Xeomin or Dysport injected at individualized sites and doses, performed in-office." },
      { title: "Function first", text: "Goals set around what you want back — comfort, posture, sleep, grooming, driving or work." },
      { title: "Scheduled follow-up", text: "Response reviewed and doses refined over subsequent treatment cycles." },
    ],
    faqs: [
      {
        q: "Which products do you use, and how do you choose?",
        a: "We use botulinum toxin products including Botox, Xeomin and Dysport. Product, dose and injection sites are selected for your muscles and goals and discussed with you before treatment.",
      },
      {
        q: "How long does treatment last?",
        a: "Botulinum toxin effects are temporary and treatment is repeated on a regular schedule. Your interval is determined at your consultation and adjusted based on how you respond.",
      },
      ...CONSULT_FAQS,
    ],
  },
  "prp-injections": {
    eyebrow: "Regenerative Medicine · Natick, MA",
    headline: "Platelet-Rich Plasma (PRP) — Your Own Biology, Directed at the Painful Joint.",
    subheadline:
      "PRP prepared from a small sample of your own blood and injected into the joint or tendon that hurts, as part of a personalized regenerative plan for appropriate patients.",
    title: "PRP Injections in Natick, MA | Turquoise Institute",
    description:
      "Platelet-rich plasma (PRP) injections for joint and tendon pain in Natick, MA. Regenerative medicine from a board-certified interventional pain physician. No referral needed.",
    signs: [
      "Joint or tendon pain that has lasted months",
      "Osteoarthritis pain in the knee, hip, shoulder or hand",
      "Tendon problems that keep coming back",
      "Cortisone injections that helped only briefly",
      "You would rather avoid or delay surgery",
      "You want an option that works with your own biology",
    ],
    evaluation:
      "PRP is not right for every problem, and being honest about that matters. Your consultation includes a hands-on examination and review of your imaging to confirm the source of pain and whether a regenerative approach makes sense for you.",
    treatments: [
      { title: "Honest candidacy review", text: "A clear assessment of whether PRP is likely to help your specific joint or tendon." },
      { title: "Prepared from your blood", text: "A small blood sample is drawn and concentrated in-office to prepare the platelet-rich plasma." },
      { title: "Precise placement", text: "Image-guided injection into the confirmed target for appropriate patients." },
      { title: "Recovery plan", text: "Activity and rehabilitation guidance afterward so the treatment has the best chance to work." },
    ],
    faqs: [
      {
        q: "What is PRP?",
        a: "Platelet-rich plasma is prepared by concentrating the platelet portion of a small sample of your own blood, which is then injected into the painful joint or tendon as part of a regenerative treatment plan.",
      },
      {
        q: "Is PRP covered by insurance?",
        a: "Most regenerative treatments, including PRP, are considered self-pay services. Turquoise Institute is a direct-pay, out-of-network practice and provides an itemized statement you may submit to your insurer.",
      },
      ...CONSULT_FAQS,
    ],
  },
  "shoulder-pain": {
    eyebrow: "Shoulder & Rotator Cuff Pain · Natick, MA",
    headline: "Shoulder Pain That Wakes You Up Deserves a Real Diagnosis.",
    subheadline:
      "Rotator cuff tears, tendon injury, bursitis and joint wear evaluated precisely — then treated with image-guided and regenerative options, not just another prescription.",
    title: "Shoulder & Rotator Cuff Pain Treatment in Natick, MA | Turquoise Institute",
    description:
      "Shoulder and rotator cuff pain treatment in Natick, MA. Precise diagnosis, image-guided injections and regenerative options from a board-certified pain physician. No referral needed.",
    signs: [
      "Pain lifting your arm or reaching overhead",
      "Night pain when lying on that shoulder",
      "Weakness putting on a coat or reaching behind you",
      "A catching or grinding sensation with movement",
      "Pain that began after a fall or lifting injury",
      "An MRI showing a rotator cuff tear — but no clear plan",
    ],
    evaluation:
      "Shoulder pain can come from the rotator cuff tendons, the bursa, the joint itself, the labrum or the neck. Your consultation combines a detailed history, targeted physical examination and imaging review to identify which one before any treatment.",
    treatments: [
      { title: "Precise diagnosis", text: "Separating rotator cuff, bursal, joint, labral and neck-related sources of shoulder pain." },
      { title: "Image-guided injections", text: "Minimally invasive, accurately placed injections aimed at the confirmed source." },
      { title: "Regenerative options", text: "PRP and other regenerative approaches considered for suitable tendon and joint problems." },
      { title: "Motion & strength", text: "Rehabilitation guidance so relief translates into a shoulder you can actually use." },
    ],
    whySpecialist:
      "Not every rotator cuff tear needs surgery — and not every shoulder pain is the cuff. Interventional pain and regenerative medicine open up options in between.",

    faqs: [
      {
        q: "Do I need surgery for a rotator cuff tear?",
        a: "Not necessarily. Many tears are managed without surgery. Your consultation reviews your examination and imaging, explains your options honestly, and identifies when a surgical opinion is warranted.",
      },
      ...CONSULT_FAQS,
    ],
  },
  "joint-pain-osteoarthritis": {
    eyebrow: "Joint Pain & Osteoarthritis · Natick, MA",
    headline: "Osteoarthritis Doesn't Have to Decide What You Can Still Do.",
    subheadline:
      "Knee, hip, shoulder and hand joint pain evaluated carefully, then treated with image-guided injections and regenerative options aimed at comfort and mobility.",
    title: "Joint Pain & Osteoarthritis Treatment in Natick, MA | Turquoise Institute",
    description:
      "Osteoarthritis and joint pain treatment in Natick, MA — knee, hip, shoulder and hand. Image-guided injections and regenerative options. Board-certified physician, no referral needed.",
    signs: [
      "Stiff, aching joints in the morning or after sitting",
      "Knee or hip pain with walking, stairs or standing",
      "Swelling, grinding or a catching sensation",
      "Pain that limits golf, tennis, gardening or travel",
      "Daily anti-inflammatories just to get through the day",
      "Being told to wait until you're ready for joint replacement",
    ],
    evaluation:
      "Joint pain is not always the arthritis on the X-ray. Your consultation includes a hands-on joint examination and imaging review to determine how much of your pain is cartilage, soft tissue, alignment or a referred source — then targets it.",
    treatments: [
      { title: "Cause-first assessment", text: "Understanding what is actually generating your pain, not just what imaging shows." },
      { title: "Image-guided injections", text: "Accurately placed joint and soft-tissue injections for appropriate patients." },
      { title: "Regenerative options", text: "PRP and other regenerative approaches considered as part of an individualized plan." },
      { title: "Keep moving", text: "Activity, strength and medication guidance that protects the joint over the long term." },
    ],
    faqs: [
      {
        q: "Which joints do you treat?",
        a: "We commonly evaluate and treat osteoarthritis and other joint pain in the knee, hip, shoulder and hand, as well as related tendon and soft-tissue problems around those joints.",
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
