import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { ProjectIndex } from "@/components/site/ProjectIndex";
import { ProjectSection } from "@/components/site/ProjectSection";
import { SiteNav } from "@/components/site/SiteNav";
import { projects, runners } from "@/lib/site";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Marquee items={runners} />
        <About />
        <ProjectIndex />
        {projects.map((p, i) => <ProjectSection key={p.slug} p={p} flip={i % 2 === 1} />)}
        <Marquee items={runners} reverse />
      </main>
      <Contact />
    </>
  );
}
