const items = [
  "Figma",
  "HTML",
  "CSS",
  "Bootstrap",
  "Tailwind CSS",
  "AI Image Generation",
  "UX Research",
  "Design Systems",
  "Prototyping",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="marquee-wrap relative overflow-hidden border-y border-line py-8">
      <div className="flex w-max animate-marquee items-center">
        {row.map((item, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="px-8 font-display text-2xl font-bold uppercase tracking-[0.1em] text-ink transition-colors hover:text-accent">
              {item}
            </span>
            <span className="text-xl text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
