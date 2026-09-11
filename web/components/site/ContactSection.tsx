export function ContactSection() {
  return (
    <section className="shell contact-section" id="kontakt">
      <div className="section-head"><div className="sh-left"><h2>Porozmawiajmy o realizacji</h2></div></div>
      <div className="contact-cols">
        <div className="contact-intro">
          <p>Prowadzę realizacje wnętrz w inwestycjach mieszkaniowych i hotelowych — od zakresu i budżetu, przez akceptacje materiałowe i negocjacje z dostawcami, po odbiory. Napisz albo zadzwoń.</p>
          <a className="s-btn" href="mailto:bas.iwanska@gmail.com">Napisz do mnie</a>
        </div>
        <div className="contact-mail">
          <p><span className="label">E-mail</span><br /><a href="mailto:bas.iwanska@gmail.com">bas.iwanska@gmail.com</a></p>
          <p style={{ marginTop: 18 }}><span className="label">Telefon</span><br /><a href="tel:+48698928600">+48 698 928 600</a></p>
          <p style={{ marginTop: 18 }}><span className="label">Miasto</span><br />Warszawa</p>
          <p style={{ marginTop: 18 }}><span className="label">CV</span><br /><a href="/cv-2026-web.pdf">cv-2026-web.pdf</a></p>
        </div>
      </div>
    </section>
  );
}
