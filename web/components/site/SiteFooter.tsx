import { projects } from "@/lib/site";

export function SiteFooter() {
  const cols: Record<string, { label: string; href: string }[]> = {
    Projekty: projects.filter((p) => !p.missing).map((p) => ({ label: p.title.split(" · ")[0], href: `/portfolio/${p.slug}` })),
    Portfolio: [
      { label: "O mnie", href: "/#o-mnie" },
      { label: "Fazy", href: "/#fazy" },
      { label: "Broszura 33 strony", href: "/broszura" },
      { label: "CV (PDF)", href: "/cv-2026-web.pdf" },
    ],
    Kontakt: [
      { label: "bas.iwanska@gmail.com", href: "mailto:bas.iwanska@gmail.com" },
      { label: "+48 698 928 600", href: "tel:+48698928600" },
    ],
  };
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-cols">
          <div className="footer-col"><a className="s-btn s-btn-footer" href="mailto:bas.iwanska@gmail.com">Napisz do mnie</a></div>
          {Object.entries(cols).map(([name, links]) => (
            <div className="footer-col" key={name}>
              <h4>{name}</h4>
              <ul>{links.map((l) => <li key={l.label}><a href={l.href}>{l.label}<span className="slider" /></a></li>)}</ul>
            </div>
          ))}
        </div>
      </div>
      <div className="footer-legal"><div className="footer-legal-inner"><span>© {new Date().getFullYear()} Barbara Joanna Iwańska</span><span>Design Management · Portfolio 2026</span></div></div>
    </footer>
  );
}
