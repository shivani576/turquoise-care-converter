/**
 * Animated spine / body graphic for a service card. The spine "breathes"
 * vertebra by vertebra, and the pain area for the service pulses in brand teal.
 * Pure SVG + CSS (styles.css: .pain-map …); still for prefers-reduced-motion.
 */
export type PainArea =
  | "temples"
  | "head"
  | "head-neck"
  | "jaw"
  | "occipital"
  | "neck"
  | "shoulder"
  | "shoulder-knee"
  | "hip-knee";

const SPOTS: Record<PainArea, { x: number; y: number }[]> = {
  temples: [
    { x: 69, y: 16 },
    { x: 91, y: 16 },
  ],
  head: [
    { x: 80, y: 9 },
    { x: 80, y: 22 },
  ],
  "head-neck": [
    { x: 72, y: 11 },
    { x: 88, y: 11 },
    { x: 80, y: 33 },
    { x: 64, y: 43 },
    { x: 96, y: 43 },
  ],
  jaw: [
    { x: 72, y: 25 },
    { x: 88, y: 25 },
  ],
  occipital: [
    { x: 74, y: 27 },
    { x: 86, y: 27 },
  ],
  neck: [{ x: 80, y: 35 }],
  shoulder: [{ x: 106, y: 45 }],
  "shoulder-knee": [
    { x: 106, y: 45 },
    { x: 90, y: 94 },
  ],
  "hip-knee": [
    { x: 92, y: 79 },
    { x: 90, y: 94 },
  ],
};

const LABELS: Record<PainArea, string> = {
  temples: "Illustration of the head with the temples highlighted",
  head: "Illustration of the head highlighted",
  "head-neck": "Illustration showing treatment points on the head, neck and shoulders",
  jaw: "Illustration of the jaw joints highlighted",
  occipital: "Illustration of the nerves at the back of the head highlighted",
  neck: "Illustration of the neck section of the spine highlighted",
  shoulder: "Illustration of the shoulder joint highlighted",
  "shoulder-knee": "Illustration of the shoulder and knee highlighted",
  "hip-knee": "Illustration of the hip and knee highlighted",
};

// 3 neck (cervical) + 8 back vertebrae, top to bottom.
const VERTEBRAE = [
  { y: 30, w: 7, neck: true },
  { y: 34, w: 7, neck: true },
  { y: 38, w: 8, neck: true },
  { y: 44, w: 10 },
  { y: 48.5, w: 10 },
  { y: 53, w: 11 },
  { y: 57.5, w: 11 },
  { y: 62, w: 12 },
  { y: 66.5, w: 12 },
  { y: 71, w: 13 },
  { y: 75.5, w: 13 },
];

export function PainMap({ area, className }: { area: PainArea; className?: string }) {
  const spots = SPOTS[area];
  return (
    <svg
      viewBox="44 0 72 100"
      role="img"
      aria-label={LABELS[area]}
      className={`pain-map ${className ?? ""}`}
    >
      {/* body outline */}
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.35">
        <circle cx="80" cy="17" r="11" />
        <path d="M73 25 Q80 31 87 25" />
        <path d="M58 46 Q80 39 102 46" />
        <path d="M66 82 Q80 77 94 82" />
        <path d="M69 83 L70 97 M91 83 L90 97" />
      </g>
      {/* joints */}
      <g fill="currentColor" opacity="0.35">
        <circle cx="54" cy="46" r="2.6" />
        <circle cx="106" cy="46" r="2.6" />
        <circle cx="68" cy="80" r="2.4" />
        <circle cx="92" cy="80" r="2.4" />
        <circle cx="70" cy="94" r="2.2" />
        <circle cx="90" cy="94" r="2.2" />
      </g>
      {/* spine */}
      {VERTEBRAE.map((v, i) => (
        <rect
          key={v.y}
          x={80 - v.w / 2}
          y={v.y - 1.6}
          width={v.w}
          height={3.2}
          rx={1.4}
          className={
            area === "neck" && v.neck ? "pain-map__vertebra is-active" : "pain-map__vertebra"
          }
          style={{ animationDelay: `${i * 0.12}s` }}
        />
      ))}
      {/* pain areas */}
      {spots.map((s, i) => (
        <g key={`${s.x}-${s.y}`} style={{ animationDelay: `${i * 0.35}s` }}>
          <circle
            cx={s.x}
            cy={s.y}
            r="7"
            className="pain-map__ring"
            style={{ animationDelay: `${i * 0.35}s` }}
          />
          <circle cx={s.x} cy={s.y} r="2.6" className="pain-map__dot" />
        </g>
      ))}
    </svg>
  );
}
