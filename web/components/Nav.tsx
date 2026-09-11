import Link from "next/link";
import { sections, pad } from "@/lib/pages";

export function Nav({ standalone }: { standalone?: boolean }) {
  const href = (n: number) => (standalone ? `/strona/${n}` : `#strona-${n}`);
  return (
    <nav className="sticky top-0 z-10 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center gap-4 overflow-x-auto px-4 py-3 text-xs">
        <Link href="/" className="kicker shrink-0 text-fg">B. J. Iwańska · Design Management</Link>
        <Link href="/broszura" className="runner shrink-0 text-muted hover:text-accent">broszura</Link>
        <span className="h-4 w-px shrink-0 bg-line" />
        {sections.map((s) => (
          <Link key={s.name} href={href(s.first)} className="shrink-0 whitespace-nowrap text-muted hover:text-accent">
            <span className="runner mr-1 text-accent">{pad(s.first)}</span>{s.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
