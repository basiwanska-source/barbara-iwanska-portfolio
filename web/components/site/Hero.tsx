import { SplitTitle } from "./SplitTitle";
import { Reveal } from "./Reveal";
import { projects } from "@/lib/site";

export function Hero() {
  const bg = projects.find((p) => p.slug === "rotunda-m07")?.hero;
  return (
    <header id="top" className="relative min-h-[100svh] overflow-hidden">
      {bg && (
        <div className="absolute inset-0">
          <img src={bg.src} alt="" className="hero-img h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/35 to-transparent" />
        </div>
      )}
      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 sm:px-8">
        <Reveal delay={100}><p className="kicker mb-6 text-fg">Portfolio · Design Management · 2026</p></Reveal>
        <SplitTitle className="display text-[15vw] leading-[0.9] sm:text-[11vw] lg:text-[8.5rem]">Barbara Joanna Iwańska</SplitTitle>
        <Reveal delay={700} className="mt-8 grid gap-6 md:grid-cols-[1.2fr_1fr]">
          <p className="max-w-xl text-lg leading-relaxed sm:text-2xl">
            Prowadzę realizacje wnętrz w inwestycjach mieszkaniowych i hotelowych — od zakresu i budżetu, przez akceptacje materiałowe i negocjacje z dostawcami, po odbiory.
          </p>
          <ul className="flex flex-wrap items-end gap-x-6 gap-y-2 text-sm text-muted md:justify-end">
            <li className="border-l border-accent pl-3">Strategia produktu i marki</li>
            <li className="border-l border-accent pl-3">Prowadzenie realizacji</li>
            <li className="border-l border-accent pl-3">Kuratela i art branding</li>
          </ul>
        </Reveal>
        <a href="#o-mnie" className="runner mt-12 inline-flex items-center gap-3 text-muted hover:text-accent"><span className="h-px w-10 bg-accent" />Przewiń</a>
      </div>
    </header>
  );
}
