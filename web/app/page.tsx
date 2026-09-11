import { Nav } from "@/components/Nav";
import { Sheet } from "@/components/Sheet";
import { pages } from "@/lib/pages";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-col gap-6 px-4 py-6 sm:px-6">
        {pages.map((p) => (
          <Sheet key={p.n} p={p} />
        ))}
      </main>
      <footer className="mx-auto max-w-5xl px-4 py-10 text-xs text-muted">
        Barbara Joanna Iwańska · Portfolio · Design Management · 2026 · bas.iwanska@gmail.com · +48 698 928 600
      </footer>
    </>
  );
}
