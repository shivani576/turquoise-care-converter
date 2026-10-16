// Page copy for the home page and each ad-group landing page.
// Voice: talk to the person's problem first, the clinic second. Plain English,
// no outcome guarantees, no invented statistics.
import { CONDITIONS, GENERAL_FAQS, type ConditionId, type Reel } from "./site";

export interface PageCopy {
  title: string;
  description: string;
  eyebrow: string;
  /** H1. The part in `highlight` is rendered in the brand accent. */
  headline: string;
  highlight?: string;
  subheadline: string;
  /** Three short reasons shown under the hero copy */
  heroPoints: string[];
  /** Search phrase used in the local section, FAQ and meta ("migraine treatment") */
  localKeyword: string;
  /** Why a specialist matters for this condition (optional callout) */
  whySpecialist?: string | undefined;
  /** Form button text — low-commitment, specific to the page */
  ctaLabel: string;
  /** Pre-selected value of the "What's bothering you most?" field */
  formConcern?: string;
  painTitle: string;
  painPoints: string[];
  painNote: string;
  optionsTitle: string;
  optionsIntro: string;
  options: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  reelTopics: Reel["topic"][];
  finalHeadline: string;
}

const BOTOX_VS_COSMETIC_FAQ = {
  q: "Is Botox for migraine the same as cosmetic Botox?",
  a: "It's the same medicine used in a different way. For chronic migraine, small injections are placed at specific points around the head, neck and shoulders following an FDA-approved protocol, and it's repeated about every 12 weeks. The goal is fewer headache days — not a cosmetic change.",
};

const MIGRAINE_FAQS = [
  BOTOX_VS_COSMETIC_FAQ,
  {
    q: "How soon can I be seen?",
    a: "Call (978) 440-0021 or send the form and our team will find the earliest time that works for you. Telemedicine visits are available for appropriate patients.",
  },
];

export const HOME_PAGE: PageCopy = {
  // Client rule: no "migraine", "jaw" or "joint" and no city in the title, description or
  // first fold of the home page — "pain management" wording. Services are listed below the fold.
  title: "Personalized Pain Management Specialist | Turquoise Institute",
  description:
    "Personalized pain management with Dr. Amir Soheil Tolebeyan, a dual fellowship trained, board-certified pain and headache specialist. Cash-pay clinic, 60-minute first visits. Book a free 15-minute consultation.",
  eyebrow: "",
  headline: "Personalized Pain Management Specialist",
  highlight: "Pain Management",
  subheadline:
    "A full hour with Dr. Amir to find what's driving your pain, and a treatment plan built around you.",
  heroPoints: [
    "Cash-pay clinic — no insurance approvals to wait on",
    "Dual fellowship trained, board-certified physician",
    "No referral needed",
  ],
  localKeyword: "pain management",
  ctaLabel: "Book a Free 15-Minute Consultation",
  painTitle: "Does any of this sound familiar?",
  painPoints: [
    "You've seen several doctors and still don't have a clear answer.",
    "Your appointments feel rushed — 10 minutes and a new prescription.",
    "The pain is making you cancel plans, miss work or skip things you love.",
    "You'd rather avoid surgery, or more pills, if there's another way.",
  ],
  painNote:
    "Ongoing pain is real, and it's treatable — but it needs someone who looks for the cause.",
  optionsTitle: "What we help with",
  optionsIntro: "Pick what's bothering you most to see how we approach it.",
  options: [],
  faqs: [
    {
      q: "What conditions do you treat?",
      a: "Migraine and other headache disorders, Botox for chronic migraine, TMJ and jaw pain, neck spasms and cervical dystonia, PRP injections, shoulder and rotator cuff pain, and knee, hip and other joint pain from arthritis.",
    },
    ...GENERAL_FAQS,
  ],
  reelTopics: ["migraine", "botox", "prp", "pain"],
  finalHeadline: "One unhurried visit can change your whole plan.",
};

export const CONDITION_PAGES: Record<ConditionId, PageCopy> = {
  migraine: {
    title: "Migraine Specialist in Natick, MA | Near Wellesley, Weston & Newton",
    description:
      "Migraine doctor in Natick, MA for patients from Weston, Wellesley, Sudbury, Wayland, Newton and Sherborn. Dual fellowship trained headache specialist, 60-minute first visit, nerve blocks & Botox. No referral needed.",
    eyebrow: "Migraine specialist · Natick, MA",
    headline: "Losing Days to Migraines? See a Headache Specialist.",
    highlight: "See a Headache Specialist",
    subheadline:
      "A dual fellowship trained headache specialist who looks for what's behind your attacks — not just another prescription.",
    heroPoints: [
      "Cash-pay clinic — no insurance approvals to wait on",
      "Nerve blocks & Botox in the office",
      "No referral needed",
    ],
    localKeyword: "migraine treatment",
    whySpecialist:
      "Dr. Tolebeyan completed a fellowship in Headache and Facial Pain Medicine — dedicated training most general practices don't have. That depth changes what's possible for complex or long-standing migraine.",
    ctaLabel: "Book My Migraine Visit",
    formConcern: "Migraine Treatment",
    painTitle: "Does this sound like you?",
    painPoints: [
      "You plan your week around when the next migraine might hit.",
      "You've missed work, family plans or your kids' events because of an attack.",
      "You've tried several medications — they stopped working, or the side effects weren't worth it.",
      "You're reaching for painkillers so often you're worried about it.",
      'You\'ve been told it\'s "just stress" or "just a headache."',
    ],
    painNote:
      "Migraine is a neurological condition, not a weakness — and it's very treatable with the right plan.",
    optionsTitle: "Your treatment options, in plain English",
    optionsIntro:
      "Every plan is built around your headache pattern, history and goals. These are the tools Dr. Amir uses most:",
    options: [
      {
        title: "A clear diagnosis first",
        text: 'Many "migraines" are actually a mix of headache types. Sorting out exactly what you have changes which treatments will work.',
      },
      {
        title: "A prevention plan that fits you",
        text: "The aim is fewer and milder attacks — using preventive medicines, including newer migraine-specific options where appropriate, and a rescue plan for the attacks you still get.",
      },
      {
        title: "Nerve blocks",
        text: "A quick in-office injection that can calm a stubborn stretch of headaches or break a cycle of frequent attacks.",
      },
      {
        title: "Botox for chronic migraine",
        text: "For people with 15 or more headache days a month: quick injections about every 12 weeks, following the FDA-approved protocol.",
      },
      {
        title: "Breaking the rebound cycle",
        text: "Taking pain relievers too often can make headaches more frequent. We help you step off that cycle safely.",
      },
      {
        title: "Your triggers, decoded",
        text: "Sleep, hormones, weather, food, posture — we look at what actually sets off your attacks and what's worth changing.",
      },
    ],
    faqs: [...MIGRAINE_FAQS, ...GENERAL_FAQS],
    reelTopics: ["migraine", "botox"],
    finalHeadline: "You don't have to keep planning your life around migraines.",
  },

  "botox-migraine": {
    title: "Botox for Migraines in Natick, MA | Near Wellesley & Weston",
    description:
      "Botox for chronic migraine in Natick, MA, given by a dual fellowship trained headache specialist. Serving Weston, Wellesley, Sudbury, Wayland, Newton and Sherborn. No referral needed.",
    eyebrow: "Botox for chronic migraine · Natick, MA",
    headline: "15+ Headache Days a Month? Ask About Botox for Chronic Migraine.",
    highlight: "Ask About Botox",
    subheadline:
      "FDA-approved for chronic migraine: a few minutes in the office, about every 12 weeks.",
    heroPoints: [
      "Cash-pay clinic — no insurance approvals to wait on",
      "Given by a headache specialist, not a med spa",
      "No referral needed",
    ],
    localKeyword: "Botox for migraines",
    whySpecialist:
      "Where the injections go — and whether Botox is the right treatment at all — depends on headache expertise. Fellowship training in Headache and Facial Pain Medicine is exactly that.",
    ctaLabel: "See If I Qualify",
    formConcern: "Botox for Migraine",
    painTitle: "Botox may be worth discussing if…",
    painPoints: [
      "You have headaches on 15 or more days a month.",
      "You've tried at least a couple of preventive medications without enough relief.",
      "Daily pills come with side effects you'd rather avoid.",
      "You want fewer attacks — not just something to take once they start.",
    ],
    painNote: "Not sure if you qualify? That's exactly what the first visit is for.",
    optionsTitle: "How Botox for migraine works",
    optionsIntro: "Simple, quick and repeated on a schedule — here's what to expect.",
    options: [
      {
        title: "First, the right diagnosis",
        text: "Dr. Amir confirms you have chronic migraine (not another headache type) and reviews what you've already tried.",
      },
      {
        title: "The treatment visit",
        text: "A series of tiny injections into specific muscles of the forehead, temples, back of the head, neck and shoulders. The injections themselves take just a few minutes.",
      },
      {
        title: "Repeated about every 12 weeks",
        text: "Botox for migraine is a preventive treatment. It's typically given every three months, and benefits often build over the first couple of treatment cycles.",
      },
      {
        title: "Part of a bigger plan",
        text: "Botox can be combined with other preventive and rescue treatments. Your plan is adjusted at follow-ups based on how your headache days change.",
      },
    ],
    faqs: [
      BOTOX_VS_COSMETIC_FAQ,
      {
        q: "Does it hurt?",
        a: "Most people describe a series of quick pinches. The needles are very fine and the visit is short. You can usually go straight back to your day.",
      },
      {
        q: "How long before I notice a difference?",
        a: "Some people notice a change within a few weeks; for others it builds over the first two treatment cycles. Dr. Amir will track your headache days with you to see how it's working.",
      },
      ...GENERAL_FAQS,
    ],
    reelTopics: ["botox", "migraine"],
    finalHeadline: "Find out if Botox is right for your migraines.",
  },

  tmj: {
    title: "TMJ & Jaw Pain Treatment in Natick, MA | Near Wellesley & Weston",
    description:
      "TMJ and jaw pain treatment in Natick, MA from a dual fellowship trained physician (Headache & Facial Pain). Serving Weston, Wellesley, Sudbury, Wayland and Newton. No referral needed.",
    eyebrow: "TMJ & jaw pain · Natick, MA",
    headline: "Jaw Pain, Clenching or Morning Headaches? See a Facial Pain Specialist.",
    highlight: "See a Facial Pain Specialist",
    subheadline:
      "Dual fellowship trained, including facial pain, Dr. Amir treats the jaw and the headaches together.",
    heroPoints: [
      "Cash-pay clinic — no insurance approvals to wait on",
      "In-office injections",
      "No referral needed",
    ],
    localKeyword: "TMJ treatment",
    whySpecialist:
      "TMJ disorder sits where the jaw, head and face meet, so a dual fellowship trained physician — including Headache and Facial Pain Medicine — is well placed to treat it.",
    ctaLabel: "Book My TMJ Visit",
    formConcern: "TMJ Disorder (TMD)",
    painTitle: "Does this sound like you?",
    painPoints: [
      "Your jaw clicks, pops or feels like it gets stuck.",
      "Chewing, yawning or talking for long makes it ache.",
      "You wake up with a sore jaw, tight face or a headache.",
      "You clench or grind — maybe a night guard hasn't been enough.",
      "The pain spreads to your ear, temple or neck.",
    ],
    painNote: "Jaw pain and headaches are often connected. Treating just one usually isn't enough.",
    optionsTitle: "How we approach TMJ pain",
    optionsIntro:
      "We look at the joint, the muscles and the nerves together — then match the treatment to the cause.",
    options: [
      {
        title: "Find the real pain source",
        text: "Joint, muscle, nerve, or a headache disorder that's riding along — each one is treated differently.",
      },
      {
        title: "Muscle-focused injections",
        text: "For overactive jaw and temple muscles, targeted injections (including botulinum toxin when appropriate) can ease clenching and pain.",
      },
      {
        title: "Nerve and trigger point treatments",
        text: "In-office procedures to calm irritated nerves and tight trigger points in the face and neck.",
      },
      {
        title: "Treating the headaches too",
        text: "If migraines or tension-type headaches are part of the picture, they're folded into the same plan.",
      },
    ],
    faqs: [
      {
        q: "Do you work with my dentist?",
        a: "Yes — many patients already have a night guard or dental work. We're happy to coordinate so your dental and medical care fit together.",
      },
      ...GENERAL_FAQS,
    ],
    reelTopics: ["botox", "pain", "migraine"],
    finalHeadline: "Get your jaw — and your headaches — under control.",
  },

  "neck-spasms": {
    title: "Cervical Dystonia & Spasticity Botox in Natick, MA | Turquoise Institute",
    description:
      "Botox, Xeomin and Dysport injections for cervical dystonia and spasticity in Natick, MA. Serving Weston, Wellesley, Newton and nearby towns. No referral needed.",
    eyebrow: "Botox · Xeomin · Dysport · Natick, MA",
    headline: "Neck Pulling, Twisting or Painful Spasms? Targeted Injections Can Help.",
    highlight: "Targeted Injections Can Help",
    subheadline:
      "Precise injections relax overactive neck and limb muscles to ease pain and stiffness.",
    heroPoints: [
      "Cash-pay clinic — no insurance approvals to wait on",
      "Botox, Xeomin & Dysport",
      "No referral needed",
    ],
    localKeyword: "cervical dystonia treatment",
    ctaLabel: "Book My Consultation",
    formConcern: "Botulinum Toxin (Spasticity / Cervical Dystonia)",
    painTitle: "Does this sound like you?",
    painPoints: [
      "Your head pulls, tilts or turns on its own.",
      "Neck or shoulder muscles cramp or spasm painfully.",
      "Stiff, tight muscles make daily tasks harder.",
      "Previous injections helped, but not as much as you hoped.",
    ],
    painNote:
      "These conditions are manageable — the precision of the injections makes a big difference.",
    optionsTitle: "How treatment works",
    optionsIntro: "Careful assessment first, then injections planned muscle by muscle.",
    options: [
      {
        title: "Mapping the muscles",
        text: "We identify exactly which muscles are overactive so the treatment goes where it's needed.",
      },
      {
        title: "Choosing the product",
        text: "Botox, Xeomin or Dysport — chosen and dosed for your situation and your response to past treatment.",
      },
      {
        title: "Repeated on a schedule",
        text: "Effects wear off over a few months, so injections are repeated and fine-tuned at each visit.",
      },
    ],
    faqs: GENERAL_FAQS,
    reelTopics: ["botox", "pain"],
    finalHeadline: "Get relief from muscle spasms that won't let go.",
  },

  prp: {
    title: "PRP Injections in Natick, MA | Near Wellesley, Weston & Newton",
    description:
      "Image-guided PRP injections for knee, shoulder and tendon pain in Natick, MA. Serving Weston, Wellesley, Sudbury, Wayland, Newton and Sherborn. No referral needed.",
    eyebrow: "PRP injections · Natick, MA",
    headline: "Joint or Tendon Pain Not Healing? See If PRP Is Right for You.",
    highlight: "See If PRP Is Right for You",
    subheadline:
      "A non-surgical option made from your own blood, injected under image guidance. We'll tell you honestly if it fits.",
    heroPoints: [
      "Cash-pay clinic — no insurance approvals to wait on",
      "Done in one office visit",
      "No referral needed",
    ],
    localKeyword: "PRP injections",
    ctaLabel: "Check If I'm a Candidate",
    formConcern: "Platelet-Rich Plasma (PRP) Injections",
    painTitle: "PRP may be worth discussing if…",
    painPoints: [
      "A knee, shoulder, elbow or hip has hurt for months.",
      "Physical therapy or rest helped only a little.",
      "Cortisone shots wore off — or you'd like to avoid more of them.",
      "You want to delay or avoid surgery if possible.",
    ],
    painNote:
      "PRP isn't right for everyone — your first visit will tell you honestly whether it's a good fit.",
    optionsTitle: "How PRP works",
    optionsIntro: "Everything happens in one office visit.",
    options: [
      {
        title: "1. A small blood draw",
        text: "Similar to a routine blood test, taken in the office.",
      },
      {
        title: "2. Concentrating the platelets",
        text: "Your blood is spun to separate the platelet-rich plasma — the part involved in your body's repair process.",
      },
      {
        title: "3. Image-guided injection",
        text: "The PRP is injected precisely into the injured tendon or joint, using imaging to guide the needle.",
      },
      {
        title: "4. Recovery and follow-up",
        text: "You'll get clear aftercare instructions. Improvement, when it happens, tends to build gradually over the following weeks.",
      },
    ],
    faqs: [
      {
        q: "Is PRP covered by insurance?",
        a: "PRP is generally considered a self-pay treatment. We'll go over the cost with you before you book.",
      },
      ...GENERAL_FAQS.filter((f) => !f.q.includes("insurance")),
    ],
    reelTopics: ["prp", "pain"],
    finalHeadline: "Find out if PRP could help you avoid surgery.",
  },

  shoulder: {
    title: "Shoulder & Rotator Cuff Pain Treatment in Natick, MA | Near Wellesley",
    description:
      "Non-surgical shoulder and rotator cuff pain treatment in Natick, MA: image-guided injections and PRP. Serving Weston, Wellesley, Newton and nearby towns. No referral needed.",
    eyebrow: "Shoulder & rotator cuff pain · Natick, MA",
    headline: "Shoulder Pain Keeping You Up at Night? Explore Non-Surgical Options First.",
    highlight: "Explore Non-Surgical Options First",
    subheadline: "We pinpoint the real source, then treat it with image-guided injections or PRP.",
    heroPoints: [
      "Cash-pay clinic — no insurance approvals to wait on",
      "Precise diagnosis first",
      "No referral needed",
    ],
    localKeyword: "shoulder pain treatment",
    whySpecialist:
      "Not every rotator cuff tear needs surgery — and not every shoulder pain is the cuff. Interventional pain and regenerative medicine open up options in between.",
    ctaLabel: "Book My Shoulder Visit",
    formConcern: "Shoulder / Rotator Cuff Pain",
    painTitle: "Does this sound like you?",
    painPoints: [
      "It hurts to reach overhead, behind your back or into a cabinet.",
      "You can't sleep on that side.",
      "Your arm feels weak or the shoulder catches.",
      "PT helped a bit, but the pain keeps coming back.",
    ],
    painNote: "Most shoulder pain can be improved without surgery once you know what's causing it.",
    optionsTitle: "How we treat shoulder pain",
    optionsIntro: "Diagnosis first, then the least invasive option that can work.",
    options: [
      {
        title: "Pinpoint the source",
        text: "A hands-on exam plus a review of your imaging to tell tendon, bursa, joint and nerve pain apart.",
      },
      {
        title: "Image-guided injections",
        text: "Treatment delivered exactly where the problem is, for better accuracy.",
      },
      {
        title: "PRP for tendon problems",
        text: "For suitable rotator cuff and tendon injuries, PRP may support healing.",
      },
      {
        title: "A plan with your PT",
        text: "Injections work best alongside the right exercises — we help you put the two together.",
      },
    ],
    faqs: GENERAL_FAQS,
    reelTopics: ["prp", "pain"],
    finalHeadline: "Get back to sleeping — and reaching — without shoulder pain.",
  },

  "joint-pain": {
    title: "Knee & Joint Pain Treatment in Natick, MA | Near Wellesley & Weston",
    description:
      "Non-surgical knee, hip and joint arthritis treatment in Natick, MA: image-guided injections and PRP. Serving Weston, Wellesley, Sudbury, Wayland and Newton. No referral needed.",
    eyebrow: "Knee, hip & joint arthritis · Natick, MA",
    headline: "Knee or Hip Arthritis Slowing You Down? Explore Options Before Surgery.",
    highlight: "Explore Options Before Surgery",
    subheadline: "Image-guided injections and PRP to ease arthritis pain and keep you active.",
    heroPoints: [
      "Cash-pay clinic — no insurance approvals to wait on",
      "Knee, hip & hand",
      "No referral needed",
    ],
    localKeyword: "knee and joint pain treatment",
    ctaLabel: "Book My Joint Visit",
    formConcern: "Joint Pain / Osteoarthritis",
    painTitle: "Does this sound like you?",
    painPoints: [
      "Your joints are stiff and achy, especially in the morning.",
      "Stairs, walking or getting up from a chair hurts.",
      "You've cut back on activities you used to enjoy.",
      "You've been told \"it's just wear and tear\" — but want more than pain pills.",
    ],
    painNote: "Arthritis doesn't have to decide what you can still do.",
    optionsTitle: "How we treat joint pain",
    optionsIntro:
      "The right option depends on the joint, how advanced the arthritis is, and your goals.",
    options: [
      {
        title: "A clear picture",
        text: "Exam plus imaging review to see what's driving the pain — and what's realistic to improve.",
      },
      {
        title: "Image-guided injections",
        text: "Precise injections into the joint to calm pain and inflammation.",
      },
      {
        title: "PRP",
        text: "For suitable patients, a regenerative option made from your own blood.",
      },
      {
        title: "Staying active",
        text: "Practical guidance on movement and strengthening so the relief lasts longer.",
      },
    ],
    faqs: GENERAL_FAQS,
    reelTopics: ["prp", "pain"],
    finalHeadline: "Keep doing what you love — with less joint pain.",
  },
};

export function isConditionId(value: string): value is ConditionId {
  return CONDITIONS.some((c) => c.id === value);
}
