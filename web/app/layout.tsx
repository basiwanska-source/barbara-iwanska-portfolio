import type { Metadata } from "next";
import { Inter, Libre_Caslon_Text, Oswald } from "next/font/google";
import "./globals.css";
import { Crosshair } from "@/components/site/Crosshair";
import { RevealOnScroll } from "@/components/site/RevealOnScroll";

// 900 dociagniete dla logotypu — bez niego przegladarka pogrubiala Inter
// sztucznie, co przy duzym rozstrzeleniu wygladalo na rozmyte. 700 nie
// wczytujemy, bo nic go nie uzywa.
const inter = Inter({ variable: "--font-inter", subsets: ["latin", "latin-ext"], weight: ["200", "300", "400", "500", "900"] });
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin", "latin-ext"], weight: ["200", "300", "400"] });
// Szeryf do menu i akapitów — odpowiednik Caslona z nawigacji kellywearstler.com.
// latin-ext jest konieczny: bez niego ą, ę, ł, ż wypadłyby z innego kroju.
const caslon = Libre_Caslon_Text({ variable: "--font-caslon", subsets: ["latin", "latin-ext"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Barbara Joanna Iwańska · Design Management · Portfolio 2026",
  description:
    "Design Management: prowadzenie realizacji wnętrz w inwestycjach mieszkaniowych i hotelowych — od zakresu i budżetu, przez akceptacje materiałowe i negocjacje z dostawcami, po odbiory.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className={`${inter.variable} ${oswald.variable} ${caslon.variable}`}>
      <body>
        {children}
        <RevealOnScroll />
        <Crosshair />
      </body>
    </html>
  );
}
