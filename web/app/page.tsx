import { ContactSection } from "@/components/site/ContactSection";
import { Hero } from "@/components/site/Hero";
import { Manifest } from "@/components/site/Manifest";
import { Phases } from "@/components/site/Phases";
import { ProjectBlock } from "@/components/site/ProjectBlock";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Wall } from "@/components/site/Wall";
import { projects } from "@/lib/site";

export default function Home() {
  const slides = projects.filter((p) => p.hero && ["rotunda-m07", "golden-tulip", "kolobrzeg", "form-space", "b-sides"].includes(p.slug));
  return (
    <>
      <SiteHeader />
      <main className="site-main">
        <Hero slides={slides} />
        <Wall />
        <Manifest />
        <Phases />
        {projects.map((p, i) => <ProjectBlock key={p.slug} p={p} flip={i % 2 === 1} />)}
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
