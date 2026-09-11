export function Marquee({ items, reverse, className = "" }: { items: string[]; reverse?: boolean; className?: string }) {
  const row = items.map((s) => `${s} • `).join("");
  return (
    <div className={`marquee overflow-hidden whitespace-nowrap border-y border-line py-3 ${className}`} aria-hidden>
      <div className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}>
        <span className="runner text-fg">{row}</span>
        <span className="runner text-fg">{row}</span>
      </div>
    </div>
  );
}
