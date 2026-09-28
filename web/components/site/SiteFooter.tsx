import { projects } from "@/lib/site";

/**
 * Stopka w układzie za fourth.design: po lewej bloki kontaktowe rozdzielone
 * cienkimi kreskami, po prawej — za pionową linią — spis projektów.
 * Na dole pasek z prawami autorskimi. Całość złożona Interem z paska
 * nawigacji: etykiety wersalikami z rozstrzeleniem, wpisy zwykłą wielkością.
 */
export function SiteFooter() {
  const bloki = [
    {
      etykieta: "Nowe projekty",
      tresc: (
        <>
          <p className="stopka-nazwa">Barbara Joanna Iwańska</p>
          <p className="stopka-linia">
            <span>M:</span> <a href="mailto:bas.iwanska@gmail.com">bas.iwanska@gmail.com</a>
          </p>
          <p className="stopka-linia">
            <span>T:</span> <a href="tel:+48698928600">+48 698 928 600</a>
          </p>
        </>
      ),
    },
    {
      etykieta: "Materiały",
      tresc: (
        <p className="stopka-linia">
          <a href="/cv-2026-web.pdf">CV · PDF</a>
        </p>
      ),
    },
    {
      etykieta: "Lokalizacja",
      tresc: (
        <>
          <p className="stopka-nazwa">Design Management</p>
          <p className="stopka-linia">Warszawa, Polska</p>
        </>
      ),
    },
  ];

  return (
    <footer className="site-footer">
      <div className="shell stopka-glowna">
        <div className="stopka-lewa">
          {bloki.map((b) => (
            <section className="stopka-blok" key={b.etykieta}>
              <h4 className="label">{b.etykieta}</h4>
              {b.tresc}
            </section>
          ))}
        </div>

        <nav className="stopka-prawa">
          <h4 className="label">Projekty</h4>
          <ul>
            {projects.map((p) => (
              <li key={p.slug}>
                <a href={`/portfolio/${p.slug}`}>{p.title.split(" · ")[0]}</a>
              </li>
            ))}
            <li className="stopka-przerwa">
              <a href="/#o-mnie">O mnie</a>
            </li>
            <li>
              <a href="/#fazy">Fazy</a>
            </li>
            <li>
              <a href="/#kontakt">Kontakt</a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="shell stopka-stopka">
        <span className="stopka-znak" aria-hidden="true">BI</span>
        <span>© {new Date().getFullYear()} Barbara Joanna Iwańska.<br />Wszystkie prawa zastrzeżone.</span>
        <span>Design Management · Portfolio 2026</span>
        <a href="/design-system.html">Design system</a>
      </div>
    </footer>
  );
}
