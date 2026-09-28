import { ContactSection } from "@/components/site/ContactSection";
import { Hero } from "@/components/site/Hero";
import { Manifest } from "@/components/site/Manifest";
import { ProjectBlock } from "@/components/site/ProjectBlock";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { projects } from "@/lib/site";

const KADRY_HERO = ["/img/chmielna-78/01-hero.jpg", "/img/chmielna-78/lobby-wypoczynek.jpg"];

/* Kolobrzeg swiadomie poza strona glowna. Projekt zostaje pod wlasnym adresem
   /portfolio/kolobrzeg, w spisie w stopce i w broszurze — nie ma tu tylko
   swojego pasma na stronie otwierajacej. Przywrocenie = skasowanie filtra. */
const POZA_GLOWNA = ["kolobrzeg"];
const NA_GLOWNEJ = projects.filter((p) => !POZA_GLOWNA.includes(p.slug));

export default function Home() {
  // Kadry otwarcia wybrane ręcznie z galerii Golden Tulip. Reguła automatyczna
  // się nie sprawdziła: „galeria-03" stoi już jako pierwszy kafel faz, a na
  // „lobby-recepcja" widnieje logo Unique Hotels, które nie zgadza się z nazwą
  // projektu. Oba zostają w karuzeli, tylko nie witają na wejściu. Kolejność
  // bierze się z galerii, więc lista jest zbiorem, nie sekwencją.
  const slides = (projects.find((p) => p.slug === "golden-tulip")?.gallery ?? []).filter((im) =>
    KADRY_HERO.includes(im.src),
  );
  return (
    <>
      <SiteHeader />
      <main className="site-main">
        <Hero slides={slides} />
        <Manifest />
        {NA_GLOWNEJ.map((p, i) => <ProjectBlock key={p.slug} p={p} flip={i % 2 === 1} />)}
        <Manifest wariant="domkniecie" />
        {/* Fazy czasowo zdjete ze strony. Komponent, dane i style zostaja
            nietkniete — powrot to odkomentowanie tej jednej linii i wpisu
            „Fazy" w stopce. Stalo tu, tuz nad zaproszeniem do rozmowy. */}
        {/* <Phases /> */}
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
