import { Reveal } from "./Reveal";
import { contact } from "@/lib/site";

export function Contact() {
  return (
    <section id="kontakt" className="border-t border-line bg-fg text-bg">
      <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
        <Reveal>
          <p className="kicker mb-6 text-bg/60">Kontakt</p>
          <h2 className="display text-5xl sm:text-7xl lg:text-8xl">Porozmawiajmy o realizacji.</h2>
        </Reveal>
        <Reveal each className="mt-12 flex flex-wrap gap-x-12 gap-y-4 text-xl sm:text-2xl">
          <a href="mailto:bas.iwanska@gmail.com" className="border-b border-bg/30 hover:border-accent hover:text-accent">bas.iwanska@gmail.com</a>
          <a href="tel:+48698928600" className="border-b border-bg/30 hover:border-accent hover:text-accent">+48 698 928 600</a>
          <span className="text-bg/60">{contact.meta?.[2]}</span>
        </Reveal>
        <p className="runner mt-20 text-bg/50">Barbara Joanna Iwańska · Portfolio · Design Management · 2026</p>
      </div>
    </section>
  );
}
