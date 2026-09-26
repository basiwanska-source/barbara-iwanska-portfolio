import { ContactSection } from "@/components/site/ContactSection";
import { Hero } from "@/components/site/Hero";
import { Manifest } from "@/components/site/Manifest";
import { Phases } from "@/components/site/Phases";
import { ProjectBlock } from "@/components/site/ProjectBlock";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { projects } from "@/lib/site";

export default function Home() {
  const order = ["rotunda-m07", "form-space", "kolobrzeg", "b-sides", "golden-tulip"];
  const slides = order.map((s) => projects.find((p) => p.slug === s)!).filter((p) => p.hero);
  return (
    <>
      <SiteHeader />
      <main className="site-main">
        <Hero slides={slides} />
        <Phases />
        <Manifest />
        {projects.map((p, i) => <ProjectBlock key={p.slug} p={p} flip={i % 2 === 1} />)}
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
