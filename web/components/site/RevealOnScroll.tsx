"use client";
import { useLayoutEffect } from "react";

/** Bloki tekstu, które mają się wyłaniać. Hero pominięty — ma własne wejście. */
const CELE = [
  ".site-main .section-head",
  ".site-main .feature-text > *",
  ".site-main .manifest .hero-text > *",
  ".site-main .phase",
  ".site-main .s-card",
  ".site-main .contact-intro > *",
  ".site-main .p-cols > div",
  ".site-main .p-chapter",
  ".site-main .pp-hero-text > *",
  ".site-footer .footer-col",
].join(",");

/**
 * Wyłanianie tekstu przy przewijaniu — za houseofhoney.com/studio:
 * przezroczystość, lekkie przesunięcie w górę i zejście z rozmycia.
 * Elementy widoczne od razu po wejściu na stronę pokazują się bez animacji,
 * żeby nic nie mrugnęło.
 */
export function RevealOnScroll() {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cele = Array.from(document.querySelectorAll<HTMLElement>(CELE));
    if (!cele.length) return;

    for (const el of cele) el.classList.add("zjawia");

    // Co jest już w kadrze przy wejściu — pokaż natychmiast, bez animacji.
    for (const el of cele) {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add("widoczne", "bez-ruchu");
      }
    }

    const io = new IntersectionObserver(
      (wpisy) => {
        for (const w of wpisy) {
          if (!w.isIntersecting) continue;
          const el = w.target as HTMLElement;
          // Rodzeństwo wchodzi po kolei, nie wszystko naraz.
          const rodzenstwo = Array.from(el.parentElement?.children ?? []).filter((x) => x.classList.contains("zjawia"));
          el.style.transitionDelay = `${Math.min(rodzenstwo.indexOf(el), 5) * 70}ms`;
          el.classList.add("widoczne");
          io.unobserve(el);
          // Po zakończeniu wejścia zdejmujemy klasy — inaczej na każdym bloku
          // zostaje warstwa rozmycia, którą przeglądarka składa przy każdej
          // klatce przewijania. Przy kilkudziesięciu blokach to czuć.
          el.addEventListener(
            "transitionend",
            () => {
              el.classList.remove("zjawia", "widoczne");
              el.style.transitionDelay = "";
            },
            { once: true },
          );
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    for (const el of cele) if (!el.classList.contains("widoczne")) io.observe(el);
    return () => io.disconnect();
  }, []);

  return null;
}
