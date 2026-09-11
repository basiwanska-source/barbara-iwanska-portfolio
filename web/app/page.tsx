import { ContactSection } from "@/components/site/ContactSection";
import { Hero } from "@/components/site/Hero";
import { Intro } from "@/components/site/Intro";
import { ProjectBlock } from "@/components/site/ProjectBlock";
import { ProjectsCarousel } from "@/components/site/ProjectsCarousel";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { projects } from "@/lib/site";

export default function Home() {
  const slides = projects.filter((p) => p.hero && ["rotunda-m07", "golden-tulip", "kolobrzeg", "form-space", "b-sides"].includes(p.slug));
  return (
    <>
      <SiteHeader />
      <main className="site-main">
        <Hero slides={slides} />
        <Intro />
        <ProjectsCarousel />
        {projects.map((p, i) => <ProjectBlock key={p.slug} p={p} flip={i % 2 === 1} />)}
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
