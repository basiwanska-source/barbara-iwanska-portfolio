import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Sheet } from "@/components/Sheet";
import { TOTAL, getPage, pad, pages } from "@/lib/pages";

export const dynamicParams = false;
export function generateStaticParams() {
  return pages.map((p) => ({ n: String(p.n) }));
}

export async function generateMetadata({ params }: PageProps<"/strona/[n]">) {
  const { n } = await params;
  const p = getPage(Number(n));
  return { title: p ? `${pad(p.n)} · ${p.title} · B. J. Iwańska` : "Strona", description: p?.desc };
}

export default async function Strona({ params }: PageProps<"/strona/[n]">) {
  const { n } = await params;
  const p = getPage(Number(n));
  if (!p) notFound();
  const prev = p.n > 1 ? p.n - 1 : null;
  const next = p.n < TOTAL ? p.n + 1 : null;
  return (
    <>
      <Nav standalone />
      <main className="px-4 py-6 sm:px-6">
        <Sheet p={p} standalone />
        <div className="mx-auto mt-6 flex max-w-5xl justify-between text-sm">
          {prev ? <Link href={`/strona/${prev}`} className="hover:text-accent">← {pad(prev)}</Link> : <span />}
          <Link href={`/broszura#strona-${p.n}`} className="text-muted hover:text-accent">cała broszura</Link>
          {next ? <Link href={`/strona/${next}`} className="hover:text-accent">{pad(next)} →</Link> : <span />}
        </div>
      </main>
    </>
  );
}
