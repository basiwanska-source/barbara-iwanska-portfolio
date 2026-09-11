import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/site/ContactSection";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { projects, type Img } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return { title: p ? `${p.title} · Barbara Iwańska · Design Management` : "Projekt", description: p?.context[0] };
}

const isTall = (im: Img) => /torunska-20|b-sides\/galeria-0[2-6]|karta-ap|rzut-l|prace-artystek|wystawy-03|rotunda-m07\/galeria-0[37]/.test(im.src);

function Gallery({ images }: { images: Img[] }) {
  return (
    <div className="pp-grid">
      {images.map((im, k) => (
        <figure className={isTall(im) ? "tall" : ""} key={im.src}>
          <img alt={im.alt} loading="lazy" src={im.src} />
          <figcaption><b>{String(k + 1).padStart(2, "0")}</b>{im.alt}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export default async function ProjectPage({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  return (
    <>
      <SiteHeader solidAlways />
      <main className="site-main pp">
        <section className="pp-hero">
          {p.hero ? <img alt={p.hero.alt} src={p.hero.src} fetchPriority="high" /> : <div className="pp-hero-empty" />}
          <div className="shell pp-hero-text">
            <span className="label">{p.no} · {p.employer} · {p.period}</span>
            <h1>{p.title}</h1>
            {p.meta.length > 0 && <p className="p-meta">{p.meta.map((m) => <span key={m}>{m}</span>)}</p>}
          </div>
        </section>

        <section className="shell">
          <div className="section-head"><div className="sh-left"><h2>Zakres</h2><span className="vr" /><Link className="link-more" href={`/strona/${p.pages[0]}`}>Strony {p.pages[0]}–{p.pages[p.pages.length - 1]} broszury</Link></div></div>
          {p.missing && <p className="p-note" style={{ marginBottom: 18 }}>{p.missing}</p>}
          <div className="p-cols" style={{ marginTop: 0 }}>
            <div><span className="label">Kontekst</span><div style={{ marginTop: 10 }}>{p.context.map((t) => <p key={t}>{t}</p>)}</div></div>
            <div><span className="label">Moja rola</span><ul style={{ marginTop: 10 }}>{p.role.map((b) => <li key={b}>{b}</li>)}</ul></div>
            <div><span className="label">Rezultat</span><p style={{ marginTop: 10 }}>{p.result ?? "—"}</p></div>
          </div>
        </section>

        {p.chapters.length > 0
          ? p.chapters.map((c) => (
              <section className="shell" key={c.title}>
                <div className="section-head"><div className="sh-left"><h2>{c.title}</h2><span className="vr" /><span className="label">{c.images.length} kadrów</span></div></div>
                {c.body[0] ? <p className="pp-lead">{c.body[0]}</p> : null}
                <Gallery images={c.images} />
              </section>
            ))
          : p.gallery.length > 0 && (
              <section className="shell">
                <div className="section-head"><div className="sh-left"><h2>Kadry</h2><span className="vr" /><span className="label">{p.gallery.length} zdjęć</span></div></div>
                <Gallery images={p.gallery} />
              </section>
            )}

        {p.credits.length > 0 && (
          <section className="shell"><div className="p-credits" style={{ marginTop: 0 }}>{p.credits.map((c) => <p key={c}>{c}</p>)}</div></section>
        )}

        <section className="pp-nav">
          <Link href={`/portfolio/${prev.slug}`} className="pp-nav-item">
            {prev.hero && <img alt="" loading="lazy" src={prev.hero.src} />}
            <span><small className="label">← Poprzedni · {prev.no}</small><b>{prev.title}</b></span>
          </Link>
          <Link href={`/portfolio/${next.slug}`} className="pp-nav-item flip">
            {next.hero && <img alt="" loading="lazy" src={next.hero.src} />}
            <span><small className="label">Następny · {next.no} →</small><b>{next.title}</b></span>
          </Link>
        </section>

        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
