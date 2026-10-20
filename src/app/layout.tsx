import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import { LanguageThemeProvider } from "@/context/LanguageThemeContext";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "New Model Gents Parlor — Precision Grooming & Styling | Thirthahalli",
  description:
    "New Model Gents Parlor (ನ್ಯೂ ಮಾಡೆಲ್ ಜೆಂಟ್ಸ್ ಪಾರ್ಲರ್) at Katte Complex, Thirthahalli, Shivamogga. Reserve your appointment for haircuts, beard styling, and grooming since 2010.",
  keywords: [
    "New Model Gents Parlor",
    "ನ್ಯೂ ಮಾಡೆಲ್ ಜೆಂಟ್ಸ್ ಪಾರ್ಲರ್",
    "Gents Parlor Thirthahalli",
    "Barbershop Shivamogga",
    "Haircut Thirthahalli",
    "Beard Grooming",
    "Katte Complex",
    "Hanumanthu Chinanna",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                var t = localStorage.getItem("newmodel_theme");
                if (t === "light") {
                  document.documentElement.classList.remove("dark");
                  document.documentElement.classList.add("light");
                  document.documentElement.setAttribute("data-theme", "light");
                } else {
                  document.documentElement.classList.remove("light");
                  document.documentElement.classList.add("dark");
                  document.documentElement.setAttribute("data-theme", "dark");
                }
              } catch (e) {}
            })();`,
          }}
        />
      </head>
      <body className="min-h-screen font-sans antialiased selection:bg-[#c5a880] selection:text-[#09090b] flex flex-col transition-colors duration-300">
        <LanguageThemeProvider>
          <CustomCursor />
          {children}
        </LanguageThemeProvider>
      </body>
    </html>
  );
}
