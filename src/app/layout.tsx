import type { Metadata } from "next";
import { Inter, Montserrat, Oswald } from "next/font/google";
import "./globals.css";
import { SoundProvider } from "@/context/SoundContext";

const inter = Inter({
  variable: "--font-inter",
  subsets:  ["latin"],
  weight:   ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets:  ["latin"],
  weight:   ["400", "500", "700", "800", "900"],
  style:    ["normal", "italic"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets:  ["latin"],
  weight:   ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title:       "ALEX VANCE // ELITE FULL-STACK ENGINEER",
  description: "Premium portfolio dashboard. Elite Full-Stack Engineer & Project Lead.",
  keywords:    "Alex Vance, Full-Stack Engineer, Portfolio, Dashboard, Project Lead",
  authors:     [{ name: "Alex Vance" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} ${oswald.variable} antialiased select-none`}
    >
      <body className="bg-canvas text-textPrimary font-sans">
        <SoundProvider>
          {children}
        </SoundProvider>
      </body>
    </html>
  );
}
