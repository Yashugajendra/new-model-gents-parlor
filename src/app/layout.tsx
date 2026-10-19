import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
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
  title: "New Model Gents Beauty Parlor — Precision Grooming & Styling",
  description:
    "Premier gents styling and grooming sanctuary at Kate Complex, Thirthahalli, Shivamogga. Reserve your appointment for bespoke haircuts, beard sculpting, and luxury grooming.",
  keywords: [
    "New Model Gents Beauty Parlor",
    "Gents Parlor Thirthahalli",
    "Barbershop Shivamogga",
    "Haircut",
    "Beard Grooming",
    "Kate Complex",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} dark`}>
      <body className="min-h-screen bg-[#09090b] text-[#f8fafc] font-sans antialiased selection:bg-[#c5a880] selection:text-[#09090b] flex flex-col">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
