import { ContactSection } from "@/components/site/ContactSection";
import { Hero } from "@/components/site/Hero";
import { Manifest } from "@/components/site/Manifest";
import { Marquee } from "@/components/site/Marquee";
import { Phases } from "@/components/site/Phases";
import { ProjectBlock } from "@/components/site/ProjectBlock";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { type Project, projects } from "@/lib/site";

export default function Home() {
  // Kolejność kadrów w hero. Projekt, którego nie ma na liście serwisu,
  // jest po prostu pomijany — bez tego usunięcie projektu wywraca stronę.
  const order = ["rotunda-m07", "kolobrzeg", "b-sides", "golden-tulip"];
  const slides = order.map((s) => projects.find((p) => p.slug === s)).filter((p): p is Project => !!p?.hero);
  return (
    <>
      <SiteHeader />
      <main className="site-main">
        <Hero slides={slides} />
        <Manifest />
        <Phases />
        <Marquee />
        {projects.map((p, i) => <ProjectBlock key={p.slug} p={p} flip={i % 2 === 1} />)}
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
