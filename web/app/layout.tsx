import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin", "latin-ext"], weight: ["200", "300", "400", "500"] });
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin", "latin-ext"], weight: ["200", "300", "400"] });

export const metadata: Metadata = {
  title: "Barbara Joanna Iwańska · Design Management · Portfolio 2026",
  description:
    "Design Management: prowadzenie realizacji wnętrz w inwestycjach mieszkaniowych i hotelowych — od zakresu i budżetu, przez akceptacje materiałowe i negocjacje z dostawcami, po odbiory.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className={`${inter.variable} ${oswald.variable}`}>
      <body>{children}</body>
    </html>
  );
}
