import { ContactSection } from "@/components/site/ContactSection";
import { Hero } from "@/components/site/Hero";
import { Manifest } from "@/components/site/Manifest";
import { Phases } from "@/components/site/Phases";
import { ProjectBlock } from "@/components/site/ProjectBlock";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { projects } from "@/lib/site";

export default function Home() {
  // Hero otwiera cztery pierwsze kadry Golden Tulip: trzy ujęcia lobby przy
  // Chmielnej 78 i pierwsza koncepcja wnętrza jednostki. Gdyby projektu
  // zabrakło na liście serwisu, hero po prostu zostaje puste zamiast wywracać
  // stronę — stąd opcjonalne sięganie po galerię.
  const slides = (projects.find((p) => p.slug === "golden-tulip")?.gallery ?? []).slice(0, 4);
  return (
    <>
      <SiteHeader />
      <main className="site-main">
        <Hero slides={slides} />
        <Manifest />
        <Phases />
        {projects.map((p, i) => <ProjectBlock key={p.slug} p={p} flip={i % 2 === 1} />)}
        <Manifest wariant="domkniecie" />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
